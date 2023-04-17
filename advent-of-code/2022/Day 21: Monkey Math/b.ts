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
  let monkey: Monkey | null = null
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

const root = monkeys.find((m) => m?.name === "root")
if (root?.type === MONKEY_TYPE.OPERATION) {
  const firstName = root.operation?.first!
  const secondName = root.operation?.second!

  let anotherMonkey: Monkey = monkeys.find((m) => m?.name === "humn")!
  const names: Array<string> = [anotherMonkey.name]
  while (
    anotherMonkey?.name !== firstName &&
    anotherMonkey?.name !== secondName
  ) {
    const found = monkeys.find(
      (m) =>
        m?.type === MONKEY_TYPE.OPERATION &&
        (m.operation?.first === anotherMonkey?.name ||
          m.operation?.second === anotherMonkey?.name)
    )
    if (!found) break
    anotherMonkey = found
    names.unshift(anotherMonkey.name)
  }

  const expectedValue = getMonkeyResult(
    anotherMonkey.name === firstName ? secondName : firstName
  )

  function getExpectedResult(name: string, expected: number) {
    const monkey = monkeys.find((m) => m?.name === name)!

    let required = 0
    switch (monkey.type) {
      case MONKEY_TYPE.NUMBER:
        required = monkey.number!
        break
      case MONKEY_TYPE.OPERATION: {
        const firstOperatorName = monkey.operation?.first!
        const secondOperatorName = monkey.operation?.second!

        const otherValue = getMonkeyResult(
          firstOperatorName in names ? secondOperatorName : firstOperatorName
        )

        switch (monkey.operation?.operand) {
          case "+":
            required = expected - otherValue
            break
          case "*":
            required = expected / otherValue
            break
          case "/":
            required = expected * otherValue
            break
          case "-":
            required = expected + otherValue
            break
        }
        break
      }
    }
    return required
  }

  let m = getExpectedResult(
    anotherMonkey.name === firstName ? firstName : secondName,
    expectedValue
  )
}
