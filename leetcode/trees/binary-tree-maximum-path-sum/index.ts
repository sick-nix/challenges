const nodes = [0]

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
	if (nodes[index - 1] === undefined) return null
	return new TreeNode(
		nodes[index - 1] as number,
		createTree(nodes, 2 * index),
		createTree(nodes, 2 * index + 1)
	)
}

console.time("test")
console.log(maxPathSum(root))
console.timeEnd("test")

function maxPathSum(root: TreeNode | null): number {
	let max = -Infinity
	function findMax(root: TreeNode | null): number {
		if (root == null) return 0
		const left = findMax(root.left)
		const right = findMax(root.right)

		const maxSingle = Math.max(Math.max(left, right) + root.val, root.val)
		const maxTop = Math.max(maxSingle, left + right + root.val)
		max = Math.max(max, maxTop)
		console.log(maxTop)

		return maxSingle
	}

	findMax(root)
	return max
}
