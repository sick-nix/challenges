class Trie {
	words: string[]
	constructor() {
		this.words = []
	}

	insert(word: string): void {
		this.words.push(word)
	}

	search(word: string): boolean {
		for (const w of this.words) {
			if (w === word) return true
		}
		return false
	}

	startsWith(prefix: string): boolean {
		for (const w of this.words) {
			if (w.startsWith(prefix)) return true
		}
		return false
	}
}

// console.time("test")
// console.log(levelOrder(root))
// console.timeEnd("test")
