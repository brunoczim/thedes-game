use super::id;

/// A thede's data.
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Thede {
    pub id: id::Thede,
    pub hash: u64,
}
