import React, {useState} from "react"
import {XorO, winner} from "./types"
import {
	changeBoardSize,
	checkIsGameOver,
	isWinnerDiagonalFromLeftToRight,
	isWinnerDiagonalRightToLeft,
	isWinnerHorizontal,
	isWinnerVertical,
	isXOrO,
} from "./utils/utils"
import TicTacToeBox from "./components/TicTacToeBox"

export const Main = () => {
	const [board, setBoard] = useState<(XorO | undefined)[][]>([
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
	])
	const [boardSize, setBoardSize] = useState(3)
	const [gameStatus, setGameStatus] = useState<winner>(undefined)
	const [totalMoves, setTotalMoves] = useState(0)

	const isXOr0 = isXOrO(totalMoves)
	const updateBoard = (row: number, column: number) => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		if (isXOr0 === "X") {
			boardCopy[row][column] = "X"
		} else {
			boardCopy[row][column] = "O"
		}
		setTotalMoves(totalMoves + 1)

		const isGameOver = checkIsGameOver(boardSize, totalMoves)

		if (isGameOver) {
			setGameStatus("Draw")
		} else {
			console.log(isWinnerDiagonalFromLeftToRight(boardCopy))
			const isWinner =
				isWinnerHorizontal(boardCopy, row) ||
				isWinnerVertical(boardCopy, column) ||
				isWinnerDiagonalFromLeftToRight(boardCopy) ||
				isWinnerDiagonalRightToLeft(boardCopy)

			if (isWinner) setGameStatus(isXOr0)
		}

		setBoard(boardCopy)
	}

	const resetBoard = () => {
		setBoard(changeBoardSize(boardSize))
		setGameStatus(undefined)
		setTotalMoves(0)
	}

	console.log(gameStatus)
	return (
		<div className='flex flex-col mt-10 items-center gap-10'>
			<div className='font-bold text-2xl'>Tic Tac Toe</div>
			<div className='flex flex-col gap-1'>
				{board.map((row, rowI) => (
					<div className='flex gap-1' key={rowI}>
						{row.map((_, colI) => (
							<TicTacToeBox
								key={`${rowI}-${colI}`}
								disabled={!!board[rowI][colI] || !!gameStatus}
								updateBoard={updateBoard}
								value={board[rowI][colI]}
								rowI={rowI}
								colI={colI}
							/>
						))}
					</div>
				))}
			</div>
			<div>
				{gameStatus && (
					<>
						<p className='text-center pb-4'>
							Congrats on winning, player {gameStatus}!
						</p>
						<div className='flex items-center justify-center gap-8 pb-4'>
							<input
								value={boardSize}
								type='range'
								max={15}
								min={3}
								onChange={(event) => setBoardSize(Number(event.target.value))}
							/>
							<p className='text-center'>{boardSize}</p>
						</div>
						<button
							className='border-2 border-gray-900 px-4 py-2 rounded-md'
							onClick={resetBoard}
						>
							Click here to start another game
						</button>
					</>
				)}
			</div>
		</div>
	)
}
