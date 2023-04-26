const preorder = [3, 9, 20, 15, 7],
	inorder = [9, 3, 15, 20, 7]

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

console.time("test")
console.log(buildTree(preorder, inorder))
console.timeEnd("test")

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
	if (inorder.length !== preorder.length) return null // Invalid case.
	if (preorder.length === 0) return null

	const root = new TreeNode(preorder[0]) // In a preorder traversal, the root is the 1st element.

	const inorderRootIndex = inorder.indexOf(root.val) // Locate the root in the inorder traversal.
	const leftInorder: number[] = inorder.slice(0, inorderRootIndex) // The left tree is composed of everything before the root.
	const rightInorder: number[] = inorder.slice(inorderRootIndex + 1) // The right tree is composed of everything after the root.

	// Obtain the preorder traversals of left and right.
	const leftLen = leftInorder.length
	const leftPreorder: number[] = []
	const rightPreorder: number[] = []

	for (let i = 1; i < preorder.length; i++) {
		if (i - 1 < leftLen) {
			leftPreorder.push(preorder[i])
		} else {
			rightPreorder.push(preorder[i])
		}
	}

	// Finally build left and right.
	root.left = buildTree(leftPreorder, leftInorder)
	root.right = buildTree(rightPreorder, rightInorder)

	return root
}
