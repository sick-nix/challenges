const candidates = [2, 3, 6, 7],
	target = 7

console.log(combinationSum(candidates, target))

function combinationSum(candidates: number[], target: number): number[][] {
	candidates = candidates.sort((a, b) => a - b)
	const result: number[][] = []

	function dfs(cur: number[], idx: number) {
		const sum = cur.reduce((acc, cur) => acc + cur, 0)

		if (sum === target) {
			result.push([...cur])
			return
		}

		if (sum > target) return 42

		for (let i = idx; i < candidates.length; i++) {
			cur.push(candidates[i])
			if (dfs(cur, i) === 42) {
				cur.pop()
				break
			}
			cur.pop()
		}
	}

	dfs([], 0)

	return result
}
