export interface TreeNode {
	isDirectory: boolean;
	children: TreeNode[];
	fileName: string;
	fileId: number;
}
export type fileToTreeNodeType = (files: File[]) => TreeNode[];
