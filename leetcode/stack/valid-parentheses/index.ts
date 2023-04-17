const s = "(]{}"

console.time("test")
console.log(isValid(s))
console.timeEnd("test")

function isValid(s: string): boolean {
    if(s.length === 1) return false
	const list: Array<string> = []
	for (let i = 0; i < s.length; i++) {
		switch (s[i]) {
			case ")":
				if (list[list.length - 1] !== "(") return false
				else list.pop()
				continue
			case "]":
				if (list[list.length - 1] !== "[") return false
				else list.pop()
				continue
			case "}":
				if (list[list.length - 1] !== "{") return false
				else list.pop()
				continue
		}
		list.push(s[i])
	}

	return list.length === 0
}
