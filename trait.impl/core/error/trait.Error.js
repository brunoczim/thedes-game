(function() {var implementors = {
"chrono":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"chrono/round/enum.RoundingError.html\" title=\"enum chrono::round::RoundingError\">RoundingError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"chrono/format/struct.ParseError.html\" title=\"struct chrono::format::ParseError\">ParseError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"chrono/struct.OutOfRange.html\" title=\"struct chrono::OutOfRange\">OutOfRange</a>"]],
"clap_builder":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"clap_builder/parser/enum.MatchesError.html\" title=\"enum clap_builder::parser::MatchesError\">MatchesError</a>"],["impl&lt;F: <a class=\"trait\" href=\"clap_builder/error/trait.ErrorFormatter.html\" title=\"trait clap_builder::error::ErrorFormatter\">ErrorFormatter</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"clap_builder/error/struct.Error.html\" title=\"struct clap_builder::error::Error\">Error</a>&lt;F&gt;"]],
"iana_time_zone":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"iana_time_zone/enum.GetTimezoneError.html\" title=\"enum iana_time_zone::GetTimezoneError\">GetTimezoneError</a>"]],
"indexmap":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"indexmap/struct.TryReserveError.html\" title=\"struct indexmap::TryReserveError\">TryReserveError</a>"]],
"log":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"log/struct.ParseLevelError.html\" title=\"struct log::ParseLevelError\">ParseLevelError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"log/struct.SetLoggerError.html\" title=\"struct log::SetLoggerError\">SetLoggerError</a>"]],
"num_bigint":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"num_bigint/struct.ParseBigIntError.html\" title=\"struct num_bigint::ParseBigIntError\">ParseBigIntError</a>"],["impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"num_bigint/struct.TryFromBigIntError.html\" title=\"struct num_bigint::TryFromBigIntError\">TryFromBigIntError</a>&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,</div>"]],
"num_complex":[["impl&lt;E: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"num_complex/struct.ParseComplexError.html\" title=\"struct num_complex::ParseComplexError\">ParseComplexError</a>&lt;E&gt;"]],
"num_rational":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"num_rational/struct.ParseRatioError.html\" title=\"struct num_rational::ParseRatioError\">ParseRatioError</a>"]],
"proc_macro2":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"proc_macro2/struct.LexError.html\" title=\"struct proc_macro2::LexError\">LexError</a>"]],
"regex":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"regex/enum.Error.html\" title=\"enum regex::Error\">Error</a>"]],
"regex_automata":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/meta/struct.BuildError.html\" title=\"struct regex_automata::meta::BuildError\">BuildError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/nfa/thompson/struct.BuildError.html\" title=\"struct regex_automata::nfa::thompson::BuildError\">BuildError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/struct.MatchError.html\" title=\"struct regex_automata::MatchError\">MatchError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/struct.PatternSetInsertError.html\" title=\"struct regex_automata::PatternSetInsertError\">PatternSetInsertError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/util/captures/struct.GroupInfoError.html\" title=\"struct regex_automata::util::captures::GroupInfoError\">GroupInfoError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/util/look/struct.UnicodeWordBoundaryError.html\" title=\"struct regex_automata::util::look::UnicodeWordBoundaryError\">UnicodeWordBoundaryError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/util/primitives/struct.PatternIDError.html\" title=\"struct regex_automata::util::primitives::PatternIDError\">PatternIDError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/util/primitives/struct.SmallIndexError.html\" title=\"struct regex_automata::util::primitives::SmallIndexError\">SmallIndexError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/util/primitives/struct.StateIDError.html\" title=\"struct regex_automata::util::primitives::StateIDError\">StateIDError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/util/wire/struct.DeserializeError.html\" title=\"struct regex_automata::util::wire::DeserializeError\">DeserializeError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_automata/util/wire/struct.SerializeError.html\" title=\"struct regex_automata::util::wire::SerializeError\">SerializeError</a>"]],
"regex_syntax":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"regex_syntax/enum.Error.html\" title=\"enum regex_syntax::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_syntax/ast/struct.Error.html\" title=\"struct regex_syntax::ast::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_syntax/hir/struct.CaseFoldError.html\" title=\"struct regex_syntax::hir::CaseFoldError\">CaseFoldError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_syntax/hir/struct.Error.html\" title=\"struct regex_syntax::hir::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"regex_syntax/struct.UnicodeWordError.html\" title=\"struct regex_syntax::UnicodeWordError\">UnicodeWordError</a>"]],
"strsim":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"strsim/enum.StrSimError.html\" title=\"enum strsim::StrSimError\">StrSimError</a>"]],
"syn":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"syn/parse/struct.Error.html\" title=\"struct syn::parse::Error\">Error</a>"]],
"thedes":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"thedes/enum.ProgramError.html\" title=\"enum thedes::ProgramError\">ProgramError</a>"]],
"thedes_geometry":[["impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"thedes_geometry/struct.InvalidLinePoint.html\" title=\"struct thedes_geometry::InvalidLinePoint\">InvalidLinePoint</a>&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,</div>"],["impl&lt;T&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"thedes_geometry/struct.InvalidRectPoint.html\" title=\"struct thedes_geometry::InvalidRectPoint\">InvalidRectPoint</a>&lt;T&gt;<div class=\"where\">where\n    T: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,</div>"]],
"thedes_tui":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"thedes_tui/enum.InitError.html\" title=\"enum thedes_tui::InitError\">InitError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"thedes_tui/enum.RenderError.html\" title=\"enum thedes_tui::RenderError\">RenderError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"thedes_tui/component/input/struct.CursorOutOfBounds.html\" title=\"struct thedes_tui::component::input::CursorOutOfBounds\">CursorOutOfBounds</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"thedes_tui/grapheme/struct.NotGrapheme.html\" title=\"struct thedes_tui::grapheme::NotGrapheme\">NotGrapheme</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"thedes_tui/grapheme/struct.UnknownId.html\" title=\"struct thedes_tui::grapheme::UnknownId\">UnknownId</a>"],["impl&lt;E&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"enum\" href=\"thedes_tui/enum.ExecutionError.html\" title=\"enum thedes_tui::ExecutionError\">ExecutionError</a>&lt;E&gt;<div class=\"where\">where\n    E: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a>,\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,</div>"],["impl&lt;O&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"thedes_tui/component/menu/struct.UnknownOption.html\" title=\"struct thedes_tui::component::menu::UnknownOption\">UnknownOption</a>&lt;O&gt;<div class=\"where\">where\n    Self: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/fmt/trait.Display.html\" title=\"trait core::fmt::Display\">Display</a>,</div>"]],
"tracing_core":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_core/dispatcher/struct.SetGlobalDefaultError.html\" title=\"struct tracing_core::dispatcher::SetGlobalDefaultError\">SetGlobalDefaultError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_core/metadata/struct.ParseLevelError.html\" title=\"struct tracing_core::metadata::ParseLevelError\">ParseLevelError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_core/metadata/struct.ParseLevelFilterError.html\" title=\"struct tracing_core::metadata::ParseLevelFilterError\">ParseLevelFilterError</a>"]],
"tracing_subscriber":[["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_subscriber/filter/struct.BadFieldName.html\" title=\"struct tracing_subscriber::filter::BadFieldName\">BadName</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_subscriber/filter/struct.FromEnvError.html\" title=\"struct tracing_subscriber::filter::FromEnvError\">FromEnvError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_subscriber/filter/struct.ParseError.html\" title=\"struct tracing_subscriber::filter::ParseError\">ParseError</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_subscriber/reload/struct.Error.html\" title=\"struct tracing_subscriber::reload::Error\">Error</a>"],["impl <a class=\"trait\" href=\"https://doc.rust-lang.org/1.78.0/core/error/trait.Error.html\" title=\"trait core::error::Error\">Error</a> for <a class=\"struct\" href=\"tracing_subscriber/util/struct.TryInitError.html\" title=\"struct tracing_subscriber::util::TryInitError\">TryInitError</a>"]]
};if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()