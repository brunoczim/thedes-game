/// Contains utilites for handling menus.
pub mod menu;

/// Contains items related to key pressing.
pub mod key;

/// Contains items related to current player handling.
pub mod player;

/// Contains items related to orientation in the game.
pub mod orient;

/// Contains items related to rendering on the screen.
pub mod render;

/// Contains items related to the backend of IO.
pub mod backend;

/// Contains items related to the map of the game.
pub mod map;

/// Contains data related to game sessions (ongoing games).
pub mod session;

/// Contains utilities for timing loops.
pub mod timer;

use crate::{
    backend::Backend,
    menu::{MainMenu, Menu},
    render::Color,
    session::GameSession,
};
use std::io;

/// The 'top' function for the game.
pub fn game_main<B>() -> io::Result<()>
where
    B: Backend,
{
    let mut backend = B::load()?;
    backend.setbg(Color::Black)?;
    backend.setfg(Color::White)?;
    backend.clear_screen()?;
    loop {
        match MainMenu::select(&MainMenu::ITEMS, &mut backend)? {
            MainMenu::NewGame => GameSession::main(&mut backend)?,
            MainMenu::Quit => break Ok(()),
        }
    }
}
