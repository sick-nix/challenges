const list = [1, 2, 3, 4, 5]
const n = 2

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
for (let i = 1; i < list.length; i++) {
	const el = new ListNode(list[i])
	prev.next = el
	prev = el
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
removeNthFromEnd(head, n)
console.log(toArray(head))
console.timeEnd("test")

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
	const arr: ListNode[] = []
	let cur = head

	while (cur) {
		arr.push(cur)
		cur = cur.next
	}

	arr.splice(-n, 1)
	console.log(arr, n, arr.length, arr[arr.length - n])
	if (arr[arr.length - n])
		arr[arr.length - n].next = arr[arr.length - n + 1] || null

	return arr.length > 0 ? arr[0] : null
}
