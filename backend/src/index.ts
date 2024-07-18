import express from "express"
import dotenv from "dotenv"
import setCorsHeaders from "./middleware/cors"
import {createClient} from "@supabase/supabase-js"

const app = express()
const port = 3000
dotenv.config()
// Used to avoid any CORS errors in localdev
app.use(setCorsHeaders)
app.use(express.json())

const supabaseURL = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseURL || !supabaseKey)
	throw new Error("Supabase URL and Key is required.")

const supabase = createClient(supabaseURL, supabaseKey)

// Route to create a new game
app.post("/game", async (req, res) => {
	const {board_size} = req.body

	if (!board_size)
		return res
			.status(400)
			.send("board_size is required inside the request body.")

	const newGame = await supabase.from("games").insert({board_size}).select()

	return res.json(newGame)
})

// Route to update game status
app.put("/game/:id", async (req, res) => {
	const id = req.params.id
	const {result} = req.body
	if (!id || !result)
		return res
			.status(400)
			.send(
				"Game ID is required in route params and result is required in the body."
			)

	const gameStatus = await supabase
		.from("games")
		.update({result})
		.eq("game_id", id)
		.select()

	return res.json(gameStatus)
})

// Route to get all available games
app.get("/games", async (req, res) => {
	const response = await supabase
		.from("games")
		.select()
		.order("game_date", {ascending: false})
		.limit(10)

	return res.json(response)
})

// Route to store a move on a game
app.post("/game/:id/move", async (req, res) => {
	const {row, col, player, move_number} = req.body
	const game_id = req.params.id
	// TODO: Use Express validator/JOI as opposed to doing it manually

	const response = await supabase
		.from("moves")
		.insert({game_id, move_number, row_number: row, col_number: col, player})
		.select()
	return res.json({response})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
