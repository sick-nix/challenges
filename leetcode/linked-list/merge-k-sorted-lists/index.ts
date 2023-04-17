const lists = [
	[1, 4, 5],
	[1, 3, 4],
	[2, 6],
]

class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val
		this.next = next === undefined ? null : next
	}
}

const heads: Array<ListNode> = []

for (const list of lists) {
	const head = new ListNode(list[0])
	let prev = head
	for (let i = 1; i < list.length; i++) {
		const el = new ListNode(list[i])
		prev.next = el
		prev = el
	}
}

function toArray(head: ListNode | null) {
	if (!head) return []
	const arr: number[] = []
	let cur: ListNode | null = head
	while (cur) {
		arr.push(cur.val)
		console.log(cur.val)
		cur 	= cur.next
	}
	return arr
}

console.time("test")
console.log(mergeKLists(heads))
console.timeEnd("test")

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
	if (!lists.length) return null
	if (lists.length === 1) return lists[0]

	const values: number[] = []
	for (let i = 0; i < lists.length; i++) {
		let cur = lists[i]
		while (cur) {
			values.push(cur.val)
			cur = cur.next
		}
	}
	if (!values.length) return null
	const sortedValues = values.sort((a, b) => a - b)
	const head = new ListNode(sortedValues[0])
	let cur = head
	for (let i = 1; i < values.length; i++) {
		const node = new ListNode(values[i])
		cur.next = node
		cur = cur.next
	}
	return head
}
