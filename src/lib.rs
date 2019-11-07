/// Iterator extensions.
pub mod iter_ext;

/// Error handling.
pub mod error;

/// Contains utilites for handling uis.
pub mod ui;

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

/// Terminal handling utilites.
pub mod term;

/// Contains items related to the map of the game.
pub mod map;

/// Contains data related to game sessions (ongoing games).
pub mod session;

/// Contains utilities for timing loops.
pub mod timer;

/// Storage related functions, such as directories and saved games.
pub mod storage;

use crate::{
    backend::Backend,
    error::GameResult,
    render::Color,
    session::GameSession,
    storage::Save,
    ui::{MainMenu, MainMenuItem::*, Menu},
};

/// The 'top' function for the game.
pub fn game_main<B>() -> GameResult<()>
where
    B: Backend,
{
    let mut backend = B::load()?;
    backend.setbg(Color::Black)?;
    backend.setfg(Color::White)?;
    backend.clear_screen()?;
    loop {
        match MainMenu.select(&mut backend)? {
            NewGame => GameSession::new(&mut backend)?.exec(&mut backend)?,
            LoadGame => {
                if let Some(mut save) = Save::load_from_user(&mut backend)? {
                    save.session.exec(&mut backend)?
                }
            },
            Quit => break Ok(()),
        }
    }
}
