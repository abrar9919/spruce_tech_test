import React, {useEffect, useState} from "react"
import {BoardDB, Position, ServerResponse, XorO, winner} from "./types"
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
import {useMutation} from "@tanstack/react-query"
import {SERVER_URL} from "./utils/constants"
import PreviousGames from "./components/PreviousGames"

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

	const createNewGame = async () => {
		const response = await fetch(`${SERVER_URL}/game`, {
			method: "POST",
			body: JSON.stringify({board_size: boardSize}),
			headers: {
				"Content-Type": "application/json",
			},
		})
		const data = (await response.json()) as ServerResponse<BoardDB[]>
		return data
	}
	// New game will always contain the new id of a game
	const newGame = useMutation({
		mutationFn: createNewGame,
	})
	const gameId = newGame?.data?.data[0].game_id

	const updateMoveInServer = async (payload: Position) => {
		const {row, col} = payload
		const response = await fetch(`${SERVER_URL}/game/${gameId}/move`, {
			method: "POST",
			body: JSON.stringify({
				row,
				col,
				player: isXOr0 === "O" ? "X" : "O", // Doing it this way because the state has already been updated to the next player
				move_number: totalMoves,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})

		return await response.json()
	}

	const updateGameStatusInServer = async () => {
		const response = await fetch(`${SERVER_URL}/game/${gameId}`, {
			method: "PUT",
			body: JSON.stringify({
				result: gameStatus,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
		return await response.json()
	}

	const updateMove = useMutation({
		mutationFn: updateMoveInServer,
	})

	const updateGameStatus = useMutation({
		mutationFn: updateGameStatusInServer,
	})

	useEffect(() => {
		newGame.mutate()
	}, [])

	const updateBoard = (row: number, column: number) => {
		const boardCopy = JSON.parse(JSON.stringify(board))
		if (isXOr0 === "X") {
			boardCopy[row][column] = "X"
		} else {
			boardCopy[row][column] = "O"
		}
		setTotalMoves(totalMoves + 1)

		updateMove.mutate({row, col: column})
		const isGameOver = checkIsGameOver(boardSize, totalMoves)

		if (isGameOver) {
			setGameStatus("Draw")
			updateGameStatus.mutate()
		} else {
			const isWinner =
				isWinnerHorizontal(boardCopy[row]) ||
				isWinnerVertical(boardCopy, column) ||
				isWinnerDiagonalFromLeftToRight(boardCopy) ||
				isWinnerDiagonalRightToLeft(boardCopy)

			if (isWinner) {
				setGameStatus(isXOr0)
				updateGameStatus.mutate()
			}
		}

		setBoard(boardCopy)
	}

	const resetBoard = () => {
		setBoard(changeBoardSize(boardSize))
		setGameStatus(undefined)
		setTotalMoves(0)
		newGame.mutate()
	}

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
							{gameStatus === "Draw"
								? "The game ended in a draw!"
								: `Congrats on winning, player ${gameStatus}!`}
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
			<PreviousGames />
		</div>
	)
}
