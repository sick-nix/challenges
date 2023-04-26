const nodes = [5, 4, 6, null, null, 3, 7]

class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val
		this.left = left === undefined ? null : left
		this.right = right === undefined ? null : right
	}
}

const root: TreeNode | null = createTree(nodes, 1)

function createTree(
	nodes: Array<number | null>,
	index: number
): TreeNode | null {
	if (!nodes[index - 1]) return null
	return new TreeNode(
		nodes[index - 1] as number,
		createTree(nodes, 2 * index),
		createTree(nodes, 2 * index + 1)
	)
}

console.time("test")
console.log(root)
console.log(isValidBST(root))
console.timeEnd("test")

function traverse(node: TreeNode | null, min: number, max: number): boolean {
	if (!node) return true
	if (node.val <= min || node.val >= max) return false
	return (
		traverse(node.left, min, node.val) &&
		traverse(node.right, node.val, max)
	)
}

function isValidBST(root: TreeNode | null): boolean {
	return traverse(root, -Infinity, +Infinity)
}
