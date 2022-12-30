type Node = Array<number> | number

const firstSeparator = [[2]]
const secondSeparator = [[6]]

const input = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .filter((item) => item !== "")
  .map((item) => JSON.parse(item))
  .concat([firstSeparator], [secondSeparator])
  .sort((a, b) => {
    const flag = compare(a as unknown as Node, b as unknown as Node)
    if (flag === undefined) return 0
    return flag ? -1 : 1
  })

function toArray(item: Node) {
  if (Array.isArray(item)) return item
  return [item]
}

function compare(first: Node, second: Node): boolean | undefined {
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

const firstSeparatorPosition =
  input.findIndex((item) => {
    return JSON.stringify(item) === JSON.stringify(firstSeparator)
  }) + 1
const secondSeparatorPosition =
  input.findIndex((item) => {
    return JSON.stringify(item) === JSON.stringify(secondSeparator)
  }) + 1

console.log(firstSeparatorPosition * secondSeparatorPosition)
