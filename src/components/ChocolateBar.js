import React from "react";
import Square from "./Square";

export default function ChocolateBar({
	chompedSquares,
	isPlayerOneNext,
	onChomp,
	onHoverChange,
}) {
	let chocolateBar = chompedSquares.map((row, i) => (
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
							onChomp(i, j);
						}}
						onSquareHoverChange={onHoverChange}
						key={(i + 1) * 10 + (j + 1)}
					></Square>
				);
			})}
		</div>
	));
	return chocolateBar;
}
