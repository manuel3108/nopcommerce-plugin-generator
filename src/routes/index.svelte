<script lang="ts">
	import VersionSelector from '$lib/components/VersionSelector.svelte';
	import InputField from '$lib/components/common/InputField.svelte';
	import Class from '$lib/csharp/base/Class';
	import Monaco from '$lib/components/Monaco.svelte';
	import TreeView from '$lib/components/TreeView.svelte';
	import { FileGenerator } from '$lib/scripts/FileGenerator';
	import type { File } from '$lib/scripts/common/File';
	import type { TreeNode } from '$lib/scripts/common/FileTree';

	let pluginName = 'FancyPdf';
	let nameSpace = 'Innovapps.Nop.Pluing.Misc.FancyPdf';
	let myClass;
	let activeCode = '';

	let tree: TreeNode = {
		children: [],
		fileName: 'root',
		isDirectory: true,
		fileId: -1
	};
	let files: File[] = [];

	$: {
		myClass = new Class(nameSpace, pluginName);
		activeCode = myClass.toString();

		files = FileGenerator.generate();
		const temp = filesToTreeNodes(files);
		tree.children = temp;
		tree = orderTree(tree);
		// console.log(objectToArr(tree));
	}

	function orderTree(tree: TreeNode): TreeNode {
		const { children } = tree;

		const directorys = children.filter((child) => child.isDirectory);
		const files = children.filter((child) => !child.isDirectory);

		directorys.sort((a, b) => a.fileName.localeCompare(b.fileName));
		files.sort((a, b) => a.fileName.localeCompare(b.fileName));

		const orderedChildren = [...directorys, ...files];

		tree.children = orderedChildren;

		tree.children.forEach((child) => {
			orderTree(child);
		});

		return tree;
	}

	function filesToTreeNodes(files: File[]): TreeNode[] {
		var localTree: TreeNode[] = [];
		function addnode(file: File) {
			var temp = [...file.Path, file.fullName];
			var splitpath = temp;
			var ptr: TreeNode[] = localTree;
			for (let i = 0; i < splitpath.length; i++) {
				let node: TreeNode = {
					fileName: splitpath[i],
					isDirectory: true,
					children: [],
					fileId: -1
				};
				if (i == splitpath.length - 1) {
					node.isDirectory = false;
					node.fileName = file.fullName;
					node.fileId = file.id;
				}
				ptr[splitpath[i]] = ptr[splitpath[i]] || node;
				ptr[splitpath[i]].children = ptr[splitpath[i]].children || {};
				ptr = ptr[splitpath[i]].children;
			}
		}
		function objectToArr(node) {
			Object.keys(node || {}).map((k) => {
				if (node[k].children) {
					objectToArr(node[k]);
				}
			});
			if (node.children) {
				node.children = Object.values(node.children);
				node.children.forEach(objectToArr);
			}
		}
		files.map(addnode);
		objectToArr(localTree);
		return Object.values(localTree);
	}

	function downloadZip() {
		console.log(pluginName);
	}

	function openFile(fileId) {
		activeCode = files[fileId].content;
	}
</script>

<VersionSelector />

<InputField name="Plugin Name" bind:value={pluginName} />
<InputField name="NameSpace" bind:value={nameSpace} />

<div>
	<button on:click={downloadZip} class="button is-primary">Download</button>
</div>

<div class="split-view">
	<div class="files">
		<TreeView {tree} callback={openFile} />
	</div>

	<div class="editor">
		<Monaco code={activeCode} />
	</div>
</div>

<style>
	.split-view {
		display: flex;
	}

	.split-view div {
		display: block;
	}

	.files {
		width: 20%;
	}

	.editor {
		width: 80%;
	}
</style>
