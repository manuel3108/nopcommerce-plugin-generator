<script lang="ts">
	import VersionSelector from '$lib/components/VersionSelector.svelte';
	import InputField from '$lib/components/common/InputField.svelte';
	import Monaco from '$lib/components/Monaco.svelte';
	import TreeView from '$lib/components/TreeView.svelte';
	import { FileGenerator } from '$lib/scripts/generators/FileGenerator';
	import type { File } from '$lib/scripts/common/File';
	import { TreeNode, filesToTreeNodes, orderTree } from '$lib/scripts/common/FileTree';
	import { Version } from '$lib/scripts/common/Version';
	import PluginConfig from '$lib/scripts/configs/PluginConfig';
	import Box from '$lib/components/common/Box.svelte';
	import { PluginGroup } from '$lib/scripts/common/PluginGroup';
	import PluginGroupSelector from '$lib/components/PluginGroupSelector.svelte';
	import JSZip from 'jszip';
	import saveAs from 'file-saver';
	import { Intend } from '$lib/scripts/csharp-lib/common/Defaults';
	import PluginImageUpload from '$lib/components/PluginImageUpload.svelte';
	import { onMount } from 'svelte';
	import CheckboxField from '$lib/components/common/CheckboxField.svelte';
	import SettingProperties from '$lib/components/SettingProperties.svelte';

	let config = new PluginConfig();
	config.base.pluginName = 'FancyPdf';
	config.base.nameSpace = 'Innovapps.Nop.Plugin.Misc.FancyPdf';
	config.base.nopCommerceVersion = Version.v4_40_x;
	config.details.author = 'Innovapps';
	config.details.description = 'FancyPdf description';
	config.details.group = PluginGroup.Misc;
	config.settings.enabled = false;
	let friendlyName: string;
	let pluginVersion: string;
	let systemName: string;

	let pluginVersionDefault = '1.0.0';

	let activeCode = '';
	let lastFileId = 0;
	let pluginImageUrl = '';
	let isMounted = false;

	let fileTree: TreeNode = {
		children: [],
		fileName: 'root',
		isDirectory: true,
		fileId: -1,
		isRoot: true
	};
	let files: File[] = [];

	onMount(() => {
		isMounted = true;
	});

	$: {
		if (isMounted) {
			config.details.friendlyName = friendlyName || config.base.pluginName;
			config.details.version = pluginVersion || pluginVersionDefault;
			config.details.systemName = systemName || config.details.group + '.' + config.base.pluginName;
			config.details.pluginImage = pluginImageUrl;

			generateFiles();
		}
	}

	async function generateFiles() {
		files = await FileGenerator.generate(config);

		const childNodes = filesToTreeNodes(files);

		fileTree.children = childNodes;
		fileTree.fileName = config.base.nameSpace;

		fileTree = orderTree(fileTree);

		openFile(lastFileId);
	}

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

	function openFile(fileId) {
		lastFileId = fileId;
		activeCode = files[fileId].content;
	}

	function downloadConfig() {
		const configJson = JSON.stringify(config, null, Intend);
		saveAs(new Blob([configJson], { type: 'application/json' }), 'config.json');
	}
</script>

<h1 class="title">NopCommerce Plugin Generator</h1>
<h2 class="subtitle">some description about the goal of this project</h2>

<Box title="Base config">
	<VersionSelector bind:version={config.base.nopCommerceVersion} />
	<PluginGroupSelector bind:group={config.details.group} />
	<InputField name="Plugin Name" bind:value={config.base.pluginName} />
	<InputField name="NameSpace" bind:value={config.base.nameSpace} />
</Box>

<Box title="Details">
	<InputField name="Author" bind:value={config.details.author} />
	<InputField name="Description" bind:value={config.details.description} />
	<InputField name="Friendly name" bind:value={friendlyName} placeholder={config.base.pluginName} />
	<InputField name="Version" bind:value={pluginVersion} placeholder={pluginVersionDefault} />
	<InputField name="System name" bind:value={systemName} placeholder={config.details.group + '.' + config.base.pluginName} />
	<PluginImageUpload bind:url={pluginImageUrl} />
</Box>

<Box title="Settings">
	<CheckboxField name="Generate Settings" bind:value={config.settings.enabled} />
	{#if config.settings.enabled}
		<SettingProperties bind:properties={config.settings.properties} />
	{/if}
</Box>

<hr />

<Box title="Preview (binary files not shown)">
	<div class="split-view">
		<div class="files">
			<TreeView bind:tree={fileTree} callback={openFile} />
		</div>

		<div class="editor">
			<Monaco code={activeCode} />
		</div>
	</div>
</Box>

<hr />

<Box title="Downloads">
	<div>
		<button on:click={downloadPlugin} class="button is-primary">Download Plugin As Zip</button>
		<button on:click={downloadConfig} class="button is-primary">Download Config</button>
	</div>
	<p>After you have extracted your plugin into the "Plugins" directory, make sure to execute the following command from within your terminal:</p>
	<pre>
		dotnet add project Plugins/{config.base.nameSpace}/{config.base.nameSpace}.csproj
	</pre>
</Box>

<style>
	.split-view {
		display: flex;
	}

	.split-view div {
		display: block;
	}

	.files {
		width: 20%;
		overflow: auto;
	}

	.editor {
		width: 80%;
	}
</style>
