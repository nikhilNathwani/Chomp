import React from "react";
import { useState } from "react";

//Current goal:

const numRows = 4;
const numColumns = 5;

export default function Level() {
	const [chompedSquares, setChompedSquares] = useState(
		Array.from({ length: numRows }, () => Array(numColumns).fill(false))
	);
	const [playerOneIsNext, setPlayerOneIsNext] = useState(true);
	let nextPlayerNumString = playerOneIsNext ? "1" : "2";

	function handleChomp(row, col) {
		let nextChompedSquares = chompedSquares.slice();
		for (let i = row; i < numRows; i++) {
			for (let j = col; j < numColumns; j++) {
				nextChompedSquares[i][j] = true;
			}
		}
		setChompedSquares(nextChompedSquares);
		setPlayerOneIsNext(!playerOneIsNext);
	}

	return (
		<React.Fragment>
			<p
				id="nextTurnIndicator"
				className={"player" + nextPlayerNumString}
			>
				Player {nextPlayerNumString}'s turn
			</p>
			<Board
				chompedSquares={chompedSquares}
				isPlayerOneNext={playerOneIsNext}
				onChomp={handleChomp}
			></Board>
		</React.Fragment>
	);
}

function Board({ chompedSquares, isPlayerOneNext, onChomp }) {
	let board = chompedSquares.map((row, i) => (
		<div
			className={"board-row player-" + (isPlayerOneNext ? "one" : "two")}
			key={i}
		>
			{row.map((isChomped, j) => {
				return (
					<Square
						row={i}
						col={j}
						isChomped={isChomped}
						isPoison={i + j === 0}
						onSquareClick={() => {
							// console.log(`Clicked square at row ${i + 1}, column ${j + 1}`);
							onChomp(i, j);
						}}
						key={(i + 1) * 10 + (j + 1)}
					></Square>
				);
			})}
		</div>
	));
	return board;
}

function Square({ row, col, isChomped, isPoison, onSquareClick }) {
	return (
		<div
			className={"square " + (isChomped ? "chomped" : "notChomped")}
			onClick={onSquareClick}
		>
			{isPoison && (
				<i className="fa-solid fa-skull-crossbones fa-2xl"></i>
			)}
		</div>
	);
}
// <i class="fa-solid fa-skull-crossbones"></i>
