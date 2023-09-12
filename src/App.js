import React from "react";
import { useState } from "react";
import { squareState } from "./constants";
import HelpDialog from "./components/HelpDialog";
import ChocolateBar from "./components/ChocolateBar";

//Current goal:
//- Consider UI showing "Player 1" left-aligned & "Player 2" right-aligned, then toggle the color on/off (and maybe the text) to indicate whose turn it is

let numRows = 4;
let numColumns = 5;

export default function Level() {
	const [isHelpDialogOpen, setHelpDialogOpen] = useState(true);
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
		while (currRows === numRows && currColumns == numColumns) {
			numRows = getRandom(4, 6);
			numColumns = getRandom(numRows - 2, numRows + 2);
		} //This loop ensures new board dimensions, no back-to-back repeat configuration
		const nextSquares = Array.from({ length: numRows }, () =>
			Array(numColumns).fill(squareState.NOT_CHOMPED)
		);
		setChompedSquares(nextSquares);
		setPlayerOneIsNext(true);
	}

	function openHelpDialog() {
		setHelpDialogOpen(true);
	}

	function closeHelpDialog() {
		setHelpDialogOpen(false);
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
		<React.Fragment>
			<HelpDialog isOpen={isHelpDialogOpen} onClose={closeHelpDialog} />
			<h1>Chomp!</h1>
			<ol id="chomp-rules">
				<li>
					Take turns "chomping" a square of chocolate from the bar
				</li>
				<li>
					With each chomp, all squares below and to the right are also
					eaten
				</li>
				<li>
					The goal is to avoid the "poison" square marked with{" "}
					<i className="fa-solid fa-skull-crossbones fa-s"></i>.
				</li>
				<li>
					If your opponent chomps the poison square, you win!
					Otherwise... it's game over for you.
				</li>
			</ol>
			<div
				id="nextTurnIndicator"
				className={"player" + (playerOneIsNext ? "-one" : "-two")}
			>
				Player {playerOneIsNext ? "1" : "2"}
				{isGameOver(chompedSquares) ? " wins!" : "'s turn"}
			</div>
			{isGameOver(chompedSquares) && (
				<React.Fragment>
					<button onClick={replayGame}>
						<i class="fa-solid fa-rotate-left"></i>
						&nbsp;&nbsp;Replay
					</button>
					<button onClick={newGame}>
						<i class="fa-solid fa-shuffle"></i>&nbsp;&nbsp;New Game
					</button>
				</React.Fragment>
			)}
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

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
