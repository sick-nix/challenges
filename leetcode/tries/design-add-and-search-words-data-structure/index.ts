class WordDictionary {
	private words: Set<string>

	constructor() {
		this.words = new Set()
	}

	addWord(word: string): void {
		this.words.add(word)
	}

	search(word: string): boolean {
		if (word.includes(".")) {
			for (const w of this.words) {
				if (w.length === word.length) {
					let matches = true

					for (let i = 0; i < word.length; i++) {
						if (word[i] !== "." && word[i] !== w[i]) {
							matches = false
							break
						}
					}

					if (matches) return true
				}
			}

			return false
		}
		return this.words.has(word)
	}
}
