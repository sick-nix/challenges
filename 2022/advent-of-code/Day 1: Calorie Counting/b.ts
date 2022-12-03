const input = await Deno.readTextFile("./input.txt")

let current = 0

const sums = []

for (const value of input.split("\n")) {
  const number = parseInt(value)
  if (isNaN(number)) {
    sums.push(current)
    current = 0
    continue
  }
  current += number
}

sums.sort((a, b) => a - b)
console.log(
  sums[sums.length - 1] + sums[sums.length - 2] + sums[sums.length - 3]
)
