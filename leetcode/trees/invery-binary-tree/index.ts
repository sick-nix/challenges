const nodes = [4, 2, 7, 1, 3, 6, 9]

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

const root: TreeNode | null = createTree(1)

function createTree(index: number): TreeNode | null {
	if (nodes[index - 1] === undefined) return null
	return new TreeNode(
		nodes[index - 1],
		createTree(2 * index),
		createTree(2 * index + 1)
	)
}

console.time("test")
console.log(invertTree(root))
console.timeEnd("test")

function invertTree(root: TreeNode | null): TreeNode | null {
	if (root === null) return null

	const [left, right] = [root.left, root.right]
	root.left = invertTree(right)
	root.right = invertTree(left)

	return root
}
