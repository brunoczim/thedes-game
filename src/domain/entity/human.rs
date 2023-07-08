use gardiz::{coord::Vec2, direc::Direction};

use crate::domain::map::Coord;

pub type Health = u8;

/// A generic human entity.
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
pub struct Human {
    /// Coordinates of the head.
    pub head: Vec2<Coord>,
    /// The direction the human is facing.
    pub facing: Direction,
    /// The human health.
    pub health: Health,
    /// The human maximum health.
    pub max_health: Health,
}
