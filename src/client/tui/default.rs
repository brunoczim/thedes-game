use andiskaz::terminal::Terminal;

use crate::domain::{client::Client as ClientTrait, error::Result};

#[derive(Debug)]
pub struct Client {}

impl Client {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn run(self) -> Result<()> {
        Terminal::run(|term| async move { self.main(term).await }).await??;
        Ok(())
    }

    async fn main(self, term: Terminal) -> Result<()> {
        Ok(())
    }
}

impl ClientTrait for Client {}
