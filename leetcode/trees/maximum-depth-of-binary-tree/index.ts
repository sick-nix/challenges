const p = [1, 2, 3],
	q = [1, 2, 3]

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
console.log(isSameTree(root, root2))
console.timeEnd("test")

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
	if (p == null && q == null) return true
	if (p?.val != q?.val) return false
	if (!isSameTree(p?.left as TreeNode, q?.left as TreeNode)) return false
	if (!isSameTree(p?.right as TreeNode, q?.right as TreeNode)) return false
	return true
}
