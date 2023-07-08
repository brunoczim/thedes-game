use super::{biome::Biome, block::Block, ground::Ground, id};

pub type Coord = u16;

#[derive(
    Debug,
    Clone,
    Copy,
    PartialEq,
    Eq,
    PartialOrd,
    Ord,
    Hash,
    serde::Serialize,
    serde::Deserialize,
)]
pub struct Cell {
    pub biome: Biome,
    pub ground: Ground,
    pub block: Option<Block>,
    pub thede: Option<id::Thede>,
}
