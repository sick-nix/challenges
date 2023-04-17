const input = (await Deno.readTextFile("./input.txt")).split("\n")

let currentPosition: [number, number] | null = null
let desiredPosition: [number, number] | null = null
const grid: string[][] = []
const visitedPositions: boolean[][] = []

for (let i = 0; i < input.length; i++) {
  const splitLine = input[i].split("")
  for (let j = 0; j < splitLine.length; j++) {
    const char = splitLine[j]
    if (char === "S") currentPosition = [i, j]
    else if (char === "E") desiredPosition = [i, j]
  }
}

const positions: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

while (
  currentPosition?.[0] !== desiredPosition?.[0] &&
  currentPosition?.[1] !== desiredPosition?.[1]
) {
  const [row, column] = currentPosition!
  let newRow: number | null = null
  let newColumn: number | null = null
  for (const [rowDif, colDif] of positions) {
    newRow = row + rowDif
    newColumn = column + colDif
    if (grid[newRow][newColumn] === undefined) continue
    
  }
}
