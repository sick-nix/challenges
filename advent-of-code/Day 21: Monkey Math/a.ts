const input = await Deno.readTextFile("./input.txt")

enum MONKEY_TYPE {
  OPERATION,
  NUMBER,
}

type Monkey =
  | {
      name: string
      type: MONKEY_TYPE.OPERATION
      operation?: {
        first: string
        operand: string
        second: string
      }
    }
  | {
      name: string
      type: MONKEY_TYPE.NUMBER
      number?: number
    }
  | null

const monkeys: Monkey[] = []
for (const line of input.split("\n")) {
  if (!line) continue
  const [name, rest] = line.split(": ")
  const num = parseInt(rest)
  let monkey: Monkey = null
  if (isNaN(num)) {
    const [first, operand, second] = rest.split(" ")
    monkey = {
      name,
      type: MONKEY_TYPE.OPERATION,
      operation: {
        first,
        operand,
        second,
      },
    }
  } else {
    monkey = {
      name,
      type: MONKEY_TYPE.NUMBER,
      number: num,
    }
  }
  if (monkey) monkeys.push(monkey)
}

const monkeyResults: { [key: string]: number } = {}
function getMonkeyResult(name: string): number {
  if (monkeyResults[name] !== undefined) return monkeyResults[name]

  const monkey = monkeys.find((m) => m?.name === name)!
  let num = 0

  switch (monkey.type) {
    case MONKEY_TYPE.NUMBER:
      num = monkey.number!
      break
    case MONKEY_TYPE.OPERATION: {
      const first = getMonkeyResult(monkey.operation?.first!)
      const second = getMonkeyResult(monkey.operation?.second!)
      switch (monkey.operation?.operand) {
        case "+":
          num = first + second
          break
        case "*":
          num = first * second
          break
        case "/":
          num = first / second
          break
        case "-":
          num = first - second
          break
      }
      break
    }
  }

  monkeyResults[name] = num
  return num
}

console.log(getMonkeyResult("root"))
