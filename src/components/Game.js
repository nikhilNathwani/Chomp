import React from "react";
import { useState } from "react";
import { squareState } from "../constants";
import NextTurnIndicator from "./NextTurnIndicator";
import ChocolateBar from "./ChocolateBar";

let numRows = 4;
let numColumns = 5;

export default function Game() {
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
		document.getElementById("game").click();
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
		document.getElementById("game").click();
	}

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
