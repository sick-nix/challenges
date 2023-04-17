const list1 = [1, 2, 4],
	list2 = [1, 3, 4]

class ListNode {
	val: number
	next: ListNode | null
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val
		this.next = next === undefined ? null : next
	}
}

const head1 = new ListNode(list1[0])
const head2 = new ListNode(list2[0])

let prev = head1
for (let i = 1; i < list1.length; i++) {
	const el = new ListNode(list1[i])
	prev.next = el
	prev = el
}

prev = head2
for (let i = 1; i < list2.length; i++) {
	const el = new ListNode(list2[i])
	prev.next = el
	prev = el
}

function toArray(head: ListNode | null) {
	if (!head) return []
	const arr: number[] = []
	let cur: ListNode | null = head
	while (cur) {
		arr.push(cur.val)
		cur = cur.next
	}
	return arr
}

console.time("test")
console.log(toArray(mergeTwoLists(head1, head2)))
console.timeEnd("test")

function mergeTwoLists(
	list1: ListNode | null,
	list2: ListNode | null
): ListNode | null {
	if (!list1) return list2
	if (!list2) return list1

	// do the thang
	let val = 0
	let cur: ListNode | null = null
	let newHead: ListNode | null = null
	let node1: ListNode | null = list1,
		node2: ListNode | null = list2

	while (node1 || node2) {
		if (node1) {
			if (node2) {
				if (node1.val > node2.val) {
					val = node2.val
					node2 = node2.next
				} else {
					val = node1.val
					node1 = node1.next
				}
			} else {
				val = node1.val
				node1 = node1.next
			}
		} else {
			if (node2) {
				val = node2.val
				node2 = node2.next
			}
		}

		if (cur) {
			cur.next = new ListNode(val)
			cur = cur.next
		} else {
			newHead = new ListNode(val)
			cur = newHead
		}
	}

	return newHead
}
