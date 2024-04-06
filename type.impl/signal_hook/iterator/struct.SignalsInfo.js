(function() {var type_impls = {
"signal_hook":[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-SignalsInfo%3CE%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#131-278\">source</a><a href=\"#impl-SignalsInfo%3CE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E: <a class=\"trait\" href=\"signal_hook/iterator/exfiltrator/trait.Exfiltrator.html\" title=\"trait signal_hook::iterator::exfiltrator::Exfiltrator\">Exfiltrator</a>&gt; <a class=\"struct\" href=\"signal_hook/iterator/struct.SignalsInfo.html\" title=\"struct signal_hook::iterator::SignalsInfo\">SignalsInfo</a>&lt;E&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.new\" class=\"method\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#136-143\">source</a><h4 class=\"code-header\">pub fn <a href=\"signal_hook/iterator/struct.SignalsInfo.html#tymethod.new\" class=\"fn\">new</a>&lt;I, S&gt;(signals: I) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;Self, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/std/io/error/struct.Error.html\" title=\"struct std::io::error::Error\">Error</a>&gt;<div class=\"where\">where\n    I: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/iter/traits/collect/trait.IntoIterator.html\" title=\"trait core::iter::traits::collect::IntoIterator\">IntoIterator</a>&lt;Item = S&gt;,\n    S: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/borrow/trait.Borrow.html\" title=\"trait core::borrow::Borrow\">Borrow</a>&lt;<a class=\"type\" href=\"libc/unix/type.c_int.html\" title=\"type libc::unix::c_int\">c_int</a>&gt;,\n    E: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a>,</div></h4></section></summary><div class=\"docblock\"><p>Creates the <code>Signals</code> structure.</p>\n<p>This registers all the signals listed. The same restrictions (panics, errors) apply as\nfor the <a href=\"signal_hook/iterator/backend/struct.Handle.html#method.add_signal\" title=\"method signal_hook::iterator::backend::Handle::add_signal\"><code>Handle::add_signal</code></a> method.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.with_exfiltrator\" class=\"method\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#146-158\">source</a><h4 class=\"code-header\">pub fn <a href=\"signal_hook/iterator/struct.SignalsInfo.html#tymethod.with_exfiltrator\" class=\"fn\">with_exfiltrator</a>&lt;I, S&gt;(signals: I, exfiltrator: E) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;Self, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/std/io/error/struct.Error.html\" title=\"struct std::io::error::Error\">Error</a>&gt;<div class=\"where\">where\n    I: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/iter/traits/collect/trait.IntoIterator.html\" title=\"trait core::iter::traits::collect::IntoIterator\">IntoIterator</a>&lt;Item = S&gt;,\n    S: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/borrow/trait.Borrow.html\" title=\"trait core::borrow::Borrow\">Borrow</a>&lt;<a class=\"type\" href=\"libc/unix/type.c_int.html\" title=\"type libc::unix::c_int\">c_int</a>&gt;,</div></h4></section></summary><div class=\"docblock\"><p>An advanced constructor with explicit <a href=\"signal_hook/iterator/exfiltrator/trait.Exfiltrator.html\" title=\"trait signal_hook::iterator::exfiltrator::Exfiltrator\"><code>Exfiltrator</code></a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.add_signal\" class=\"method\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#164-166\">source</a><h4 class=\"code-header\">pub fn <a href=\"signal_hook/iterator/struct.SignalsInfo.html#tymethod.add_signal\" class=\"fn\">add_signal</a>(&amp;self, signal: <a class=\"type\" href=\"libc/unix/type.c_int.html\" title=\"type libc::unix::c_int\">c_int</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/1.77.1/core/result/enum.Result.html\" title=\"enum core::result::Result\">Result</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.unit.html\">()</a>, <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/std/io/error/struct.Error.html\" title=\"struct std::io::error::Error\">Error</a>&gt;</h4></section></summary><div class=\"docblock\"><p>Registers another signal to the set watched by this <a href=\"signal_hook/iterator/type.Signals.html\" title=\"type signal_hook::iterator::Signals\"><code>Signals</code></a> instance.</p>\n<p>The same restrictions (panics, errors) apply as for the <a href=\"signal_hook/iterator/backend/struct.Handle.html#method.add_signal\" title=\"method signal_hook::iterator::backend::Handle::add_signal\"><code>Handle::add_signal</code></a>\nmethod.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.pending\" class=\"method\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#177-179\">source</a><h4 class=\"code-header\">pub fn <a href=\"signal_hook/iterator/struct.SignalsInfo.html#tymethod.pending\" class=\"fn\">pending</a>(&amp;mut self) -&gt; <a class=\"struct\" href=\"signal_hook/iterator/backend/struct.Pending.html\" title=\"struct signal_hook::iterator::backend::Pending\">Pending</a>&lt;E&gt; <a href=\"#\" class=\"tooltip\" data-notable-ty=\"Pending&lt;E&gt;\">ⓘ</a></h4></section></summary><div class=\"docblock\"><p>Returns an iterator of already received signals.</p>\n<p>This returns an iterator over all the signal numbers of the signals received since last\ntime they were read (out of the set registered by this <code>Signals</code> instance). Note that they\nare returned in arbitrary order and a signal instance may returned only once even if it was\nreceived multiple times.</p>\n<p>This method returns immediately (does not block) and may produce an empty iterator if there\nare no signals ready.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.wait\" class=\"method\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#209-220\">source</a><h4 class=\"code-header\">pub fn <a href=\"signal_hook/iterator/struct.SignalsInfo.html#tymethod.wait\" class=\"fn\">wait</a>(&amp;mut self) -&gt; <a class=\"struct\" href=\"signal_hook/iterator/backend/struct.Pending.html\" title=\"struct signal_hook::iterator::backend::Pending\">Pending</a>&lt;E&gt; <a href=\"#\" class=\"tooltip\" data-notable-ty=\"Pending&lt;E&gt;\">ⓘ</a></h4></section></summary><div class=\"docblock\"><p>Waits for some signals to be available and returns an iterator.</p>\n<p>This is similar to <a href=\"signal_hook/iterator/struct.SignalsInfo.html#method.pending\" title=\"method signal_hook::iterator::SignalsInfo::pending\"><code>pending</code></a>. If there are no signals available, it\ntries to wait for some to arrive. However, due to implementation details, this still can\nproduce an empty iterator.</p>\n<p>This can block for arbitrary long time. If the <a href=\"signal_hook/iterator/backend/struct.Handle.html#method.close\" title=\"method signal_hook::iterator::backend::Handle::close\"><code>Handle::close</code></a> method is used in\nanother thread this method will return immediately.</p>\n<p>Note that the blocking is done in this method, not in the iterator.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_closed\" class=\"method\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#225-227\">source</a><h4 class=\"code-header\">pub fn <a href=\"signal_hook/iterator/struct.SignalsInfo.html#tymethod.is_closed\" class=\"fn\">is_closed</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/1.77.1/std/primitive.bool.html\">bool</a></h4></section></summary><div class=\"docblock\"><p>Is it closed?</p>\n<p>See <a href=\"signal_hook/iterator/backend/struct.Handle.html#method.close\" title=\"method signal_hook::iterator::backend::Handle::close\"><code>close</code></a>.</p>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.forever\" class=\"method\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#268-270\">source</a><h4 class=\"code-header\">pub fn <a href=\"signal_hook/iterator/struct.SignalsInfo.html#tymethod.forever\" class=\"fn\">forever</a>(&amp;mut self) -&gt; <a class=\"struct\" href=\"signal_hook/iterator/struct.Forever.html\" title=\"struct signal_hook::iterator::Forever\">Forever</a>&lt;'_, E&gt; <a href=\"#\" class=\"tooltip\" data-notable-ty=\"Forever&lt;&#39;_, E&gt;\">ⓘ</a></h4></section></summary><div class=\"docblock\"><p>Get an infinite iterator over arriving signals.</p>\n<p>The iterator’s <code>next()</code> blocks as necessary to wait for signals to arrive. This is adequate\nif you want to designate a thread solely to handling signals. If multiple signals come at\nthe same time (between two values produced by the iterator), they will be returned in\narbitrary order. Multiple instances of the same signal may be collated.</p>\n<p>This is also the iterator returned by <code>IntoIterator</code> implementation on <code>&amp;mut Signals</code>.</p>\n<p>This iterator terminates only if explicitly <a href=\"signal_hook/iterator/backend/struct.Handle.html#method.close\" title=\"method signal_hook::iterator::backend::Handle::close\">closed</a>.</p>\n<h5 id=\"examples\"><a class=\"doc-anchor\" href=\"#examples\">§</a>Examples</h5>\n<div class=\"example-wrap\"><pre class=\"rust rust-example-rendered\"><code><span class=\"kw\">use </span>signal_hook::consts::signal::<span class=\"kw-2\">*</span>;\n<span class=\"kw\">use </span>signal_hook::iterator::Signals;\n\n<span class=\"kw\">let </span><span class=\"kw-2\">mut </span>signals = Signals::new(<span class=\"kw-2\">&amp;</span>[SIGUSR1, SIGUSR2])<span class=\"question-mark\">?</span>;\n<span class=\"kw\">let </span>handle = signals.handle();\nthread::spawn(<span class=\"kw\">move </span>|| {\n    <span class=\"kw\">for </span>signal <span class=\"kw\">in </span>signals.forever() {\n        <span class=\"kw\">match </span>signal {\n            SIGUSR1 =&gt; {},\n            SIGUSR2 =&gt; {},\n            <span class=\"kw\">_ </span>=&gt; <span class=\"macro\">unreachable!</span>(),\n        }\n    }\n});\nhandle.close();</code></pre></div>\n</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.handle\" class=\"method\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#275-277\">source</a><h4 class=\"code-header\">pub fn <a href=\"signal_hook/iterator/struct.SignalsInfo.html#tymethod.handle\" class=\"fn\">handle</a>(&amp;self) -&gt; <a class=\"struct\" href=\"signal_hook/iterator/backend/struct.Handle.html\" title=\"struct signal_hook::iterator::backend::Handle\">Handle</a></h4></section></summary><div class=\"docblock\"><p>Get a shareable handle to a <a href=\"signal_hook/iterator/backend/struct.Handle.html\" title=\"struct signal_hook::iterator::backend::Handle\"><code>Handle</code></a> for this instance.</p>\n<p>This can be used to add further signals or close the <a href=\"signal_hook/iterator/type.Signals.html\" title=\"type signal_hook::iterator::Signals\"><code>Signals</code></a> instance.</p>\n</div></details></div></details>",0,"signal_hook::iterator::Signals"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Debug-for-SignalsInfo%3CE%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#280-288\">source</a><a href=\"#impl-Debug-for-SignalsInfo%3CE%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;E&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> for <a class=\"struct\" href=\"signal_hook/iterator/struct.SignalsInfo.html\" title=\"struct signal_hook::iterator::SignalsInfo\">SignalsInfo</a>&lt;E&gt;<div class=\"where\">where\n    E: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a> + <a class=\"trait\" href=\"signal_hook/iterator/exfiltrator/trait.Exfiltrator.html\" title=\"trait signal_hook::iterator::exfiltrator::Exfiltrator\">Exfiltrator</a>,\n    E::Storage: <a class=\"trait\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html\" title=\"trait core::fmt::Debug\">Debug</a>,</div></h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.fmt\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/signal_hook/iterator/mod.rs.html#285-287\">source</a><a href=\"#method.fmt\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\" class=\"fn\">fmt</a>(&amp;self, fmt: &amp;mut <a class=\"struct\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/struct.Formatter.html\" title=\"struct core::fmt::Formatter\">Formatter</a>&lt;'_&gt;) -&gt; <a class=\"type\" href=\"https://doc.rust-lang.org/1.77.1/core/fmt/type.Result.html\" title=\"type core::fmt::Result\">FmtResult</a></h4></section></summary><div class='docblock'>Formats the value using the given formatter. <a href=\"https://doc.rust-lang.org/1.77.1/core/fmt/trait.Debug.html#tymethod.fmt\">Read more</a></div></details></div></details>","Debug","signal_hook::iterator::Signals"]]
};if (window.register_type_impls) {window.register_type_impls(type_impls);} else {window.pending_type_impls = type_impls;}})()