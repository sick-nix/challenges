const s = "abcabcbb"
console.time("test")
console.log(lengthOfLongestSubstring(s))
console.timeEnd("test")

function lengthOfLongestSubstring(s: string): number {
  const charMap = new Map<string, number>()
  let len = 0
  let str = ""
  for (let i = 0; i < s.length; i++) {
    console.log(i, s[i])
    if (charMap.has(s[i])) {
      const n = charMap.get(s[i])
      if (n != null) {
        if (str.length > len) len = str.length
        str = str.slice(str.indexOf(s[i]) + 1)
      }
    } else {
      charMap.set(s[i], 1)
    }
    str += s[i]
  }
  if (str.length > len) len = str.length
  return len
}
