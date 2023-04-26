const nodes = [
		41,
		37,
		44,
		24,
		39,
		42,
		48,
		1,
		35,
		38,
		40,
		null,
		43,
		46,
		49,
		0,
		2,
		30,
		36,
		null,
		null,
		null,
		null,
		null,
		null,
		45,
		47,
		null,
		null,
		null,
		null,
		null,
		4,
		29,
		32,
		null,
		null,
		null,
		null,
		null,
		null,
		3,
		9,
		26,
		null,
		31,
		34,
		null,
		null,
		7,
		11,
		25,
		27,
		null,
		null,
		33,
		null,
		6,
		8,
		10,
		16,
		null,
		null,
		null,
		28,
		null,
		null,
		5,
		null,
		null,
		null,
		null,
		null,
		15,
		19,
		null,
		null,
		null,
		null,
		12,
		null,
		18,
		20,
		null,
		13,
		17,
		null,
		null,
		22,
		null,
		14,
		null,
		null,
		21,
		23,
	],
	k = 25
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
console.log(kthSmallest(root, k))
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

function kthSmallest(root: TreeNode | null, k: number): number {
	const list = levelOrder(root).flat(1)
	list.sort((a, b) => a - b)
	return list[k - 1]
}
