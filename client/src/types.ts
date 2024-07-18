export type XorO = "X" | "O"

export type winner = "X" | "O" | "Draw" | undefined

export interface BoardDB {
	board_size: number
	game_date: string
	game_id: number
	result: string
}

export interface ServerResponse<T> {
	data: T
	count: null
	error: null | string // Unsure if the error might be a string
	status: number
	statusText: string
}

export interface Position {
	row: number
	col: number
}
