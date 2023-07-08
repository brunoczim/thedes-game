use crate::domain::id;

use super::human::{self, Human};

pub const MAX_HEALTH: human::Health = 20;

/// A handle to an NPC.
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
pub struct Npc {
    pub id: id::Npc,
    pub human: Human,
    pub thede: id::Thede,
}
