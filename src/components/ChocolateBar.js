import React from "react";
import Square from "./Square";

export default function ChocolateBar({
	chompedSquares,
	isPlayerOneNext,
	isGameOver,
	onChomp,
	onHoverChange,
	onReplayGame,
	onNewGame,
}) {
	let chocolateBar = chompedSquares.map((row, i) => (
		<div
			className={"board-row player-" + (isPlayerOneNext ? "one" : "two")}
			key={i}
		>
			{isGameOver && (
				<div id="nextGameButtons">
					<button
						onClick={() => {
							onReplayGame();
							resetSquares();
						}}
					>
						<i class="fa-solid fa-rotate-left"></i>
						&nbsp;&nbsp;Replay
					</button>
					<button
						onClick={() => {
							onNewGame();
							resetSquares();
						}}
					>
						<i class="fa-solid fa-shuffle"></i>
						&nbsp;&nbsp;Random
					</button>
				</div>
			)}
			{row.map((squareState, j) => {
				return (
					<Square
						row={i}
						col={j}
						state={squareState}
						isPoison={i + j === 0}
						onSquareClick={() => {
							onChomp(i, j);
						}}
						onSquareHoverChange={onHoverChange}
						key={(i + 1) * 10 + (j + 1)}
					></Square>
				);
			})}
		</div>
	));
	return <div id="board">{chocolateBar}</div>;
}

function resetSquares() {
	document.querySelectorAll(".square").forEach((element) => {
		element.classList.add("reset-hover");
	});
}
