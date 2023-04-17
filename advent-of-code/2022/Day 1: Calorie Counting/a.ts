const input = await Deno.readTextFile("./input.txt")

let max = 0
let current = 0

for (const value of input.split("\n")) {
  const number = parseInt(value)
  if (isNaN(number)) {
    current = 0
    continue
  }
  current += number
  if (current > max) max = current
}

console.log(max)
