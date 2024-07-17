import React from "react"
import {XorO} from "../types"

interface TicTacToeBoxProps {
	disabled: boolean
	updateBoard: (rowI: number, colI: number) => void
	value: XorO | undefined
	rowI: number
	colI: number
}

export default function TicTacToeBox({
	disabled,
	updateBoard,
	value,
	rowI,
	colI,
}: TicTacToeBoxProps) {
	return (
		<button
			onClick={() => updateBoard(rowI, colI)}
			disabled={disabled}
			className='border-2 border-gray-900 w-10 h-10 disabled:hover:bg-slate-600 hover:bg-slate-100 cursor-pointer items-center justify-center text-2xl font-bold flex'
		>
			{value}
		</button>
	)
}

//
