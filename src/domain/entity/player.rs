use crate::domain::id;

use super::human::Human;

/// A handle to the player.
#[derive(
    Debug,
    Clone,
    PartialEq,
    PartialOrd,
    Eq,
    Ord,
    Hash,
    serde::Serialize,
    serde::Deserialize,
)]
pub struct Player {
    pub id: id::Player,
    pub human: Human,
}
