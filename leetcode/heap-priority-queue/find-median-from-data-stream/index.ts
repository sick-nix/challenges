class MedianFinder {
	private numbers: number[]
	constructor() {
		this.numbers = []
	}

	addNum(num: number): void {
		const idx = this.numbers.findIndex((n) => n < num)
		if (idx == -1) this.numbers.push(num)
		else this.numbers.splice(idx, 0, num)
	}

	findMedian(): number {
		const idx = Math.floor(this.numbers.length / 2)
		if (this.numbers.length % 2 == 0) {
			return Number(
				((this.numbers[idx - 1] + this.numbers[idx]) / 2).toFixed(5)
			)
		}
		return this.numbers[idx]
	}
}

const obj = new MedianFinder()
obj.addNum(6)
console.log(obj.findMedian())
obj.addNum(10)
console.log(obj.findMedian())
obj.addNum(2)
console.log(obj.findMedian())
obj.addNum(6)
console.log(obj.findMedian())
obj.addNum(5)
console.log(obj.findMedian())
obj.addNum(0)
console.log(obj.findMedian())
obj.addNum(6)
console.log(obj.findMedian())
obj.addNum(3)
console.log(obj.findMedian())
obj.addNum(1)
console.log(obj.findMedian())
obj.addNum(0)
console.log(obj.findMedian())
obj.addNum(0)
console.log(obj.findMedian())
