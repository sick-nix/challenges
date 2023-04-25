const p = [3, 4, 5, 1, 2, null, null, null, null, 0],
	q = [4, 1, 2]

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

const root: TreeNode | null = createTree(p, 1)
const root2: TreeNode | null = createTree(q, 1)

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
console.log(isSubtree(root, root2))
console.timeEnd("test")

function hasSubTree(node1: TreeNode | null, node2: TreeNode | null): boolean {
	if (node1 === null && node2 === null) return true
	if (node1 === null || node2 === null) return false

	return (
		node1.val === node2.val &&
		hasSubTree(node1.left, node2.left) &&
		hasSubTree(node1.right, node2.right)
	)
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
	if (root === null) return false
	if (hasSubTree(root, subRoot)) return true
	return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
}
