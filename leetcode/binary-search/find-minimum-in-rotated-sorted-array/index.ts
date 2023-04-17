const nums = [4, 5, 6, 7, 8, 9, 1, 2, 3]

console.time("test")
console.log(findMin(nums))
console.timeEnd("test")

function findMin(nums: number[]): number {
	if (nums.length === 1 || nums[0] < nums[nums.length - 1]) return nums[0]
	const max = Math.max(...nums)
	const maxIdx = nums.findIndex((n) => n === max)
	let previous: number
	if (maxIdx > nums.length / 2) {
		// start loop from end
		previous = nums[nums.length - 1]
		for (let i = nums.length - 2; i >= 0; i--) {
			const current = nums[i]
			if (current > previous) {
				break
			} else if (current < previous) {
				previous = current
			}
		}
	} else {
		// start loop from start
		previous = nums[0]
		for (let i = 1; i < nums.length; i++) {
			const current = nums[i]
			if (current > previous) {
				previous = current
			} else if (current < previous) {
				previous = current
				break
			}
		}
	}
	return previous
}
