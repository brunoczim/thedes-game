use std::{error::Error, fmt, future::Future};

use async_trait::async_trait;
use tokio::sync::{mpsc, oneshot};

use crate::domain::{
    error::Result,
    event::{Dispatcher as DispatcherTrait, Listener as ListenerTrait},
};

#[derive(Debug, Clone)]
pub struct ConnectionClosed;

impl fmt::Display for ConnectionClosed {
    fn fmt(&self, fmtr: &mut fmt::Formatter) -> fmt::Result {
        write!(fmtr, "connection closed prematurely")
    }
}

impl Error for ConnectionClosed {}

#[derive(Debug, Clone)]
pub struct Dispatcher<T, R>
where
    T: Send,
    R: Send,
{
    sender: mpsc::Sender<(T, oneshot::Sender<R>)>,
}

#[async_trait]
impl<T, R> DispatcherTrait for Dispatcher<T, R>
where
    T: Send,
    R: Send,
{
    type Data = T;
    type Response = R;

    async fn dispatch(&self, data: Self::Data) -> Result<R> {
        let (response_sender, response_receiver) = oneshot::channel();
        self.sender
            .send((data, response_sender))
            .await
            .map_err(|_| ConnectionClosed)?;
        Ok(response_receiver.await?)
    }
}

#[derive(Debug)]
pub struct Listener<T, R>
where
    T: Send,
    R: Send,
{
    receiver: mpsc::Receiver<(T, oneshot::Sender<R>)>,
}

#[async_trait]
impl<T, R> ListenerTrait for Listener<T, R>
where
    T: Send,
    R: Send,
{
    type Data = T;
    type Response = R;

    async fn listen_next<F, A>(&mut self, handler: F) -> Result<bool>
    where
        F: FnOnce(Self::Data) -> A + Send,
        A: Future<Output = Result<Self::Response>> + Send,
    {
        let Some((data, response_sender)) = self.receiver.recv().await else {
            return Ok(false);
        };
        let response = handler(data).await?;
        response_sender.send(response).map_err(|_| ConnectionClosed)?;
        Ok(true)
    }
}
