const input = await Deno.readTextFile("./input.txt")

let total = 0

function getPriority(char: string): number {
  if (/[a-z]/.test(char)) return char.charCodeAt(0) - 96
  else if (/[A-Z]/.test(char)) return char.charCodeAt(0) - 38
  return 0
}

let cnt = 0
let found: string | null = null
let obj: { [key: string]: number } = {}
for (const contents of input.split("\n")) {
  if (!contents) continue
  if (cnt === 3) {
    cnt = 0
    obj = {}
    // break
  }

  for (const char of contents.split("")) {
    if (cnt === 0) {
      obj[char] = 0
    } else if (cnt === 1) {
      if (obj[char] === 0) obj[char] = 1
    } else if (cnt === 2) {
      if (obj[char] === 1) {
        found = char
        break
      }
    }
  }
  if (found) {
    total += getPriority(found)
    found = null
  }

  cnt++
}

console.log(total)
