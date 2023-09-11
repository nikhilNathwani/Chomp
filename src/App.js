import React from "react";
import { useState } from "react";
import { squareState } from "./constants";
import ChocolateBar from "./components/ChocolateBar";

//Current goal:
//- Consider UI showing "Player 1" left-aligned & "Player 2" right-aligned, then toggle the color on/off (and maybe the text) to indicate whose turn it is

export default function Game() {
	return <Level numRows={4} numColumns={5}></Level>;
}

function Level({ numRows, numColumns }) {
	const [chompedSquares, setChompedSquares] = useState(
		Array.from({ length: numRows }, () =>
			Array(numColumns).fill(squareState.NOT_CHOMPED)
		)
	);
	const [playerOneIsNext, setPlayerOneIsNext] = useState(true);

	function handleChomp(row, col) {
		let nextChompedSquares = chompedSquares.slice();
		for (let i = row; i < numRows; i++) {
			for (let j = col; j < numColumns; j++) {
				nextChompedSquares[i][j] = squareState.CHOMPED;
			}
		}
		setChompedSquares(nextChompedSquares);
		setPlayerOneIsNext(!playerOneIsNext);
	}

	function handleHoverChange(row, col, isHoverOn) {
		if (chompedSquares[row][col] === squareState.CHOMPED) {
			return;
		}
		let nextChompedSquares;
		if (isHoverOn) {
			nextChompedSquares = handleHoverOn(row, col);
		} else {
			nextChompedSquares = handleHoverOff(row, col);
		}
		setChompedSquares(nextChompedSquares);
	}

	function handleHoverOn(row, col) {
		let nextChompedSquares = chompedSquares.slice();
		for (let i = row; i < numRows; i++) {
			for (let j = col; j < numColumns; j++) {
				if (nextChompedSquares[i][j] !== squareState.CHOMPED) {
					nextChompedSquares[i][j] = squareState.BLAST_ZONE;
				}
			}
		}
		return nextChompedSquares;
	}

	function handleHoverOff(row, col) {
		let nextChompedSquares = chompedSquares.slice();
		for (let i = row; i < numRows; i++) {
			for (let j = col; j < numColumns; j++) {
				if (nextChompedSquares[i][j] === squareState.BLAST_ZONE) {
					nextChompedSquares[i][j] = squareState.NOT_CHOMPED;
				}
			}
		}
		return nextChompedSquares;
	}

	return (
		<React.Fragment>
			<h1>Chomp!</h1>
			<ol id="chomp-rules">
				<li>
					It's you (Player 1) vs. the computer (Player 2) (tbd.. for
					now you control both players).
				</li>

				<li>
					Take turns "chomping" a square of chocolate from the bar
				</li>
				<li>
					With each chomp, all squares below and to the right are also
					eaten
				</li>
				<li>
					The goal is to avoid the "poison" square. If Player 2 chomps
					it, you win!
				</li>
				{/* <li>
					You win if Player 2 chomps the "poison" square (top-left)!
				</li> */}
			</ol>
			<div
				id="nextTurnIndicator"
				className={"player" + (playerOneIsNext ? "-one" : "-two")}
			>
				Player {playerOneIsNext ? "1" : "2"}
				{isGameOver(chompedSquares) ? " wins!" : "'s turn"}
			</div>
			<ChocolateBar
				chompedSquares={chompedSquares}
				isPlayerOneNext={playerOneIsNext}
				onChomp={handleChomp}
				onHoverChange={handleHoverChange}
			></ChocolateBar>
		</React.Fragment>
	);
}

function isGameOver(matrix) {
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] !== 1) {
				return false;
			}
		}
	}
	return true;
}
