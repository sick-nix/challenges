const list = [1, 2, 3, 4, 5]
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
reorderList(head)
console.log(head)
console.log(toArray(head))
console.timeEnd("test")

function reorderList(head: ListNode | null): void {
	const arr: ListNode[] = []
	let cur = head

	while (cur) {
		arr.push(cur)
		cur = cur.next
	}

	for (let i = 0; i < arr.length; i += 2) {
		console.log(arr)
		const idx = arr.length - 1
		arr.splice(i + 1, 0, arr[idx])
		arr.splice(idx + 1, 1)
	}

	for (let i = 0; i < arr.length - 1; i++) {
		arr[i].next = arr[i + 1]
	}
	arr[arr.length - 1].next = null
}
