const input = await Deno.readTextFile("./input.txt")

const stream = input.split("")
const length = 14
const letters = stream.splice(0, length)
let position = 0

function check() {
  return length === new Set(letters).size
}

let i = length
for (const letter of stream) {
  const result = check()
  if (result) {
    position = i
    break
  }

  letters.shift()
  letters.push(letter)
  i++
}

console.log(position)
