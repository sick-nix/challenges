const nodes = [3, 9, 20, null, null, 15, 7]

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
console.log(levelOrder(root))
console.timeEnd("test")

function traverseTree(node: TreeNode | null, result: number[][], level = 0) {
	if (!node) return
	if (!result[level]) result[level] = []
	result[level].push(node.val)
	traverseTree(node.left, result, level + 1)
	traverseTree(node.right, result, level + 1)
}

function levelOrder(root: TreeNode | null): number[][] {
	const result: number[][] = []
	traverseTree(root, result)
	return result
}
