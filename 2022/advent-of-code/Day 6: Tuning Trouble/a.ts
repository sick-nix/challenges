const input = await Deno.readTextFile("./input.txt")

const stream = input.split("")
let first: string | null = null,
  second: string | null = null,
  third: string | null = null,
  fourth: string | null = null
let position = 0

function check(first: string, second: string, third: string, fourth: string) {
  return (
    first &&
    second &&
    third &&
    fourth &&
    first !== second &&
    first !== third &&
    first !== fourth &&
    second !== third &&
    second !== fourth &&
    third !== fourth
  )
}

let i = 0
for (const letter of stream) {
  if (!first) {
    first = letter
    i++
    continue
  }
  if (!second) {
    second = letter
    i++
    continue
  }
  if (!third) {
    third = letter
    i++
    continue
  }
  if (!fourth) {
    fourth = letter
    if (check(first, second, third, fourth)) {
      break
    }
    i++
  }

  const result = check(second, third, fourth, letter)
  if (result) {
    position = i
    break
  }

  first = second
  second = third
  third = fourth
  fourth = letter
  i++
}

console.log(position)
