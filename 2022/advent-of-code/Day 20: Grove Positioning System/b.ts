const numbers = (await Deno.readTextFile("./input.txt"))
  .split("\n")
  .map((item) => parseInt(item))

const mix = ({
  arr,
  decryptionKey = 1,
  times = 1,
}: {
  arr: Array<number>
  decryptionKey: number
  times: number
}) => {
  const arrLength = arr.length
  const refs = arr.map((val) => [val * decryptionKey])
  const original = [...refs]
  while (times--) {
    for (const currentRef of original) {
      const value = currentRef[0]
      const isNegative = value < 0
      if (isNegative) refs.reverse()
      const currentIndex = refs.findIndex((ref) => ref === currentRef)
      const newIndex = (currentIndex + Math.abs(value)) % (arrLength - 1)
      refs.splice(currentIndex, 1)
      refs.splice(newIndex, 0, currentRef)
      if (isNegative) refs.reverse()
    }
  }
  return refs.flat()
}

const findValueAt = (index: number, arr: Array<number>) => {
  const arrLength = arr.length
  const indexOfZero = arr.findIndex((val) => val === 0)
  index = (indexOfZero + index) % arrLength
  return arr[index]
}

const mixedData = mix({ arr: numbers, decryptionKey: 811589153, times: 10 })
const res = [1000, 2000, 3000]
  .map((index) => findValueAt(index, mixedData))
  .reduce((acc, el) => acc + el, 0)
console.log(res)
