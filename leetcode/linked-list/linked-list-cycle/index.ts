const list = [3, 2, 0, -4],
	pos = 1

class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val
		this.next = next === undefined ? null : next
	}
}

const head = new ListNode(list[0])

let prev = head
let nodes = [head]
for (let i = 1; i < list.length; i++) {
	const el = new ListNode(list[i])
	nodes.push(el)
	prev.next = el
	prev = el

	if (i == list.length - 1 && pos >= 0) el.next = nodes[pos]
}

function toArray(head: ListNode | null) {
	if (!head) return []
	const arr: number[] = []
	let cur: ListNode | null = head
	while (cur) {
		arr.push(cur.val)
		console.log(cur.val)
		cur = cur.next
	}
	return arr
}

console.time("test")
console.log(hasCycle(head))
console.timeEnd("test")

function hasCycle(head: ListNode | null): boolean {
	if (!head) return false
	const visited = new WeakMap<ListNode, boolean>()
	let cur: ListNode | null = head
	while (cur) {
		if (visited.has(cur)) return true
		visited.set(cur, true)
		cur = cur.next
	}

	return false
}
