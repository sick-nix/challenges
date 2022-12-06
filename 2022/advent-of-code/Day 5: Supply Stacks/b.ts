const input = await Deno.readTextFile("./input.txt")

const stacks: Array<Array<String>> = []
let finishedStacks = false
let i = 0
for (const line of input.split("\n")) {
  if (!finishedStacks) {
    i = 0
    const crates = line.match(/.{1,4}/g)?.map((item) => item.match(/[A-Z]/))!
    if (!crates) {
      finishedStacks = true
      continue
    }
    for (const crate of crates) {
      if (!stacks[i]) stacks[i] = []
      if (!crate) {
        i++
        continue
      }
      if (Array.isArray(crate)) stacks[i].unshift(crate.pop()!)
      i++
    }
  } else {
    const matches = [...line.match(/move (\d*) from (\d*) to (\d*)/)!].map(
      (item) => parseInt(item)
    )
    const [, howMany, from, to] = matches
    const removed = stacks[from - 1].splice(-howMany)
    stacks[to - 1].push(...removed)
  }
}

console.log(stacks)
