-- I've added this to Supabase, this is purely for demonstration only

CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    board_size INTEGER NOT NULL,
    game_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    result VARCHAR(10) CHECK (result IN ('X', 'O', 'Draw'))
);


CREATE TABLE moves (
    move_id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(game_id) ON DELETE CASCADE,
    move_number INTEGER NOT NULL CHECK (move_number > 0 AND move_number <= 225),
    player VARCHAR(5) NOT NULL,
    row_number INTEGER NOT NULL,
    col_numer INTEGER NOT NULL,
    UNIQUE (game_id, move_number)
);