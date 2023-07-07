use std::future::Future;

use async_trait::async_trait;

use super::error::Result;

#[async_trait]
pub trait Dispatcher {
    type Data;
    type Response;

    async fn dispatch(&self, data: Self::Data) -> Result<Self::Response>;
}

#[async_trait]
pub trait Listener {
    type Data;
    type Response;

    async fn listen_next<F, A>(&mut self, handler: F) -> Result<bool>
    where
        F: FnOnce(Self::Data) -> A + Send,
        A: Future<Output = Result<Self::Response>> + Send;
}
