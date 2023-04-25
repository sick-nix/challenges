const nodes = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
	p = 2,
	q = 8

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
console.log(lowestCommonAncestor(root, new TreeNode(p), new TreeNode(q)))
console.timeEnd("test")

function lowestCommonAncestor(
	root: TreeNode | null,
	p: TreeNode | null,
	q: TreeNode | null
): TreeNode | null {
	if (root === null) return null
	if (q == null || p == null) return null

	// If both n1 and n2 are smaller than root,
	// then LCA lies in left
	if (root.val > p.val && root.val > q.val)
		return lowestCommonAncestor(root.left, p, q)

	// If both n1 and n2 are greater than root,
	// then LCA lies in right
	if (root.val < p.val && root.val < q.val)
		return lowestCommonAncestor(root.right, p, q)
	return root
}
