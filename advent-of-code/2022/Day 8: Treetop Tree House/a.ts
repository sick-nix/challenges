const input = await Deno.readTextFile("./input.txt")

const grid: number[][] = []
const visibility: boolean[][] = []

let i = 0
for (const line of input.split("\n")) {
  grid[i] = line.split("").map((num) => parseInt(num))
  i++
}

// from left to right
for (let i = 0; i < grid.length; i++) {
  let max = null
  visibility[i] = []
  for (let j = 0; j < grid[i].length; j++) {
    const current = grid[i][j]
    if (j === grid[i].length - 1) {
      visibility[i][j] = false
      continue
    }
    if (max !== null) {
      visibility[i][j] = current < max
    } else {
      visibility[i][j] = false
    }
    if (max === null || current >= max) max = current
  }
}
console.log("a")

// from right to left
for (let i = 0; i < grid.length; i++) {
  let max = null
  for (let j = grid[i].length - 1; j > 0; j--) {
    const current = grid[i][j]
    if (max === null || current >= max) max = current
    if (j === grid[i].length - 1) continue
    if (max !== null) visibility[i][j] = visibility[i][j] || current < max
  }
}
console.log("b")

// from top to bottom
for (let i = 0; i < grid[0].length; i++) {
  let max = null
  for (let j = 0; j < grid.length; j++) {
    const current = grid[j][i]
    if (j === grid.length - 1) {
      visibility[j][i] = false
      continue
    }
    if (max !== null) {
      visibility[j][i] = visibility[j][i] || current < max
    }
    if (max === null || current >= max) max = current
  }
}
console.log("c")

// from bottom to top
for (let i = 0; i < grid[0].length; i++) {
  let max = null
  visibility[i] = []
  for (let j = grid.length - 1; j > 0; j--) {
    const current = grid[j][i]
    if (max === null || current >= max) max = current
    if (j === 0) continue
    if (max !== null) visibility[j][i] = visibility[j][i] || current < max
  }
}
console.log("d")
console.log(visibility)

let visible = 0
for (let i = 1; i < visibility.length; i++) {
  if (i === visibility.length - 1) continue
  for (let j = 1; i < visibility[i].length; j++) {
    if (j === visibility[i].length - 1) continue
    if (visibility[i][j]) visible++
  }
}

console.log(visible)

// console.log(grid)
