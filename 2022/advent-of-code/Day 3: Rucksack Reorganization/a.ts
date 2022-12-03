const input = await Deno.readTextFile("./input.txt")

let total = 0

function getPriority(char: string): number {
  if (/[a-z]/.test(char)) return char.charCodeAt(0) - 96
  else if (/[A-Z]/.test(char)) return char.charCodeAt(0) - 38
  return 0
}

let cnt = 0
for (const contents of input.split("\n")) {
  if (!contents) continue
  // if (cnt === 3) break
  const obj: { [key: string]: number } = {}
  const half = contents.length / 2
  const firstCompartmentContent = contents.substring(0, half)
  const secondCompartmentContent = contents.substring(half)

  console.log({
    firstCompartmentContent,
    secondCompartmentContent,
  })
  for (const char of firstCompartmentContent.split("")) {
    obj[char] = 0
  }
  for (const char of secondCompartmentContent.split("")) {
    if (obj[char] === undefined) obj[char] = 1
    else if (obj[char] === 0) {
      obj[char]++
      console.log(char)
      total += getPriority(char)
    }
  }
  cnt++
}

console.log(total)
