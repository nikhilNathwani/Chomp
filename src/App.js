import React from "react";
import { useState } from "react";

//Current goal:
//- Declare winner
//- Consider UI showing "Player 1" left-aligned & "Player 2" right-aligned, then toggle the color on/off (and maybe the text) to indicate whose turn it is

const numRows = 4;
const numColumns = 5;
const squareState = {
	NOT_CHOMPED: 0,
	CHOMPED: 1,
	BLAST_ZONE: 2,
};

export default function Level() {
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
				<li>It's you (Player 1) vs. the computer (Player 2).</li>

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
			<Board
				chompedSquares={chompedSquares}
				isPlayerOneNext={playerOneIsNext}
				onChomp={handleChomp}
				onHoverChange={handleHoverChange}
			></Board>
		</React.Fragment>
	);
}

function Board({ chompedSquares, isPlayerOneNext, onChomp, onHoverChange }) {
	let board = chompedSquares.map((row, i) => (
		<div
			className={"board-row player-" + (isPlayerOneNext ? "one" : "two")}
			key={i}
		>
			{row.map((squareState, j) => {
				return (
					<Square
						row={i}
						col={j}
						state={squareState}
						isPoison={i + j === 0}
						onSquareClick={() => {
							// console.log(`Clicked square at row ${i + 1}, column ${j + 1}`);
							onChomp(i, j);
						}}
						onSquareHoverChange={onHoverChange}
						key={(i + 1) * 10 + (j + 1)}
					></Square>
				);
			})}
		</div>
	));
	return board;
}

function Square({
	row,
	col,
	state,
	isPoison,
	onSquareClick,
	onSquareHoverChange,
}) {
	return (
		<div
			className={
				"square " +
				(state === squareState.CHOMPED
					? "chomped"
					: state === squareState.BLAST_ZONE
					? "not-chomped blast-zone"
					: "not-chomped")
			}
			onClick={onSquareClick}
			onMouseEnter={() => {
				onSquareHoverChange(row, col, true);
			}}
			onMouseLeave={() => {
				onSquareHoverChange(row, col, false);
			}}
		>
			{isPoison && (
				<i className="fa-solid fa-skull-crossbones fa-2xl"></i>
			)}
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
