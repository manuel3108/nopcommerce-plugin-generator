import type { File } from './File';

export interface TreeNode {
	isDirectory: boolean;
	isRoot: boolean;
	children: TreeNode[];
	fileName: string;
	fileId: number;
}

export function orderTree(tree: TreeNode): TreeNode {
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

export function filesToTreeNodes(files: File[]): TreeNode[] {
	const localTree: TreeNode[] = [];
	function addnode(file: File) {
		const temp = [...file.Path, file.fullName];
		const splitpath = temp;
		let ptr: TreeNode[] = localTree;
		for (let i = 0; i < splitpath.length; i++) {
			const node: TreeNode = {
				fileName: splitpath[i],
				isDirectory: true,
				children: [],
				fileId: -1,
				isRoot: false
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
