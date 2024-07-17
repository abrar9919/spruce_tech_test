import {XorO} from "../types"
import {
	isWinnerVertical,
	checkIsGameOver,
	changeBoardSize,
	isWinnerHorizontal,
	isWinnerDiagonalFromLeftToRight,
	isWinnerDiagonalRightToLeft,
} from "./utils"

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
		expect(checkIsGameOver(boardSize, numOfMoves)).toBe(true)
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

describe("changeBoardSize", () => {
	it("should create a board of size 3x3 filled with undefined", () => {
		const size = 3
		const expectedBoard = [
			[undefined, undefined, undefined],
			[undefined, undefined, undefined],
			[undefined, undefined, undefined],
		]
		expect(changeBoardSize(size)).toEqual(expectedBoard)
	})

	it("should create a board of size 1x1 filled with undefined", () => {
		const size = 1
		const expectedBoard = [[undefined]]
		expect(changeBoardSize(size)).toEqual(expectedBoard)
	})

	it("should create a larger board of size 4x4 filled with undefined", () => {
		const size = 4
		const expectedBoard = [
			[undefined, undefined, undefined, undefined],
			[undefined, undefined, undefined, undefined],
			[undefined, undefined, undefined, undefined],
			[undefined, undefined, undefined, undefined],
		]
		expect(changeBoardSize(size)).toEqual(expectedBoard)
	})
})

describe("isWinnerHorizontal", () => {
	it("should return true when all elements in a row are X", () => {
		const row: (XorO | undefined)[] = ["X", "X", "X", "X", "X"]
		expect(isWinnerHorizontal(row)).toBe(true)
	})

	it("should return true when all elements in a row are O", () => {
		const row: (XorO | undefined)[] = ["O", "O", "O"]
		expect(isWinnerHorizontal(row)).toBe(true)
	})

	it("should return false when elements in a row are mixed", () => {
		const row: (XorO | undefined)[] = ["X", "O", "X"]
		expect(isWinnerHorizontal(row)).toBe(false)
	})

	it("should return false when a row contains undefined values", () => {
		const row: (XorO | undefined)[] = ["X", undefined, "X"]
		expect(isWinnerHorizontal(row)).toBe(false)
	})
})

describe("isWinnerDiagonalFromLeftToRight", () => {
	it("should return true when all elements in the diagonal are X", () => {
		const board: (XorO | undefined)[][] = [
			["X", "O", "X"],
			["O", "X", "O"],
			["O", "O", "X"],
		]
		expect(isWinnerDiagonalFromLeftToRight(board)).toBe(true)
	})

	it("should return true when all elements in the diagonal are O", () => {
		const board: (XorO | undefined)[][] = [
			["O", "X", "X"],
			["X", "O", "X"],
			["X", "X", "O"],
		]
		expect(isWinnerDiagonalFromLeftToRight(board)).toBe(true)
	})

	it("should return false when elements in the diagonal are mixed", () => {
		const board: (XorO | undefined)[][] = [
			["X", "O", "X"],
			["O", "O", "O"],
			["O", "X", "X"],
		]
		expect(isWinnerDiagonalFromLeftToRight(board)).toBe(false)
	})

	it("should return false when the diagonal contains undefined values", () => {
		const board: (XorO | undefined)[][] = [
			["X", "O", "X"],
			["O", undefined, "O"],
			["O", "X", "X"],
		]
		expect(isWinnerDiagonalFromLeftToRight(board)).toBe(false)
	})
})

describe("isWinnerDiagonalRightToLeft", () => {
	it("should return true when all elements in the diagonal are X", () => {
		const board: (XorO | undefined)[][] = [
			["O", "O", "X"],
			["O", "X", "O"],
			["X", "O", "O"],
		]
		expect(isWinnerDiagonalRightToLeft(board)).toBe(true)
	})

	it("should return true when all elements in the diagonal are O", () => {
		const board: (XorO | undefined)[][] = [
			["X", "X", "O"],
			["X", "O", "X"],
			["O", "X", "X"],
		]
		expect(isWinnerDiagonalRightToLeft(board)).toBe(true)
	})

	it("should return false when the diagonal contains undefined values", () => {
		const board: (XorO | undefined)[][] = [
			["X", "X", undefined],
			["X", undefined, "X"],
			[undefined, "X", "X"],
		]
		expect(isWinnerDiagonalRightToLeft(board)).toBe(false)
	})

	it("should return false if the starting element is undefined", () => {
		const board: (XorO | undefined)[][] = [
			["O", "X", "X"],
			["X", "O", "X"],
			[undefined, "X", "X"],
		]
		expect(isWinnerDiagonalRightToLeft(board)).toBe(false)
	})
})
