<script lang="ts">
	import 'prismjs/prism.js';
	import 'prismjs/components/prism-core.js';
	import 'prismjs/components/prism-clike.js';
	import 'prismjs/components/prism-csharp.js';
	import 'prismjs/components/prism-json.js';
	import 'prismjs/components/prism-markup.js';
	import 'prismjs/components/prism-cshtml.js';

	// custom theme
	import './prism-theme-vs-code-dark-plus.css';
	import type { File } from '$lib/scripts/common/File';

	export let file: File;

	let higlightedCode = '';
	let language = 'markup';

	$: {
		if (file) {
			switch (file.extension) {
				case 'cs':
					language = 'csharp';
					break;
				case 'json':
					language = 'json';
					break;
				case 'cshtml':
					language = 'cshtml';
					break;
				case 'csproj':
					language = 'markup';
					break;

				default:
					break;
			}

			// @ts-ignore
			higlightedCode = Prism.highlight(file.content, Prism.languages[language], language);
		}
	}
</script>

<pre>
	<code class="language-{language}">
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
		background-color: #1e1e1e;
	}

	pre :global(.namespace) {
		opacity: 1;
	}

	/* bulma and prisma use the same class name for numbers, thats why we need to reset some styling */
	pre :global(.tag),
	pre :global(.number) {
		align-items: unset;
		background-color: unset;
		border-radius: unset;
		display: unset;
		font-size: unset;
		height: unset;
		justify-content: unset;
		margin-right: unset;
		min-width: unset;
		padding: unset;
		text-align: unset;
		vertical-align: unset;
	}
</style>
