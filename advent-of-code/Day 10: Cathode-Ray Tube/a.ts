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

let total = 0
const NEEDED_CYCLES = [20, 60, 100, 140, 180, 220]
for (const cycle of NEEDED_CYCLES) {
  console.log(cycle, cycles[cycle - 1], cycles[cycle], cycles[cycle + 1])
  // only sum the value before the end of the cycle
  total += cycle * cycles[cycle - 2]
}
console.log(total)

/* SOLUTION 2 */
// const cycles: number[] = []
// for (const line of input.split("\n")) {
//   if (line === "noop") cycles.push(0)
//   else {
//     const [, n] = line.split(" ")
//     cycles.push(0)
//     cycles.push(parseInt(n))
//   }
// }

// let inc = 1
// const totals: number[] = []
// const NEEDED_CYCLES = [20, 60, 100, 140, 180, 220]
// cycles.forEach((value, index) => {
//   if (NEEDED_CYCLES.includes(index + 1)) totals.push(inc * (index + 1))
//   inc += value
// })

// let total = 0
// for (const value of totals) {
//   total += value
// }
// console.log(total)
