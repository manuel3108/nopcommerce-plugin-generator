<script lang="ts">
	import JSZip from 'jszip';
	import saveAs from 'file-saver';
	import { Intend } from '$lib/scripts/common/Defaults';
	import type { TreeNode } from '$lib/scripts/common/FileTree';
	import type PluginConfig from '$lib/scripts/configs/PluginConfig';
	import type { File } from '$lib/scripts/common/File';

	export let fileTree: TreeNode;
	export let pluginImageUrl: string;
	export let config: PluginConfig;
	export let files: File[];
	export let fileExtension: string;

	function downloadPlugin() {
		const zip = new JSZip();

		addFilesToZip(fileTree, zip);

		var uri = pluginImageUrl;
		var index = uri.indexOf('base64,') + 'base64,'.length;
		var content = uri.substring(index);
		zip.file(config.base.nameSpace + '/logo.png', content, { base64: true });

		zip.generateAsync({ type: 'blob' }).then(function (content) {
			saveAs(content, config.base.nameSpace + '.zip');
		});
	}

	function downloadConfig() {
		const configJson = JSON.stringify(config, null, Intend);
		saveAs(new Blob([configJson], { type: 'application/json' }), config.base.nameSpace + fileExtension);
	}

	function addFilesToZip(tree: TreeNode, zip: JSZip) {
		if (tree.isDirectory) {
			const folder = zip.folder(tree.fileName);
			tree.children.forEach((child) => {
				addFilesToZip(child, folder);
			});
		} else {
			zip.file(tree.fileName, files[tree.fileId].content);
		}
	}
</script>

<div>
	<button on:click={downloadPlugin} class="button is-primary">Download Plugin As Zip</button>
	<button on:click={downloadConfig} class="button is-primary">Download Config</button>
</div>
<p>After you have extracted your plugin into the "Plugins" directory, make sure to execute the following command from within your terminal:</p>
<pre class="overflow-auto p-4">
	dotnet "sln" "add" "Plugins/{config.base.nameSpace}/{config.base.nameSpace}.csproj"
</pre>

<style>
	pre {
		background-color: var(--dark-grey);
	}
</style>
