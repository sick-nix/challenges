const input = await Deno.readTextFile("./input.txt")

let num = 1
const cycles: number[] = []

for (const line of input.split("\n")) {
  if (line === "noop") cycles.push(num)
  else {
    const [, n] = line.split(" ")
    cycles.push(num)
    num += parseInt(n)
    cycles.push(num)
  }
}

console.log(cycles)

let spritePosition = 1
const chars: string[] = []

for (const [cycle, value] of Object.entries(cycles)) {
  if (
    [spritePosition - 1, spritePosition, spritePosition + 1].includes(
      parseInt(cycle) % 40
    )
  ) {
    chars.push("#")
  } else {
    chars.push(".")
  }
  spritePosition = value
}

console.log(chars.join("").match(/.{1,40}/g))
