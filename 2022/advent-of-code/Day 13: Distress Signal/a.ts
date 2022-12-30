const input = (await Deno.readTextFile("./input.txt")).split(/\n\s*\n/)

function toArray(item: Array<number> | number) {
  if (Array.isArray(item)) return item
  return [item]
}

function compare(
  first: Array<number> | number,
  second: Array<number> | number
): boolean | undefined {
  if (Array.isArray(first) && Array.isArray(second)) {
    for (let i = 0; i < first.length && i < second.length; i++) {
      const c = compare(first[i], second[i])
      if (c !== undefined) return c
    }
    if (first.length > second.length) return false
    if (first.length < second.length) return true
    return undefined
  } else if (!Array.isArray(first) && !Array.isArray(second)) {
    if (first > second) return false
    if (first < second) return true
    return undefined
  } else {
    return compare(toArray(first), toArray(second))
  }
}

let index = 0
let validCouples = 0

for (const pair of input) {
  index++
  const [first, second] = pair.split("\n").map((item) => JSON.parse(item))
  if (compare(first, second)) validCouples += index
}

console.log(validCouples)
