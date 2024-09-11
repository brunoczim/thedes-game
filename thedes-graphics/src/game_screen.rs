use std::{fmt, iter};

use thedes_domain::{
    game::Game,
    item::{self, Inventory, SlotEntry, StackableItem8},
};
use thedes_geometry::CoordPair;
use thedes_tui::{
    color::{
        BasicColor,
        Color,
        ColorPair,
        ContrastFgWithBg,
        MutationExt as _,
        SetFg,
    },
    geometry::Coord,
    grapheme::{self, NotGrapheme},
    tile::{MutateColors, MutationExt as _, SetGrapheme, Tile},
    CanvasError,
    InvalidCanvasPoint,
    TextStyle,
    Tick,
};
use thiserror::Error;

use crate::{
    camera::{self, Camera},
    tile::{foreground::Stick, Foreground},
};

#[derive(Debug, Error)]
pub enum Error {
    #[error("Error manipulating camera")]
    Camera(
        #[from]
        #[source]
        camera::Error,
    ),
    #[error("Error rendering info")]
    Canvas(
        #[from]
        #[source]
        CanvasError,
    ),
    #[error("Programming error defining graphemes")]
    NotGrapheme(
        #[from]
        #[source]
        NotGrapheme,
    ),
    #[error("Manually accessing canvas point failed")]
    InvalidCanvasPoint(
        #[from]
        #[source]
        InvalidCanvasPoint,
    ),
    #[error("Failed to access inventory")]
    InventoryAccess(
        #[from]
        #[source]
        item::AccessError,
    ),
}

#[derive(Debug, Clone)]
pub struct Config {
    camera: camera::Config,
}

impl Default for Config {
    fn default() -> Self {
        Self::new()
    }
}

impl Config {
    pub fn new() -> Self {
        Self { camera: camera::Config::new() }
    }

    pub fn with_camera(self, camera_config: camera::Config) -> Self {
        Self { camera: camera_config, ..self }
    }

    pub fn finish(self) -> GameScreen {
        GameScreen::new(self)
    }
}

#[derive(Debug, Clone)]
pub struct GameScreen {
    camera: Camera,
}

impl GameScreen {
    // 3 or 100%
    const INVENTORY_INFO_WIDTH: Coord = 4;
    // y or x
    const INVENTORY_ICON_WIDTH: Coord = 1;
    // |   3|y|
    const INVENTORY_WIDTH: Coord =
        1 + Self::INVENTORY_INFO_WIDTH + 1 + Self::INVENTORY_ICON_WIDTH + 1;
    const INVENTORY_HEIGHT: Coord =
        1 + 1 + 2 * (Inventory::SLOT_COUNT as Coord);
    const POS_HEIGHT: Coord = 1;

    fn new(config: Config) -> Self {
        Self { camera: config.camera.finish() }
    }

    pub fn on_tick(
        &mut self,
        tick: &mut Tick,
        game: &Game,
    ) -> Result<(), Error> {
        tick.screen_mut().clear_canvas(BasicColor::Black.into())?;

        let camera_dynamic_style = camera::DynamicStyle {
            margin_top_left: CoordPair { y: Self::POS_HEIGHT, x: 0 },
            margin_bottom_right: CoordPair { y: 0, x: Self::INVENTORY_WIDTH },
        };
        self.camera.on_tick(tick, game, &camera_dynamic_style)?;

        let pos_string = format!("↱{}", game.player().position().head());
        tick.screen_mut().styled_text(&pos_string, &TextStyle::default())?;

        self.render_inventory(tick, game)?;

        Ok(())
    }

    fn render_inventory(
        &mut self,
        tick: &mut Tick,
        game: &Game,
    ) -> Result<(), Error> {
        self.render_inventory_grids(tick)?;

        for i in 0 .. Inventory::SLOT_COUNT {
            match game.player().inventory().get(i)? {
                SlotEntry::Vaccant => (),
                SlotEntry::Stackable8(entry) => {
                    let (base_color, grapheme) = match entry.item() {
                        StackableItem8::Stick => (
                            Stick.base_color(),
                            Stick.grapheme(
                                tick.screen_mut().grapheme_registry_mut(),
                            )?,
                        ),
                    };
                    self.render_inventory_icon(tick, i, base_color, grapheme)?;
                    self.render_inventory_info(tick, i, entry.count())?;
                },
            }
        }

        Ok(())
    }

    fn render_inventory_icon(
        &mut self,
        tick: &mut Tick,
        index: usize,
        color: Color,
        grapheme: grapheme::Id,
    ) -> Result<(), Error> {
        let point = CoordPair {
            y: 1 + 2 * index as Coord,
            x: tick.screen().canvas_size().x - 1 - Self::INVENTORY_ICON_WIDTH,
        };
        let mutation = MutateColors(SetFg(color).then(ContrastFgWithBg))
            .then(SetGrapheme(grapheme));
        tick.screen_mut().mutate(point, mutation)?;
        Ok(())
    }

