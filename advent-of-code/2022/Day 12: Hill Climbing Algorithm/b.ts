const input = await Deno.readTextFile("./input.txt")

interface Directory {
  [key: string]: Directory | number
}
const root: Directory = {}
let currentDir: string[] = []
let readingListResult = false

function createDir() {
  let cur = root
  for (const name of currentDir) {
    if (!cur[name]) cur[name] = {}
    cur = cur[name] as Directory
  }
}

function createFile(fileName: string, size: string) {
  let cur = root
  for (const name of currentDir) {
    if (!cur[name]) cur[name] = {}
    cur = cur[name] as Directory
  }
  cur[fileName] = parseInt(size)
}

const dirSizes: { [key: string]: number } = {}
function calculateSizes(path: string[], content: Directory) {
  const strPath = path.join("/")
  if (!dirSizes[strPath]) dirSizes[strPath] = 0
  for (const [dir, contents] of Object.entries(content)) {
    if (typeof contents === "number") {
      dirSizes[strPath] += contents
    } else {
      dirSizes[strPath] += calculateSizes([...path, dir], contents)
    }
  }
  return dirSizes[strPath]
}

for (const line of input.split("\n")) {
  const parts = line.split(" ")
  if (parts[0] === "$") {
    // is command
    readingListResult = false
    const [, command, path] = parts
    if (command === "cd") {
      if (path === "..") {
        // go back
        currentDir.splice(-1)
      } else if (path === "/") {
        currentDir = []
      } else {
        currentDir.push(path)
        createDir()
      }
    } else if (command === "ls") {
      readingListResult = true
    }

    continue
  }

  if (readingListResult) {
    const [first, second] = parts
    if (first === "dir") {
      currentDir.push(second)
      createDir()
      currentDir.pop()
    } else {
      createFile(second, first)
    }
  }
}

calculateSizes([], root)
const rootSize = dirSizes[""]
const TOTAL_SPACE = 70000000
const REQUIRED_FREE = 30000000
const currentlyFree = TOTAL_SPACE - rootSize

const sortedSizes = Object.fromEntries(
  Object.entries(dirSizes).sort(([, a], [, b]) => a - b)
)

let result = 0
for (const [, size] of Object.entries(sortedSizes)) {
  if (size + currentlyFree >= REQUIRED_FREE) {
    result = size
    break
  }
}

console.log(result)
// console.log(root)
