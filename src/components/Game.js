import React from "react";
import { useState } from "react";
import { squareState } from "../constants";
import NextTurnIndicator from "./NextTurnIndicator";
import ChocolateBar from "./ChocolateBar";

export default function Game({ numRows, numColumns }) {
	const [chompedSquares, setChompedSquares] = useState(
		Array.from({ length: numRows }, () =>
			Array(numColumns).fill(squareState.NOT_CHOMPED)
		)
	);
	const [playerOneIsNext, setPlayerOneIsNext] = useState(true);

	function replayGame() {
		const nextSquares = Array.from({ length: numRows }, () =>
			Array(numColumns).fill(squareState.NOT_CHOMPED)
		);
		setChompedSquares(nextSquares);
		setPlayerOneIsNext(true);
	}

	function newGame() {
		let currRows = numRows;
		let currColumns = numColumns;
		while (currRows === numRows && currColumns === numColumns) {
			numColumns = getRandom(2, 6);
			numRows = getRandom(2 + (numColumns === 2 ? 1 : 0), 6);
		} //This loop ensures new board dimensions, no back-to-back repeat configuration
		const nextSquares = Array.from({ length: numRows }, () =>
			Array(numColumns).fill(squareState.NOT_CHOMPED)
		);
		setChompedSquares(nextSquares);
		setPlayerOneIsNext(true);
	}

	async function handleChomp(row, col) {
		const overlay = document.getElementById("overlay");
		overlay.style.display = "block"; // Show the overlay

		console.log(`Chomping (${row}, ${col})`);
		const maxRow = numRows - 1;
		const maxCol = numColumns - 1;
		const maxDistance = maxRow - row + (maxCol - col);
		console.log(`Max distance: ${maxDistance}`);
		for (let distance = 0; distance <= maxDistance; distance++) {
			console.log(`Starting distance: ${distance}`);
			chompByDistance(distance, row, col);
			if (distance < maxDistance) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		}
		setPlayerOneIsNext(!playerOneIsNext);
		overlay.style.display = "none"; // Hide the overlay when the loop is done
	}

	async function chompByDistance(distance, chompRow, chompCol) {
		console.log(
			"Entered chompByDistance function with distance",
			distance,
			"chompRow",
			chompRow,
			"chompCol",
			chompCol
		);
		let nextChompedSquares = chompedSquares.slice();
		for (let i = chompRow; i < numRows; i++) {
			let nextCol = chompCol + (distance - (i - chompRow));
			if (i - chompRow <= distance && nextCol < numColumns) {
				nextChompedSquares[i][nextCol] = squareState.CHOMPED;
				console.log("Distance", distance, " chomping", i, nextCol);
			}
		}
		setChompedSquares(nextChompedSquares);
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
		<div id="game">
			<NextTurnIndicator
				isPlayerOneNext={playerOneIsNext}
				isGameOver={isGameOver(chompedSquares)}
			></NextTurnIndicator>
			<ChocolateBar
				chompedSquares={chompedSquares}
				isPlayerOneNext={playerOneIsNext}
				isGameOver={isGameOver(chompedSquares)}
				onChomp={handleChomp}
				onHoverChange={handleHoverChange}
				onReplayGame={replayGame}
				onNewGame={newGame}
			></ChocolateBar>
		</div>
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

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