    fn render_inventory_info(
        &mut self,
        tick: &mut Tick,
        index: usize,
        info: impl fmt::Display,
    ) -> Result<(), Error> {
        let point = CoordPair {
            y: 1 + 2 * index as Coord,
            x: tick.screen().canvas_size().x + 1 - Self::INVENTORY_WIDTH,
        };
        let text = format!(
            "{info:width$}",
            width = Self::INVENTORY_INFO_WIDTH as usize
        );
        tick.screen_mut().inline_text(
            point,
            &text,
            ColorPair {
                foreground: BasicColor::White.into(),
                background: BasicColor::Black.into(),
            },
        )?;
        Ok(())
    }

    fn render_inventory_grids(&mut self, tick: &mut Tick) -> Result<(), Error> {
        let bold_vert_pipe =
            tick.screen_mut().grapheme_registry_mut().get_or_register("┃")?;
        let bold_bottom_left =
            tick.screen_mut().grapheme_registry_mut().get_or_register("┗")?;
        let bold_horz_pipe =
            tick.screen_mut().grapheme_registry_mut().get_or_register("━")?;
        let horz_pipe =
            tick.screen_mut().grapheme_registry_mut().get_or_register("─")?;
        let vert_pipe =
            tick.screen_mut().grapheme_registry_mut().get_or_register("│")?;
        let ceil =
            tick.screen_mut().grapheme_registry_mut().get_or_register("┬")?;
        let floor =
            tick.screen_mut().grapheme_registry_mut().get_or_register("┴")?;
        let cross =
            tick.screen_mut().grapheme_registry_mut().get_or_register("┼")?;

        let top_left = CoordPair {
            y: 0,
            x: tick.screen().canvas_size().x - Self::INVENTORY_WIDTH,
        };

        let bold_vertical_pipe_len = Self::INVENTORY_HEIGHT - 1;
        for dy in 0 .. bold_vertical_pipe_len {
            let point = top_left + CoordPair { y: dy, x: 0 };
            tick.screen_mut().mutate(
                point,
                Tile {
                    colors: ColorPair {
                        foreground: BasicColor::White.into(),
                        background: BasicColor::Black.into(),
                    },
                    grapheme: bold_vert_pipe,
                },
            )?;
        }

        let bottom_left =
            top_left + CoordPair { y: Self::INVENTORY_HEIGHT - 1, x: 0 };
        tick.screen_mut().mutate(
            bottom_left,
            Tile {
                colors: ColorPair {
                    foreground: BasicColor::White.into(),
                    background: BasicColor::Black.into(),
                },
                grapheme: bold_bottom_left,
            },
        )?;

        for dx in 1 .. Self::INVENTORY_WIDTH {
            let point = bottom_left + CoordPair { y: 0, x: dx };
            tick.screen_mut().mutate(
                point,
                Tile {
                    colors: ColorPair {
                        foreground: BasicColor::White.into(),
                        background: BasicColor::Black.into(),
                    },
                    grapheme: bold_horz_pipe,
                },
            )?;
        }

        for i in 0 ..= Inventory::SLOT_COUNT as Coord {
            let dy = 2 * i;
            for dx in (1 ..= Self::INVENTORY_INFO_WIDTH)
                .chain(iter::once(Self::INVENTORY_INFO_WIDTH + 2))
            {
                let point = top_left + CoordPair { y: dy, x: dx };
                tick.screen_mut().mutate(
                    point,
                    Tile {
                        colors: ColorPair {
                            foreground: BasicColor::White.into(),
                            background: BasicColor::Black.into(),
                        },
                        grapheme: horz_pipe,
                    },
                )?;
            }
        }

        let vert_sep_dx =
            [Self::INVENTORY_INFO_WIDTH + 1, Self::INVENTORY_INFO_WIDTH + 3];

        for dx in vert_sep_dx {
            let point = top_left + CoordPair { y: 0, x: dx };
            tick.screen_mut().mutate(
                point,
                Tile {
                    colors: ColorPair {
                        foreground: BasicColor::White.into(),
                        background: BasicColor::Black.into(),
                    },
                    grapheme: ceil,
                },
            )?;

            let point =
                top_left + CoordPair { y: Self::INVENTORY_HEIGHT - 2, x: dx };
            tick.screen_mut().mutate(
                point,
                Tile {
                    colors: ColorPair {
                        foreground: BasicColor::White.into(),
                        background: BasicColor::Black.into(),
                    },
                    grapheme: floor,
                },
            )?;
        }

        for i in 0 .. Inventory::SLOT_COUNT as Coord {
            let dy = 2 * i + 1;
            for dx in vert_sep_dx {
                let point = top_left + CoordPair { y: dy, x: dx };
                tick.screen_mut().mutate(
                    point,
                    Tile {
                        colors: ColorPair {
                            foreground: BasicColor::White.into(),
                            background: BasicColor::Black.into(),
                        },
                        grapheme: vert_pipe,
                    },
                )?;
            }
        }

        for i in 1 .. Inventory::SLOT_COUNT as Coord {
            let dy = 2 * i;
            for dx in vert_sep_dx {
                let point = top_left + CoordPair { y: dy, x: dx };
                tick.screen_mut().mutate(
                    point,
                    Tile {
                        colors: ColorPair {
                            foreground: BasicColor::White.into(),
                            background: BasicColor::Black.into(),
                        },
                        grapheme: cross,
                    },
                )?;
            }
        }

        Ok(())
    }
}
