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

	// const tree = {
	// 	label: 'USA',
	// 	children: [
	// 		{
	// 			label: 'Florida',
	// 			children: [
	// 				{ label: 'Jacksonville' },
	// 				{
	// 					label: 'Orlando',
	// 					children: [
	// 						{ label: 'Disney World' },
	// 						{ label: 'Universal Studio' },
	// 						{ label: 'Sea World' }
	// 					]
	// 				},
	// 				{ label: 'Miami' }
	// 			]
	// 		},
	// 		{
	// 			label: 'California',
	// 			children: [{ label: 'San Francisco' }, { label: 'Los Angeles' }, { label: 'Sacramento' }]
	// 		}
	// 	]
	// };
	let tree: TreeNode = {
		children: [],
		fileName: 'root',
		isDirectory: true
	};

	$: {
		myClass = new Class(nameSpace, pluginName);
		activeCode = myClass.toString();

		const files = FileGenerator.generate();
		// convert files to file tree
		// files.forEach((file) => {
		// 	addFileToTree(file, file);
		// });

		// orderTree(tree);
		// files.map(addnode);

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
				let node: any = {
					fileName: splitpath[i],
					isDirectory: true
				};
				if (i == splitpath.length - 1) {
					node.isDirectory = false;
					node.fileName = file.fullName;
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

	// function objectToArr(node) {
	// 	Object.keys(node || {}).map((k) => {
	// 		if (node[k].children) {
	// 			objectToArr(node[k]);
	// 		}
	// 	});
	// 	if (node.children) {
	// 		node.children = Object.values(node.children);
	// 		node.children.forEach(objectToArr);
	// 	}
	// }

	// function addnode(file) {
	// 	var ptr = tree;
	// 	for (var i = 0; i < file.path.length; i++) {
	// 		var node = { name: file.path[i], type: 'directory', size: 0 };
	// 		if (i == file.path.length - 1) {
	// 			node.fileName = file.fullName;
	// 		}
	// 		ptr[file.path[i]] = ptr[file.path[i]] || node;
	// 		ptr[file.path[i]].children = ptr[file.path[i]].children || {};
	// 		ptr = ptr[file.path[i]].children;
	// 	}
	// }

	// function orderTree(tree) {
	// 	tree.children.sort((a, b) => {
	// 		if (a.children === undefined && b.children === undefined) {
	// 			return a.label > b.label ? 1 : -1;
	// 		} else {
	// 			return a.label > b.label ? 1 : -1;
	// 		}
	// 	});

	// 	tree.children.forEach((child) => {
	// 		if (child.children) {
	// 			orderTree(child);
	// 		}
	// 	});
	// }

	// function addFileToTree(file: File, tree: any) {
	// 	let path = file.Path;
	// 	let current = tree;
	// 	path.forEach((p) => {
	// 		if (!current.children) {
	// 			current.children = [];
	// 		}
	// 		let found = current.children.find((c) => c.label === p);
	// 		if (!found) {
	// 			found = { label: p, children: [] };
	// 			current.children.push(found);
	// 		}
	// 		current = found;
	// 	});
	// 	// current.file = file;
	// 	current.children.push({ label: file.fullName });
	// }

	function downloadZip() {
		console.log(pluginName);
	}

	function openFile(fileName) {
		console.log(fileName);
		activeCode = fileName;
	}
</script>

<VersionSelector />

<InputField name="Plugin Name" bind:value={pluginName} />
<InputField name="NameSpace" bind:value={nameSpace} />

<div>
	<button on:click={downloadZip} class="button is-primary">Download</button>
</div>

<TreeView {tree} callback={openFile} />

<Monaco code={activeCode} />
