const board = [
	[".", ".", "4", ".", ".", ".", "6", "3", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", "."],
	["5", ".", ".", ".", ".", ".", ".", "9", "."],
	[".", ".", ".", "5", "6", ".", ".", ".", "."],
	["4", ".", "3", ".", ".", ".", ".", ".", "1"],
	[".", ".", ".", "7", ".", ".", ".", ".", "."],
	[".", ".", ".", "5", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", "."],
]

console.log(isValidSudoku(board))

function isValidSudoku(board: string[][]): boolean {
	// check for rows
	for (let i = 0; i < board.length; i++) {
		const cur: number[] = []
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] == ".") continue
			const num = parseInt(board[i][j])
			if (cur.includes(num)) return false
			cur.push(num)
		}
	}

	// check for columns
	for (let i = 0; i < board[0].length; i++) {
		const cur: number[] = []
		for (let j = 0; j < board.length; j++) {
			if (board[j][i] == ".") continue
			const num = parseInt(board[j][i])
			if (cur.includes(num)) return false
			cur.push(num)
		}
	}

	// check for sub boards
	for (let row = 0; row < 3; row++) {
		for (let column = 0; column < 3; column++) {
			const cur: number[] = []
			for (let i = row * 3; i < (row + 1) * 3; i++) {
				for (let j = column * 3; j < (column + 1) * 3; j++) {
					if (board[i][j] == ".") continue
					const num = parseInt(board[i][j])
					if (cur.includes(num)) return false
					cur.push(num)
				}
			}
		}
	}

	return true
}
