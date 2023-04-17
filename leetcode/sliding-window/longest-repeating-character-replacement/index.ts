const s = "ABAB"
const k = 2

console.time("test")
console.log(characterReplacement(s, k))
console.timeEnd("test")

function characterReplacement(s: string, k: number): number {
  const duplicateCount = {}
  let l = 0
  let r = 0
  let max = 0

  while (r < s.length) {
    const isRepeat = Object.keys(duplicateCount).includes(s.charAt(r))
    const windowLength = r + 1 - l
    if (isRepeat) duplicateCount[s.charAt(r)]++
    else duplicateCount[s.charAt(r)] = 1

    //get max common value and get unique value from the window
    const maxDuplicate = Math.max(
      ...(Object.values(duplicateCount) as number[])
    )
    const maxUnique = windowLength - maxDuplicate
    if (maxUnique <= k) {
      max = Math.max(max, windowLength)
    } else {
      duplicateCount[s.charAt(l)]-- //reducing occurance of left pointer in hashmap
      l++ //shifting to right
    }
    //get
    r++
  }
  return max
}
