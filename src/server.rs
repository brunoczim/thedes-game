use anyhow::anyhow;
use futures::{
    future::BoxFuture,
    stream::{FuturesUnordered, StreamExt},
    TryStreamExt,
};
use gardiz::{bits::HalfExcess, direc::Direction};
use std::{collections::HashMap, io, net::SocketAddr, sync::Arc};
use tokio::{
    net::{TcpListener, TcpStream, ToSocketAddrs},
    select,
    sync::Mutex,
    task,
};
use tokio_util::sync::CancellationToken;

use crate::{
    domain::{Coord, Player, PlayerName, Vec2},
    error::Result,
    message::{
        self,
        GameRequest,
        GetPlayerError,
        GetPlayerResponse,
        LoginError,
        LoginRequest,
        LoginResponse,
        MoveClientPlayerError,
        MoveClientPlayerResponse,
    },
};

#[derive(Debug)]
pub struct Server {
    jobs: FuturesUnordered<BoxFuture<'static, Result<()>>>,
    listener: TcpListener,
    shared: Arc<Shared>,
}

impl Server {
    pub async fn new<S>(
        bind_addr: S,
        cancel_token: CancellationToken,
    ) -> Result<Self>
    where
        S: ToSocketAddrs,
    {
        Ok(Self {
            jobs: FuturesUnordered::new(),
            listener: TcpListener::bind(bind_addr).await?,
            shared: Arc::new(Shared::new(cancel_token)),
        })
    }

    pub async fn run(mut self) -> Result<()> {
        let run_result = self.do_run().await;
        let cleanup_result = self.cleanup().await;
        run_result?;
        cleanup_result
    }

    async fn do_run(&mut self) -> Result<()> {
        loop {
            select! {
                result = self.listener.accept() => {
                    self.select_accept(result).await?;
                },
                Some(result) = self.jobs.next() => {
                    result?
                },
                () = self.shared.cancel_token.cancelled() => {
                    break Ok(());
                },
            }
        }
    }

    async fn cleanup(self) -> Result<()> {
        self.jobs.try_for_each(|_| async { Ok(()) }).await
    }

    async fn select_accept(
        &mut self,
        result: io::Result<(TcpStream, SocketAddr)>,
    ) -> Result<()> {
        let (stream, client_addr) = result?;
        let shared = self.shared.clone();
        let handle = task::spawn(async move {
            if let Some(client_conn) =
                ClientConn::new(stream, client_addr, shared).await?
            {
                client_conn.handle().await?;
            }
            Ok(())
        });
        let job: BoxFuture<_> = Box::pin(async move { handle.await? });
        self.jobs.push(job);
        Ok(())
    }
}

#[derive(Debug)]
struct ClientConn {
    stream: TcpStream,
    client_addr: SocketAddr,
    player_name: PlayerName,
    shared: Arc<Shared>,
}

impl ClientConn {
    pub async fn new(
        mut stream: TcpStream,
        client_addr: SocketAddr,
        shared: Arc<Shared>,
    ) -> Result<Option<Self>> {
        let login: LoginRequest = message::receive(&mut stream).await?;
        let response =
            shared.connect_player(client_addr, &login.player_name).await;
        let is_success = response.result.is_ok();
        message::send(&mut stream, response).await?;
        if is_success {
            Ok(Some(Self {
                stream,
                client_addr,
                player_name: login.player_name,
                shared,
            }))
        } else {
            Ok(None)
        }
    }

    pub async fn handle(mut self) -> Result<()> {
        let handle_result = self.do_handle().await;
        let cleanup_result = self.cleanup().await;
        handle_result?;
        cleanup_result
    }

    async fn do_handle(&mut self) -> Result<()> {
        loop {
            select! {
                result = message::receive(&mut self.stream) => {
                    self.select_receive(result).await?;
                },
                () = self.shared.cancel_token.cancelled() => {
                    break Ok(());
                },
            }
        }
    }

    async fn cleanup(self) -> Result<()> {
        Ok(())
    }

    async fn select_receive(
        &mut self,
        result: Result<Option<GameRequest>>,
    ) -> Result<()> {
        if let Some(game_request) = result? {
            match game_request {
                GameRequest::GetPlayer(request) => {
                    let response =
                        self.shared.get_player(&request.player_name).await;
                    message::send(&mut self.stream, response).await?;
                },
                GameRequest::MoveClientPlayer(request) => {
                    let response = self
                        .shared
                        .move_player(&self.player_name, request.direction)
                        .await?;
                    message::send(&mut self.stream, response).await?;
                },
            }
        }
        Ok(())
    }
}

#[derive(Debug, Clone)]
struct PlayerGameData {
    client_addr: Option<SocketAddr>,
    player: Player,
}

#[derive(Debug)]
struct Shared {
    cancel_token: CancellationToken,
    players: Mutex<HashMap<PlayerName, PlayerGameData>>,
}

impl Shared {
    pub fn new(cancel_token: CancellationToken) -> Self {
        Self { cancel_token, players: Mutex::new(HashMap::new()) }
    }

    pub async fn connect_player(
        &self,
        client_addr: SocketAddr,
        player_name: &PlayerName,
    ) -> LoginResponse {
        let mut players = self.players.lock().await;
        if let Some(player_data) = players.get_mut(player_name) {
            if player_data.client_addr.is_some() {
                return LoginResponse { result: Err(LoginError::AlreadyIn) };
            }
            player_data.client_addr = Some(client_addr);
            LoginResponse { result: Ok(player_data.player.clone()) }
        } else {
            let player = Player {
                name: player_name.clone(),
                location: Vec2 {
                    x: Coord::half_excess(),
                    y: Coord::half_excess(),
                },
                pointer: Direction::Up,
            };
            players.insert(
                player_name.clone(),
                PlayerGameData {
                    client_addr: Some(client_addr),
                    player: player.clone(),
                },
            );
            LoginResponse { result: Ok(player) }
        }
    }

    pub async fn get_player(
        &self,
        player_name: &PlayerName,
    ) -> GetPlayerResponse {
        let players = self.players.lock().await;
        let Some(player_data) = players.get(player_name) else {
            return GetPlayerResponse {
                result: Err(GetPlayerError::UnknownPlayer(player_name.clone())),
            };
        };
        if player_data.client_addr.is_none() {
            return GetPlayerResponse {
                result: Err(GetPlayerError::PlayerLoggedOff(
                    player_name.clone(),
                )),
            };
        }
        GetPlayerResponse { result: Ok(player_data.player.clone()) }
    }

    pub async fn move_player(
        &self,
        player_name: &PlayerName,
        direction: Direction,
    ) -> Result<MoveClientPlayerResponse> {
        let mut players = self.players.lock().await;
        let player_data = players.get_mut(player_name).ok_or_else(|| {
            anyhow!("player {} should be present, but it is not", player_name)
        })?;
        if player_data.player.pointer == direction {
            let Some(location) =
                player_data.player.location.checked_move(direction)
            else {
                return Ok(MoveClientPlayerResponse {
                    result: Err(MoveClientPlayerError::OffLimits),
                });
            };
            player_data.player.location = location;
        } else {
            if player_data.player.location.checked_move(direction).is_none() {
                return Ok(MoveClientPlayerResponse {
                    result: Err(MoveClientPlayerError::OffLimits),
                });
            }
            player_data.player.pointer = direction;
        }
        Ok(MoveClientPlayerResponse { result: Ok(player_data.player.clone()) })
    }
}
