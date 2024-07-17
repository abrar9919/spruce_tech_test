import {XorO} from "../types"
import {isWinnerVertical, checkIsGameOver} from "./utils"

describe("isWinnerVertical", () => {
	it("should return true when all elements in a column are X", () => {
		const board: (XorO | undefined)[][] = [
			["X", "O", "X"],
			["X", "X", "O"],
			["X", "O", "X"],
		]
		expect(isWinnerVertical(board, 0)).toBe(true)
	})

	it("should return true when all elements in a column are O", () => {
		const board: (XorO | undefined)[][] = [
			["O", "X", "X"],
			["O", "O", "X"],
			["O", "X", "O"],
		]
		expect(isWinnerVertical(board, 0)).toBe(true)
	})

	it("should return false when elements in a column are mixed", () => {
		const board: (XorO | undefined)[][] = [
			["X", "O", "X"],
			["O", "X", "O"],
			["X", "O", "X"],
		]
		expect(isWinnerVertical(board, 0)).toBe(false)
	})

	it("should return false when a column contains undefined values", () => {
		const board: (XorO | undefined)[][] = [
			["X", "O", "X"],
			[undefined, "X", "O"],
			["X", "O", "X"],
		]
		expect(isWinnerVertical(board, 0)).toBe(false)
	})

	it("should handle an empty board", () => {
		const board: (XorO | undefined)[][] = []
		expect(isWinnerVertical(board, 0)).toBe(false)
	})

	it("should handle a single row board", () => {
		const board: (XorO | undefined)[][] = [["X", "O", "X"]]
		expect(isWinnerVertical(board, 0)).toBe(true)
	})

	it("should handle a single column board", () => {
		const board: (XorO | undefined)[][] = [["X"], ["X"], ["X"]]
		expect(isWinnerVertical(board, 0)).toBe(true)
	})

	it("should return false if the column index is out of bounds", () => {
		const board: (XorO | undefined)[][] = [
			["X", "O", "X"],
			["X", "X", "O"],
			["X", "O", "X"],
		]
		expect(isWinnerVertical(board, 3)).toBe(false) // Column index 3 is out of bounds
	})
})

describe("checkIsGameOver", () => {
	it("should return true when the number of moves equals the board size squared", () => {
		const boardSize = 3
		const numOfMoves = 9 // 3 * 3
		expect(checkIsGameOver(boardSize, numOfMoves)).toBe(true)
	})

	it("should return false when the number of moves is less than the board size squared", () => {
		const boardSize = 3
		const numOfMoves = 8
		expect(checkIsGameOver(boardSize, numOfMoves)).toBe(false)
	})

	it("should return true when the number of moves exceeds the board size squared", () => {
		const boardSize = 3
		const numOfMoves = 10 // 3 * 3 + 1
		expect(checkIsGameOver(boardSize, numOfMoves)).toBe(true)
	})

	it("should handle a 1x1 board", () => {
		const boardSize = 1
		const numOfMoves = 1
		expect(checkIsGameOver(boardSize, numOfMoves)).toBe(true)
	})

	it("should handle a larger board size (e.g., 4x4)", () => {
		const boardSize = 4
		const numOfMoves = 16 // 4 * 4
		expect(checkIsGameOver(boardSize, numOfMoves)).toBe(true)
	})

	it("should return false for 0 moves on any board size", () => {
		const boardSize = 3
		const numOfMoves = 0
		expect(checkIsGameOver(boardSize, numOfMoves)).toBe(false)
	})

	it("should handle edge case when board size is 0", () => {
		const boardSize = 0
		const numOfMoves = 0
		expect(checkIsGameOver(boardSize, numOfMoves)).toBe(true)
	})
})
