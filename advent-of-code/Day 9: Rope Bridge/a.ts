const input = await Deno.readTextFile("./input.txt")

let num = 0
const cycles: number[] = []

for (const line of input.split("\n")) {
  if (line === "noop") cycles.push(num)
  else {
    const [, n] = line.split(" ").map((item) => [item[0], parseInt(item[1])])
    cycles.push(num)
    num += n as unknown as number
    cycles.push(num)
  }
}

let total = 0
const NEEDED_CYCLES = [20, 60, 100, 140, 180, 220]
for (const cycle of NEEDED_CYCLES) {
  total += cycle * cycles[cycle + 1]
}
console.log(total)
