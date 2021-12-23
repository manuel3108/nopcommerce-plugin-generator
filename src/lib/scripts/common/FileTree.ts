export interface TreeNode {
	isDirectory: boolean;
	children: TreeNode[];
	fileName: string;
}
export type fileToTreeNodeType = (files: File[]) => TreeNode[];
