const adjList = [
	[2, 4],
	[1, 3],
	[2, 4],
	[1, 3],
]

class Node {
	val: number
	neighbors: Node[]
	constructor(val?: number, neighbors?: Node[]) {
		this.val = val === undefined ? 0 : val
		this.neighbors = neighbors === undefined ? [] : neighbors
	}
}

const nodes: Node[] = []
function getNode(idx: number) {
	return nodes[idx] || new Node()
}

function createGraph(adjList: Array<number[]>) {
	for (let i = 0; i < adjList.length; i++) {
		const node = getNode(i)
		node.val = i + 1
		for (const n of adjList[i]) {
			const neighbor = getNode(n - 1)
			neighbor.val = n
			node.neighbors.push(neighbor)
		}
	}

	return nodes[0]
}

const node = createGraph(adjList)

console.log(cloneGraph(node))

function cloneGraph(node: Node | null): Node | null {
	if (!node) return null

	const cloned = new Map<Node, Node>().set(node, new Node(node.val))
	const queue: Node[] = [node]

	while (queue.length) {
		const currentNode = queue.shift()!
		currentNode.neighbors.forEach((n) => {
			if (!cloned.has(n)) {
				cloned.set(n, new Node(n.val))
				queue.push(n)
			}
			cloned.get(currentNode)!.neighbors.push(cloned.get(n)!)
		})
	}

	return cloned.get(node)!
}
