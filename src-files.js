var srcIndex = new Map(JSON.parse('[\
["bitflags",["",[],["external.rs","internal.rs","iter.rs","lib.rs","parser.rs","public.rs","traits.rs"]]],\
["byteorder",["",[],["lib.rs"]]],\
["cfg_if",["",[],["lib.rs"]]],\
["chrono",["",[["datetime",[],["mod.rs"]],["format",[],["formatting.rs","locales.rs","mod.rs","parse.rs","parsed.rs","scan.rs","strftime.rs"]],["naive",[["date",[],["mod.rs"]],["datetime",[],["mod.rs"]],["time",[],["mod.rs"]]],["internals.rs","isoweek.rs","mod.rs"]],["offset",[["local",[["tz_info",[],["mod.rs","parser.rs","rule.rs","timezone.rs"]]],["mod.rs","unix.rs"]]],["fixed.rs","mod.rs","utc.rs"]]],["date.rs","lib.rs","month.rs","round.rs","time_delta.rs","traits.rs","weekday.rs"]]],\
["crossterm",["",[["cursor",[["sys",[],["unix.rs"]]],["sys.rs"]],["event",[["source",[["unix",[],["mio.rs"]]],["unix.rs"]],["sys",[["unix",[],["parse.rs"]]],["unix.rs"]]],["filter.rs","read.rs","source.rs","sys.rs","timeout.rs"]],["style",[["types",[],["attribute.rs","color.rs","colored.rs","colors.rs"]]],["attributes.rs","content_style.rs","styled_content.rs","stylize.rs","sys.rs","types.rs"]],["terminal",[["sys",[],["file_descriptor.rs","unix.rs"]]],["sys.rs"]]],["command.rs","cursor.rs","event.rs","lib.rs","macros.rs","style.rs","terminal.rs","tty.rs"]]],\
["directories",["",[],["lib.rs","lin.rs"]]],\
["dirs_sys",["",[],["lib.rs","xdg_user_dirs.rs"]]],\
["equivalent",["",[],["lib.rs"]]],\
["getrandom",["",[],["error.rs","error_impls.rs","lazy.rs","lib.rs","linux_android_with_fallback.rs","use_file.rs","util.rs","util_libc.rs"]]],\
["hashbrown",["",[["external_trait_impls",[],["mod.rs"]],["raw",[],["alloc.rs","bitmask.rs","mod.rs","sse2.rs"]]],["lib.rs","macros.rs","map.rs","scopeguard.rs","set.rs","table.rs"]]],\
["iana_time_zone",["",[],["ffi_utils.rs","lib.rs","tz_linux.rs"]]],\
["indexmap",["",[["map",[["core",[],["entry.rs","raw.rs","raw_entry_v1.rs"]]],["core.rs","iter.rs","mutable.rs","slice.rs"]],["set",[],["iter.rs","mutable.rs","slice.rs"]]],["arbitrary.rs","lib.rs","macros.rs","map.rs","set.rs","util.rs"]]],\
["lazy_static",["",[],["inline_lazy.rs","lib.rs"]]],\
["libc",["",[["unix",[["linux_like",[["linux",[["arch",[["generic",[],["mod.rs"]]],["mod.rs"]],["gnu",[["b64",[["x86_64",[],["align.rs","mod.rs","not_x32.rs"]]],["mod.rs"]]],["align.rs","mod.rs"]]],["align.rs","mod.rs","non_exhaustive.rs"]]],["mod.rs"]]],["align.rs","mod.rs"]]],["fixed_width_ints.rs","lib.rs","macros.rs"]]],\
["libm",["",[["math",[],["acos.rs","acosf.rs","acosh.rs","acoshf.rs","asin.rs","asinf.rs","asinh.rs","asinhf.rs","atan.rs","atan2.rs","atan2f.rs","atanf.rs","atanh.rs","atanhf.rs","cbrt.rs","cbrtf.rs","ceil.rs","ceilf.rs","copysign.rs","copysignf.rs","cos.rs","cosf.rs","cosh.rs","coshf.rs","erf.rs","erff.rs","exp.rs","exp10.rs","exp10f.rs","exp2.rs","exp2f.rs","expf.rs","expm1.rs","expm1f.rs","expo2.rs","fabs.rs","fabsf.rs","fdim.rs","fdimf.rs","fenv.rs","floor.rs","floorf.rs","fma.rs","fmaf.rs","fmax.rs","fmaxf.rs","fmin.rs","fminf.rs","fmod.rs","fmodf.rs","frexp.rs","frexpf.rs","hypot.rs","hypotf.rs","ilogb.rs","ilogbf.rs","j0.rs","j0f.rs","j1.rs","j1f.rs","jn.rs","jnf.rs","k_cos.rs","k_cosf.rs","k_expo2.rs","k_expo2f.rs","k_sin.rs","k_sinf.rs","k_tan.rs","k_tanf.rs","ldexp.rs","ldexpf.rs","lgamma.rs","lgamma_r.rs","lgammaf.rs","lgammaf_r.rs","log.rs","log10.rs","log10f.rs","log1p.rs","log1pf.rs","log2.rs","log2f.rs","logf.rs","mod.rs","modf.rs","modff.rs","nextafter.rs","nextafterf.rs","pow.rs","powf.rs","rem_pio2.rs","rem_pio2_large.rs","rem_pio2f.rs","remainder.rs","remainderf.rs","remquo.rs","remquof.rs","rint.rs","rintf.rs","round.rs","roundf.rs","scalbn.rs","scalbnf.rs","sin.rs","sincos.rs","sincosf.rs","sinf.rs","sinh.rs","sinhf.rs","sqrt.rs","sqrtf.rs","tan.rs","tanf.rs","tanh.rs","tanhf.rs","tgamma.rs","tgammaf.rs","trunc.rs","truncf.rs"]]],["lib.rs","libm_helper.rs"]]],\
["lock_api",["",[],["lib.rs","mutex.rs","remutex.rs","rwlock.rs"]]],\
["log",["",[],["__private_api.rs","lib.rs","macros.rs"]]],\
["matchers",["",[],["lib.rs"]]],\
["mio",["",[["event",[],["event.rs","events.rs","mod.rs","source.rs"]],["net",[["tcp",[],["listener.rs","mod.rs","stream.rs"]],["uds",[],["datagram.rs","listener.rs","mod.rs","stream.rs"]]],["mod.rs","udp.rs"]],["sys",[["unix",[["selector",[],["epoll.rs","mod.rs"]],["uds",[],["datagram.rs","listener.rs","mod.rs","socketaddr.rs","stream.rs"]]],["mod.rs","net.rs","pipe.rs","sourcefd.rs","tcp.rs","udp.rs","waker.rs"]]],["mod.rs"]]],["interest.rs","io_source.rs","lib.rs","macros.rs","poll.rs","token.rs","waker.rs"]]],\
["nu_ansi_term",["",[],["ansi.rs","debug.rs","difference.rs","display.rs","gradient.rs","lib.rs","rgb.rs","style.rs","util.rs","windows.rs","write.rs"]]],\
["num",["",[],["lib.rs"]]],\
["num_bigint",["",[["bigint",[],["addition.rs","bits.rs","convert.rs","division.rs","multiplication.rs","power.rs","shift.rs","subtraction.rs"]],["biguint",[],["addition.rs","bits.rs","convert.rs","division.rs","iter.rs","monty.rs","multiplication.rs","power.rs","shift.rs","subtraction.rs"]]],["bigint.rs","biguint.rs","lib.rs","macros.rs"]]],\
["num_complex",["",[],["cast.rs","complex_float.rs","lib.rs","pow.rs"]]],\
["num_derive",["",[],["lib.rs"]]],\
["num_integer",["",[],["average.rs","lib.rs","roots.rs"]]],\
["num_iter",["",[],["lib.rs"]]],\
["num_rational",["",[],["lib.rs","pow.rs"]]],\
["num_traits",["",[["ops",[],["bytes.rs","checked.rs","euclid.rs","inv.rs","mod.rs","mul_add.rs","overflowing.rs","saturating.rs","wrapping.rs"]]],["bounds.rs","cast.rs","float.rs","identities.rs","int.rs","lib.rs","macros.rs","pow.rs","real.rs","sign.rs"]]],\
["once_cell",["",[],["imp_std.rs","lib.rs","race.rs"]]],\
["option_ext",["",[],["impl.rs","lib.rs"]]],\
["overload",["",[],["assignment.rs","binary.rs","lib.rs","unary.rs"]]],\
["parking_lot",["",[],["condvar.rs","deadlock.rs","elision.rs","fair_mutex.rs","lib.rs","mutex.rs","once.rs","raw_fair_mutex.rs","raw_mutex.rs","raw_rwlock.rs","remutex.rs","rwlock.rs","util.rs"]]],\
["parking_lot_core",["",[["thread_parker",[],["linux.rs","mod.rs"]]],["lib.rs","parking_lot.rs","spinwait.rs","util.rs","word_lock.rs"]]],\
["pin_project_lite",["",[],["lib.rs"]]],\
["ppv_lite86",["",[["x86_64",[],["mod.rs","sse2.rs"]]],["lib.rs","soft.rs","types.rs"]]],\
["proc_macro2",["",[],["detection.rs","extra.rs","fallback.rs","lib.rs","marker.rs","parse.rs","rcvec.rs","wrapper.rs"]]],\
["quote",["",[],["ext.rs","format.rs","ident_fragment.rs","lib.rs","runtime.rs","spanned.rs","to_tokens.rs"]]],\
["rand",["",[["distributions",[],["bernoulli.rs","distribution.rs","float.rs","integer.rs","mod.rs","other.rs","slice.rs","uniform.rs","utils.rs","weighted.rs","weighted_index.rs"]],["rngs",[["adapter",[],["mod.rs","read.rs","reseeding.rs"]]],["mock.rs","mod.rs","std.rs","thread.rs"]],["seq",[],["index.rs","mod.rs"]]],["lib.rs","prelude.rs","rng.rs"]]],\
["rand_chacha",["",[],["chacha.rs","guts.rs","lib.rs"]]],\
["rand_core",["",[],["block.rs","error.rs","impls.rs","le.rs","lib.rs","os.rs"]]],\
["rand_distr",["",[],["binomial.rs","cauchy.rs","dirichlet.rs","exponential.rs","frechet.rs","gamma.rs","geometric.rs","gumbel.rs","hypergeometric.rs","inverse_gaussian.rs","lib.rs","normal.rs","normal_inverse_gaussian.rs","pareto.rs","pert.rs","poisson.rs","skew_normal.rs","triangular.rs","unit_ball.rs","unit_circle.rs","unit_disc.rs","unit_sphere.rs","utils.rs","weibull.rs","weighted_alias.rs","ziggurat_tables.rs","zipf.rs"]]],\
["regex",["",[["regex",[],["bytes.rs","mod.rs","string.rs"]],["regexset",[],["bytes.rs","mod.rs","string.rs"]]],["builders.rs","bytes.rs","error.rs","find_byte.rs","lib.rs"]]],\
["regex_automata",["",[["meta",[],["error.rs","literal.rs","mod.rs","regex.rs","reverse_inner.rs","strategy.rs","wrappers.rs"]],["nfa",[["thompson",[],["builder.rs","compiler.rs","error.rs","literal_trie.rs","map.rs","mod.rs","nfa.rs","pikevm.rs","range_trie.rs"]]],["mod.rs"]],["util",[["prefilter",[],["aho_corasick.rs","byteset.rs","memchr.rs","memmem.rs","mod.rs","teddy.rs"]],["unicode_data",[],["mod.rs"]]],["alphabet.rs","captures.rs","empty.rs","escape.rs","int.rs","interpolate.rs","iter.rs","lazy.rs","look.rs","memchr.rs","mod.rs","pool.rs","primitives.rs","search.rs","sparse_set.rs","start.rs","syntax.rs","utf8.rs","wire.rs"]]],["lib.rs","macros.rs"]]],\
["regex_syntax",["",[["ast",[],["mod.rs","parse.rs","print.rs","visitor.rs"]],["hir",[],["interval.rs","literal.rs","mod.rs","print.rs","translate.rs","visitor.rs"]],["unicode_tables",[],["case_folding_simple.rs","mod.rs","perl_decimal.rs","perl_space.rs","perl_word.rs","property_names.rs","property_values.rs"]]],["debug.rs","either.rs","error.rs","lib.rs","parser.rs","rank.rs","unicode.rs","utf8.rs"]]],\
["scopeguard",["",[],["lib.rs"]]],\
["sharded_slab",["",[["page",[],["mod.rs","slot.rs","stack.rs"]]],["cfg.rs","clear.rs","implementation.rs","iter.rs","lib.rs","macros.rs","pool.rs","shard.rs","sync.rs","tid.rs"]]],\
["signal_hook",["",[["iterator",[["exfiltrator",[],["mod.rs","raw.rs"]]],["backend.rs","mod.rs"]],["low_level",[],["channel.rs","mod.rs","pipe.rs","signal_details.rs"]]],["flag.rs","lib.rs"]]],\
["signal_hook_mio",["",[],["lib.rs"]]],\
["signal_hook_registry",["",[],["half_lock.rs","lib.rs"]]],\
["smallstr",["",[],["lib.rs","string.rs"]]],\
["smallvec",["",[],["lib.rs"]]],\
["syn",["",[["gen",[],["clone.rs","debug.rs","eq.rs","hash.rs","visit_mut.rs"]]],["attr.rs","bigint.rs","buffer.rs","classify.rs","custom_keyword.rs","custom_punctuation.rs","data.rs","derive.rs","discouraged.rs","drops.rs","error.rs","export.rs","expr.rs","ext.rs","file.rs","fixup.rs","generics.rs","group.rs","ident.rs","item.rs","lib.rs","lifetime.rs","lit.rs","lookahead.rs","mac.rs","macros.rs","meta.rs","op.rs","parse.rs","parse_macro_input.rs","parse_quote.rs","pat.rs","path.rs","precedence.rs","print.rs","punctuated.rs","restriction.rs","sealed.rs","span.rs","spanned.rs","stmt.rs","thread.rs","token.rs","tt.rs","ty.rs","verbatim.rs","whitespace.rs"]]],\
["thedes",["",[],["main.rs"]]],\
["thedes_app",["",[["play",[],["new.rs"]],["session",[],["paused.rs","running.rs"]]],["lib.rs","play.rs","root.rs","session.rs"]]],\
["thedes_domain",["",[],["game.rs","geometry.rs","lib.rs","map.rs","matter.rs","player.rs"]]],\
["thedes_gen",["",[["map",[["layer",[],["matter.rs","region.rs"]]],["layer.rs"]]],["game.rs","lib.rs","map.rs","matter.rs","random.rs"]]],\
["thedes_geometry",["",[],["axis.rs","coords.rs","lib.rs","rect.rs"]]],\
["thedes_graphics",["",[],["background.rs","camera.rs","foreground.rs","game_screen.rs","lib.rs"]]],\
["thedes_tui",["",[["color",[],["basic.rs","brightness.rs","eight_bit.rs","gray.rs","legacy_rgb.rs","pair.rs","rgb.rs"]],["component",[],["info.rs","input.rs","menu.rs","task.rs"]],["screen",[],["style.rs"]]],["color.rs","component.rs","config.rs","event.rs","geometry.rs","grapheme.rs","lib.rs","panic.rs","runtime.rs","screen.rs","tile.rs"]]],\
["thiserror",["",[],["aserror.rs","display.rs","lib.rs"]]],\
["thiserror_impl",["",[],["ast.rs","attr.rs","expand.rs","fmt.rs","generics.rs","lib.rs","prop.rs","span.rs","valid.rs"]]],\
["thread_local",["",[],["cached.rs","lib.rs","thread_id.rs","unreachable.rs"]]],\
["tracing",["",[],["dispatcher.rs","field.rs","instrument.rs","level_filters.rs","lib.rs","macros.rs","span.rs","stdlib.rs","subscriber.rs"]]],\
["tracing_attributes",["",[],["attr.rs","expand.rs","lib.rs"]]],\
["tracing_core",["",[],["callsite.rs","dispatcher.rs","event.rs","field.rs","lazy.rs","lib.rs","metadata.rs","parent.rs","span.rs","stdlib.rs","subscriber.rs"]]],\
["tracing_log",["",[],["lib.rs","log_tracer.rs"]]],\
["tracing_subscriber",["",[["field",[],["debug.rs","delimited.rs","display.rs","mod.rs"]],["filter",[["env",[],["builder.rs","directive.rs","field.rs","mod.rs"]],["layer_filters",[],["combinator.rs","mod.rs"]]],["directive.rs","filter_fn.rs","level.rs","mod.rs","targets.rs"]],["fmt",[["format",[],["mod.rs","pretty.rs"]],["time",[],["datetime.rs","mod.rs"]]],["fmt_layer.rs","mod.rs","writer.rs"]],["layer",[],["context.rs","layered.rs","mod.rs"]],["registry",[],["extensions.rs","mod.rs","sharded.rs","stack.rs"]]],["lib.rs","macros.rs","prelude.rs","reload.rs","sync.rs","util.rs"]]],\
["unicode_ident",["",[],["lib.rs","tables.rs"]]],\
["unicode_segmentation",["",[],["grapheme.rs","lib.rs","sentence.rs","tables.rs","word.rs"]]],\
["zerocopy",["",[["third_party",[["rust",[],["layout.rs"]]]]],["byteorder.rs","lib.rs","macro_util.rs","macros.rs","post_monomorphization_compile_fail_tests.rs","util.rs","wrappers.rs"]]],\
["zerocopy_derive",["",[],["ext.rs","lib.rs","repr.rs"]]]\
]'));
createSrcSidebar();
