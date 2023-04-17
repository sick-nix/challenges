const nums = [4, 5, 6, 7, 0, 1, 2]
const target = 0

console.time("test")
console.log(search(nums, target))
console.timeEnd("test")

function search(nums: number[], target: number): number {
	if (target < nums[0]) {
		// start loop from end
		for (let i = nums.length - 1; i >= 0; i--) {
			if (nums[i] === target) return i
		}
	} else {
		// start loop from start
		for (let i = 0; i < nums.length; i++) {
			if (nums[i] === target) return i
		}
	}
	return -1
}
