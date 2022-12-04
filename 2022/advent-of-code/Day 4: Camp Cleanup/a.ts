const input = await Deno.readTextFile("./input.txt")

let result = 0
for (const line of input.split("\n")) {
  const [pair1, pair2] = line.split(",")
  const [firstPairStart, firstPairEnd] = pair1
    .split("-")
    .map((num) => parseInt(num))
  const [secondPairStart, secondPairEnd] = pair2
    .split("-")
    .map((num) => parseInt(num))

  if (
    (firstPairStart >= secondPairStart && firstPairEnd <= secondPairEnd) ||
    (secondPairStart >= firstPairStart && secondPairEnd <= firstPairEnd)
  ) {
    result++
  }
}

console.log(result)
