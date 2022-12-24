const input = await Deno.readTextFile("./input.txt")

interface Monkey {
  items: number[]
  operation: [string, string, string]
  test: number
  ifTrue: number
  ifFalse: number
}
const monkeys: Monkey[] = []
for (const line of input.split(/Monkey \d:\n/)) {
  if (!line) continue
  let startingItems: number[] = []
  let match = line.match(/Starting items: (.*)/)
  if (match) startingItems = match[1].split(", ").map((item) => parseInt(item))

  let operationParts: [string, string, string] = ["", "", ""]
  match = line.match(/Operation: new = (.*) ([*+]) (.*)/)
  operationParts = match?.slice(1) as [string, string, string]

  let divisibleBy = 0
  match = line.match(/Test: divisible by (\d+)/)
  if (match && match[1]) divisibleBy = parseInt(match[1])

  let trueMonkey = -1
  match = line.match(/If true: throw to monkey (\d+)/)
  if (match && match[1]) trueMonkey = parseInt(match[1])

  let falseMonkey = -1
  match = line.match(/If false: throw to monkey (\d+)/)
  if (match && match[1]) falseMonkey = parseInt(match[1])

  monkeys.push({
    items: startingItems,
    operation: operationParts,
    test: divisibleBy,
    ifTrue: trueMonkey,
    ifFalse: falseMonkey,
  })
}

function calculateWorry(monkey: Monkey, item: number) {
  let worry = item
  let secondOperand = parseInt(monkey.operation[2])
  if (isNaN(secondOperand)) secondOperand = item
  switch (monkey.operation[1]) {
    case "*":
      worry *= secondOperand
      break
    case "+":
      worry += secondOperand
      break
  }

  return worry
}

const inspectionCounters: number[] = []
for (let round = 1; round <= 20; round++) {
  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i]
    const items = [...monkey.items]
    if (!items.length) continue
    for (const item of items) {
      const worry = Math.floor(calculateWorry(monkey, item) / 3)
      const test = worry % monkey.test === 0
      let newMonkey: Monkey | undefined = undefined
      if (test) {
        newMonkey = monkeys[monkey.ifTrue]
      } else {
        newMonkey = monkeys[monkey.ifFalse]
      }
      newMonkey.items.push(worry)
      if (!inspectionCounters[i]) inspectionCounters[i] = 0
      inspectionCounters[i]++
      monkey.items.splice(0, 1)
    }
  }
}

const sorted = inspectionCounters.sort((a, b) => b - a)
const result = sorted[0] * sorted[1]
console.log(result)
