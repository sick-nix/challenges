const nodes = [1, 2, 3, null, null, 4, 5, 6, 7]

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

const root: TreeNode | null = createTree(nodes)

console.time("test")
console.log(deserialize(serialize(root)))
console.timeEnd("test")

function createTree(nodes: Array<number | null>) {
	let res: TreeNode | null = null
	const len = nodes.length
	if (len > 0) {
		const treeArray: Array<TreeNode | null> = []
		for (let i = 0; i < len; i++) {
			if (nodes[i] != null) {
				treeArray[i] = new TreeNode(nodes[i] as number)
			}
		}
		let preNull = 0
		for (let i = 0; i < len; i++) {
			if (treeArray[i] == null) {
				preNull++
			} else {
				const leftChilIndex = 2 * i + 1 - preNull * 2
				if (leftChilIndex >= len) break
				treeArray[i]!.left = treeArray[leftChilIndex]
				const rightChildIndex = 2 * i + 2 - preNull * 2
				if (rightChildIndex >= len) break
				treeArray[i]!.right = treeArray[rightChildIndex]
			}
		}
		res = treeArray[0]
	}
	return res
}

function toArray(root: TreeNode | null): Array<number | null> {
	if (!root) return []

	return [
		root.left ? root.left.val : null,
		root.right ? root.right.val : null,
		...toArray(root.left),
		...toArray(root.right),
	]
}

function serialize(root: TreeNode | null): string {
	const nodes: Array<number | null> = root
		? [root?.val, ...toArray(root)]
		: []

	const i = nodes.length - 1
	while (i >= 0) {
		const removed = nodes.pop()
		if (removed != null) {
			nodes.push(removed)
			break
		}
	}
	return JSON.stringify(nodes)
}

function deserialize(data: string): TreeNode | null {
	return createTree(JSON.parse(data))
}
