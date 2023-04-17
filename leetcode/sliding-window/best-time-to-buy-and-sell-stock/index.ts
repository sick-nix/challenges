import { readFileSync } from "fs"
;(async function () {
  const prices: number[] = JSON.parse(await readFileSync("./test.txt", "utf-8"))
  console.time("test")
  console.log(maxProfit(prices))
  console.timeEnd("test")
})()

// function maxProfit(prices: number[]): number {
//   let result = 0

//   for (let i = 0; i < prices.length - 1; i++) {
//     const val = Math.max(...prices.slice(i + 1)) - prices[i]
//     if (val <= 0) continue
//     if (val > result) result = val
//   }
//   return result > 0 ? result : 0
// }

function maxProfit(prices: number[]): number {
  let min = prices[0]
  let max = 0

  for (let i = 1; i < prices.length; i++) {
    min = Math.min(min, prices[i])
    max = Math.max(max, prices[i] - min)
  }

  return max
}
