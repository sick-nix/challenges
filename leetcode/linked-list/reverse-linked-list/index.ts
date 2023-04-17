const arr = [1, 2, 3, 4, 5]

class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val
		this.next = next === undefined ? null : next
	}
}

const head = new ListNode(arr[0])
let prev = head

for (let i = 1; i < arr.length; i++) {
	const el = new ListNode(arr[i])
	prev.next = el
	prev = el
}

console.time("test")
console.log(reverseList(head))
console.timeEnd("test")

function reverseList(head: ListNode | null): ListNode | null {
	if (head === null) return null
	let prev: ListNode | null = null
	let oldPrev: ListNode | null = head
	while (oldPrev !== null) {
		const el = new ListNode(oldPrev?.val)
		if (prev) el.next = prev
		prev = el
		oldPrev = oldPrev.next
	}

	return prev
}
