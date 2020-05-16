use crate::{
    entity::language::{Language, Meaning},
    error::Result,
    map::GeneratingMap,
    math::{
        plane::{Coord2, Direc, Nat},
        rand::{
            noise::{NoiseGen, NoiseProcessor},
            weighted,
            Seed,
        },
    },
    storage::save::{SavedGame, Tree},
    structures::HouseGenConfig,
};
use ahash::AHasher;
use num::rational::Ratio;
use rand::rngs::StdRng;
use std::{
    collections::HashSet,
    error::Error,
    fmt,
    hash::{Hash, Hasher},
};

const SEED_SALT: u64 = 0x13B570C3284608A3;

type Weight = u64;

const HOUSE_MIN_ATTEMPTS: Nat = 2;
const HOUSE_ATTEMPTS: Ratio<Nat> = Ratio::new_raw(5, 2);
const HOUSE_MIN_DISTANCE: Nat = 3;
const HOUSE_MIN_SIZE: Nat = 5;
const HOUSE_MAX_SIZE: Nat = 20;

const WEIGHTS: &'static [weighted::Entry<bool, Weight>] = &[
    weighted::Entry { data: false, weight: 4 },
    weighted::Entry { data: true, weight: 3 },
];

/// ID of a thede.
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
pub struct Id(u16);

impl fmt::Display for Id {
    fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
        fmt::Display::fmt(&self.0, fmt)
    }
}

fn dummy_id() -> Id {
    Id(0)
}

/// A thede's data.
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct Thede {
    #[serde(skip)]
    #[serde(default = "dummy_id")]
    id: Id,
    hash: u64,
    language: Language,
}

impl Thede {
    /// Returns a reference to the language.
    pub fn language(&self) -> &Language {
        &self.language
    }

    /// Returns a mutable reference to the language.
    pub fn language_mut(&mut self) -> &mut Language {
        &mut self.language
    }
}

/// Storage registry for thedes.
#[derive(Debug, Clone)]
pub struct Registry {
    tree: Tree<Id, Thede>,
}

impl Registry {
    /// Attempts to open the tree of the thedes' registry.
    pub async fn new(db: &sled::Db) -> Result<Self> {
        let tree = Tree::open(db, "thede::Registry").await?;
        Ok(Self { tree })
    }

    pub async fn register<'map>(
        &self,
        start: Coord2<Nat>,
        game: &SavedGame,
        map: &mut GeneratingMap<'map>,
        generator: &Generator,
    ) -> Result<Id> {
        let fut = self.tree.generate_id(
            game.db(),
            |id| Id(id as u16),
            |&id| async move {
                let exploration = generator.explore(id, start, map).await?;
                let hash = exploration.hash;
                let fut = generator.gen_structures(exploration, id, game, map);
                fut.await?;

                let mut language = Language::random(game.seed(), hash);
                for &meaning in Meaning::ALL {
                    language.gen_word(meaning, game.seed(), hash);
                }

                Ok(Thede { id, hash, language })
            },
        );
        fut.await
    }
    /// Loads a thede. If not found, error is returned.
    pub async fn load(&self, id: Id) -> Result<Thede> {
        let thede = self.tree.get(&id).await?.ok_or(InvalidId(id))?;
        Ok(thede)
    }
}

#[derive(Debug)]
struct Exploration {
    hash: u64,
    points: Vec<Coord2<Nat>>,
}

/// Returned by [`Registry::load`] if the player does not exist.
#[derive(Debug, Clone, Copy)]
pub struct InvalidId(pub Id);

impl fmt::Display for InvalidId {
    fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
        write!(fmt, "Invalid thede id {}", self.0)
    }
}

impl Error for InvalidId {}

/// A weighted generator of biomes.
#[derive(Debug, Clone)]
pub struct Generator {
    noise_gen: NoiseGen,
    processor: weighted::Entries<bool, Weight>,
}

impl Generator {
    /// Creates a new generator.
    pub fn new(seed: Seed) -> Generator {
        let mut noise_gen = seed.make_noise_gen::<_, StdRng>(SEED_SALT);
        noise_gen.sensitivity = 0.004;
        let processor = weighted::Entries::new(WEIGHTS.iter().cloned());
        Self { noise_gen, processor }
    }

    /// Generates a biome tag at a given location.
    pub fn is_thede_at(&self, point: Coord2<Nat>) -> bool {
        (&&self.processor).process(point, &self.noise_gen).data
    }

    pub async fn generate<'map>(
        &self,
        start: Coord2<Nat>,
        game: &SavedGame,
        map: &mut GeneratingMap<'map>,
    ) -> Result<()> {
        game.thedes().register(start, game, map, self).await?;
        Ok(())
    }

    async fn explore<'map>(
        &self,
        id: Id,
        start: Coord2<Nat>,
        map: &mut GeneratingMap<'map>,
    ) -> Result<Exploration> {
        let mut stack = vec![start];
        let mut visited = HashSet::new();
        let mut hasher = AHasher::new_with_keys(0, 0);

        while let Some(point) = stack.pop() {
            point.hash(&mut hasher);
            map.entry_mut(point).await?.thede = Some(id);
            tracing::debug!(?point, "explore");
            for direc in Direc::iter() {
                if let Some(new_point) = point
                    .move_by_direc(direc)
                    .filter(|point| !visited.contains(point))
                {
                    let has_thede = self.is_thede_at(new_point);
                    if has_thede {
                        visited.insert(new_point);
                        stack.push(new_point);
                    }
                }
            }
        }

        let mut points = visited.into_iter().collect::<Vec<_>>();
        points.sort();
        Ok(Exploration { points, hash: hasher.finish() })
    }

    async fn gen_structures<'map>(
        &self,
        exploration: Exploration,
        id: Id,
        game: &SavedGame,
        map: &mut GeneratingMap<'map>,
    ) -> Result<()> {
        let rng = game.seed().make_rng::<_, StdRng>(exploration.hash);

        let max_house = HOUSE_MAX_SIZE + HOUSE_MIN_DISTANCE;
        let attempts_den = max_house * max_house * HOUSE_ATTEMPTS.denom();
        let len = exploration.points.len() as Nat;
        let attempts = len / attempts_den * HOUSE_ATTEMPTS.numer();
        let attempts = attempts.max(HOUSE_MIN_ATTEMPTS);

        let gen_houses = HouseGenConfig {
            points: exploration.points,
            min_size: Coord2::from_axes(|_| HOUSE_MIN_SIZE),
            max_size: Coord2::from_axes(|_| HOUSE_MAX_SIZE),
            min_distance: HOUSE_MIN_DISTANCE,
            attempts,
            rng,
        };

        for house in gen_houses {
            let head = house.rect.start.map(|a| a + 1);
            let facing = Direc::Down;
            game.npcs().register(game, map, head, facing, id).await?;
            house.spawn(map).await?;
        }

        Ok(())
    }
}
