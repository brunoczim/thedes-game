use crate::{
    error::{ErrorExt, GameResult},
    orient::{Coord, Coord2D},
};
use ahash::AHasher;
use noise::{NoiseFn, Seedable};
use rand::{Rng, SeedableRng};
use std::{
    fmt,
    hash::{Hash, Hasher},
};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd)]
/// Error returned by [`weight::try_new`].
pub enum WeightError {
    /// Happens when an overflow occurs computing the weights' sum.
    Overflow,
    /// Happens when an empty array of weights is given.
    Empty,
    /// Happens when all weights are zeroes.
    Zeroes,
}

impl fmt::Display for WeightError {
    fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
        fmt.write_str(match self {
            Self::Overflow => {
                "weighted noise processor overflowed on the weights"
            },
            Self::Empty => "Weight array is empty",
            Self::Zeroes => "all weights are zeroes",
        })
    }
}

impl ErrorExt for WeightError {}

/// A seed used for reproducible pseudo-random number generation.
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
pub struct Seed {
    bits: u64,
}

impl Seed {
    /// Generates a random seed.
    pub fn random() -> Self {
        Self { bits: rand::thread_rng().gen() }
    }

    /// Builds a seed over a given unsigned integer.
    pub fn from_u64(bits: u64) -> Self {
        Self { bits }
    }

    /// Bits of the seed.
    pub fn bits(self) -> u64 {
        self.bits
    }

    /// Builds a random number generator that will generate values associated
    /// with the given index object.
    pub fn make_rng<T, R>(self, index: T) -> R
    where
        T: Hash,
        R: SeedableRng,
    {
        let mut hasher = AHasher::new_with_keys(0, 0);
        index.hash(&mut hasher);
        R::seed_from_u64(self.bits ^ hasher.finish())
    }

    /// Builds noise generator that will generate values associated with the
    /// given index object.
    pub fn make_noise_gen<T, N>(self, index: T, gen: N) -> N
    where
        N: Seedable,
        T: Hash,
    {
        let mut hasher = AHasher::new_with_keys(0, 0);
        index.hash(&mut hasher);
        let bits = self.bits ^ hasher.finish();
        gen.set_seed(bits as u32 ^ (bits >> 32) as u32)
    }
}

/// Extends noise functionality.
pub trait NoiseFnExt {
    /// Gets noise from a slice, rather than a fixed array.
    fn get_from_slice(&self, slice: &[f64]) -> f64;

    /// Gets noise from a given arbitrary input type.
    fn get_from<I>(&self, input: I) -> f64
    where
        I: NoiseInput,
    {
        input.apply_to(self)
    }
}

impl<N> NoiseFnExt for N
where
    N: NoiseFn<[f64; 2]> + NoiseFn<[f64; 3]> + NoiseFn<[f64; 4]>,
{
    fn get_from_slice(&self, mut slice: &[f64]) -> f64 {
        let mut computed = None;

        loop {
            match (slice.len(), computed) {
                (0, None) => break 0.0,
                (0, Some(val)) => break val,

                (1, None) => break self.get([slice[0], 0.0]),
                (1, Some(val)) => break self.get([slice[0], val]),

                (2, None) => break self.get([slice[0], slice[1]]),
                (2, Some(val)) => break self.get([slice[0], slice[1], val]),

                (3, None) => break self.get([slice[0], slice[1], slice[2]]),
                (3, Some(val)) => {
                    break self.get([slice[0], slice[1], slice[2], val])
                },

                (4, None) => {
                    break self.get([slice[0], slice[1], slice[2], slice[3]])
                },

                (_, Some(val)) => {
                    computed =
                        Some(self.get([slice[0], slice[1], slice[2], val]));
                    slice = &slice[3 ..];
                },
                (_, None) => {
                    computed = Some(
                        self.get([slice[0], slice[1], slice[2], slice[3]]),
                    );
                    slice = &slice[4 ..];
                },
            }
        }
    }
}

/// Data which can be applied to noise functions.
pub trait NoiseInput {
    /// Applies input to the given noise generator.
    fn apply_to<N>(&self, gen: &N) -> f64
    where
        N: NoiseFnExt + ?Sized;
}

impl NoiseInput for Coord {
    fn apply_to<N>(&self, gen: &N) -> f64
    where
        N: NoiseFnExt + ?Sized,
    {
        gen.get_from_slice(&[*self as f64 + 0.01])
    }
}

impl NoiseInput for Coord2D {
    fn apply_to<N>(&self, gen: &N) -> f64
    where
        N: NoiseFnExt + ?Sized,
    {
        gen.get_from_slice(&[self.x as f64 + 0.999, self.y as f64 + 0.999])
    }
}

impl<'input, T> NoiseInput for &'input T
where
    T: NoiseInput + ?Sized,
{
    fn apply_to<N>(&self, gen: &N) -> f64
    where
        N: NoiseFnExt + ?Sized,
    {
        (**self).apply_to(gen)
    }
}

/// A type that processes noise into a concrete value.
pub trait NoiseProcessor<I>
where
    I: NoiseInput,
{
    /// The value generated by this noise processor.
    type Output;

    /// Calls the noise generator as much as need to build the output value.
    fn process<N>(&self, input: I, gen: &N) -> Self::Output
    where
        N: NoiseFnExt + ?Sized;
}

/// A weighted noise processor.
#[derive(Debug, Clone)]
pub struct WeightedNoise {
    sums: Vec<u64>,
}

impl WeightedNoise {
    /// Builds a new weighted noise processor.
    ///
    /// # Panics
    /// Panics if weights overflow.
    pub fn new<I>(weights: I) -> Self
    where
        I: IntoIterator<Item = u64>,
    {
        Self::try_new(weights).expect("WeightedNoise::new failed")
    }

    /// Builds a new weighted noise processor. Returns error if weights
    /// overflow.
    pub fn try_new<I>(weights: I) -> GameResult<Self>
    where
        I: IntoIterator<Item = u64>,
    {
        let mut sums: Vec<u64> = weights.into_iter().collect();

        if sums.len() == 0 {
            Err(WeightError::Empty)?;
        }

        let mut acc = 0u64;

        for elem in &mut sums {
            acc = acc.checked_add(*elem).ok_or(WeightError::Overflow)?;
            *elem = acc
        }

        if acc == 0 {
            Err(WeightError::Zeroes)?;
        }

        Ok(Self { sums })
    }
}

impl<I> NoiseProcessor<I> for WeightedNoise
where
    I: NoiseInput,
{
    type Output = usize;

    fn process<N>(&self, input: I, gen: &N) -> Self::Output
    where
        N: NoiseFnExt + ?Sized,
    {
        let noise = gen.get_from(input);
        let scale = *self.sums.last().expect("checked on new");
        // loss ahead
        let scaled = (noise * 100.0 + 0.5) * scale as f64;
        let search = scaled as u64 + 1;
        self.sums.binary_search(&search).unwrap_or_else(|index| index)
    }
}
