use std::collections::HashMap;

use andiskaz::{coord::Coord, event::Event, terminal::Terminal};
use gardiz::{coord::Vec2, map::Map};

use crate::domain::{
    client::Client as ClientTrait,
    entity::{npc::Npc, player::Player},
    error::Result,
    id,
    map::Cell,
    server::Server as ServerTrait,
    thede::Thede,
};

#[derive(Debug, Clone)]
struct Game {
    npcs: HashMap<id::Npc, Npc>,
    players: HashMap<id::Player, Player>,
    thedes: HashMap<id::Thede, Thede>,
    player: Player,
    map: Map<Coord, Cell>,
}

impl Game {
    fn new(player: Player) -> Self {
        Self {
            npcs: HashMap::new(),
            players: HashMap::from([(player.id, player.clone())]),
            thedes: HashMap::new(),
            player,
            map: Map::new(),
        }
    }
}

#[derive(Debug)]
pub struct Client<S>
where
    S: ServerTrait + Send + 'static,
{
    server: S,
    game: Game,
}

impl<S> Client<S>
where
    S: ServerTrait + Send + 'static,
{
    pub fn new(player: Player, server: S) -> Self {
        Self { server, game: Game::new(player) }
    }

    pub async fn run(self) -> Result<()> {
        Terminal::run(|term| async move { self.main(term).await }).await??;
        Ok(())
    }

    async fn main(self, mut term: Terminal) -> Result<()> {
        loop {
            let mut guard = term.listen().await?;
            if let Some(event) = guard.event() {
                match event {
                    Event::Resize(resize_evt) => {},
                    Event::Key(key_evt) => {},
                }
            }
        }
        Ok(())
    }
}

impl<S> ClientTrait for Client<S> where S: ServerTrait + Send + 'static {}
