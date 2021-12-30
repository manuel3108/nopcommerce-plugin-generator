<script>
	import 'prismjs/prism.js';
	// import 'prismjs/themes/prism.css';
	import 'prismjs/components/prism-core.js';
	import 'prismjs/components/prism-clike.js';
	import 'prismjs/components/prism-csharp.js';
	import './prism-theme-vs-code-dark-plus.css';

	export let code = '';

	let divEl = null;

	let higlightedCode = '';
	$: higlightedCode = Prism.highlight(code, Prism.languages.csharp, 'csharp');
</script>

<pre>
	<code class="language-csharp">
		{@html higlightedCode}
	</code>
</pre>

<style>
	code {
		font-size: 15px !important;
	}

	pre {
		height: 500px;
		overflow: auto;
		word-wrap: normal;
		white-space: pre;
		margin: 0;
	}
</style>
