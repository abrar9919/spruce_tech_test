import {useQuery} from "@tanstack/react-query"
import React from "react"
import {SERVER_URL} from "../utils/constants"
import {BoardDB, ServerResponse} from "../types"

const previousGames = async () => {
	const response = await fetch(`${SERVER_URL}/games`)
	return (await response.json()) as ServerResponse<BoardDB[]>
}
export default function PreviousGames() {
	const {data, isLoading, isError} = useQuery({
		queryKey: ["previous_games"],
		queryFn: previousGames,
	})
	if (isLoading) return <>Fetching data for previous games...</>

	if (isError)
		return <>Something went wrong when fetching data for previous games...</>

	return (
		<>
			<h1 className='text-2xl'>Previous Games</h1>
			<table>
				<tr className='border border-black'>
					<th className='border border-black px-2'>Board Size</th>
					<th className='border border-black px-2'>Game Date</th>
					<th className='border border-black px-2'>Game ID</th>
					<th className='border border-black px-2'>Winner</th>
				</tr>
				{data?.data.map(({board_size, game_date, game_id, result}) => (
					<tr key={game_id} className='border border-black py-2'>
						<td className='border border-black px-2 text-center'>
							{board_size}
						</td>
						<td className='border border-black px-2'>{game_date}</td>
						<td className='border border-black px-2 text-center'>{game_id}</td>
						<td className='border border-black px-2'>
							{result ?? "Unfinished"}
						</td>
					</tr>
				))}
			</table>
		</>
	)
}
