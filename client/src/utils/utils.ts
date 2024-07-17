import {XorO} from "../types"

// A function that takes size as an input, and returns an array the size of length input, with each item containing an array filled with undefineds the length of size n
const changeBoardSize = (size: number) => {
	const cols = new Array<undefined>(size).fill(undefined)
	const rows: Array<Array<undefined>> = []
	for (let i = 0; i < size; i++) {
		rows.push(cols)
	}
	return rows
}

/**
 * The function `isWinnerVertical` checks if a player has won vertically in a game board.
 * @param {(XorO | undefined)[][]} board - The `board` parameter is a 2D array representing the game
 * board. Each element in the array is either "X", "O", or undefined. The function
 * `isWinnerVertical` checks if there is a vertical winner in the specified column `col` of the
 * board.
 * @param {number} col - The `col` parameter in the `isWinnerVertical` function represents the
 * column index in the game board where you want to check for a vertical winning condition. The
 * function will check if all the elements in that column have the same value (either 'X' or 'O') to
 * determine if there
 * @returns a boolean value. It returns `true` if all the elements in the specified column of the board
 * are the same (either 'X' or 'O'), and `false` otherwise.
 */
const isWinnerVertical = (board: (XorO | undefined)[][], col: number) => {
	// TODO: Not sure if this is the best case scenario, but I think this should throw an error and notify the client
	if (col >= board.length || !board.length) return false

	const xOrO = board[0][col]
	if (!xOrO) return false

	for (let i = 1; i < board.length; i++) {
		if (board[i][col] !== xOrO) {
			return false
		}
	}
	return true
}

const isWinnerHorizontal = (board: (XorO | undefined)[][], row: number) => {
	// TODO: Not sure if this is the best case scenario, but I think this should throw an error and notify the client
	if (row >= board.length || !board.length) return false

	const xOrO = board[row][0]
	if (!xOrO) return false

	for (let i = 1; i < board.length; i++) {
		if (board[row][i] !== xOrO) {
			return false
		}
	}
	return true
}

const isWinnerDiagonalFromLeftToRight = (board: (XorO | undefined)[][]) => {
	const xOrO = board[0][0]
	if (!xOrO) return false
	for (let i = 1; i < board.length; i++) {
		if (board[i][i] !== xOrO) return false
	}
	return true
}

const isWinnerDiagonalRightToLeft = (board: (XorO | undefined)[][]) => {
	let currentRow = board.length - 1
	let currentCol = 0
	const isXOrO = board[currentRow][currentCol]
	while (currentCol < board.length - 1) {
		currentCol++
		currentRow--

		if (board[currentRow][currentCol] !== isXOrO) return false
	}

	return true
}

const checkIsGameOver = (boardSize: number, numOfMoves: number) => {
	const totalPossibleMoves = boardSize * boardSize
	if (numOfMoves >= totalPossibleMoves - 1) return true

	return false
}

const isXOrO = (moves: number) => {
	if (moves === 0) return "X"

	if (moves % 2 === 0) return "X"

	return "O"
}

export {
	changeBoardSize,
	isWinnerVertical,
	isWinnerHorizontal,
	isWinnerDiagonalFromLeftToRight,
	isWinnerDiagonalRightToLeft,
	checkIsGameOver,
	isXOrO,
}
