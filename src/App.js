import React from "react";
import { useState } from "react";

//Current goal: put chomped/unchomped state in a Board state var

const numRows = 4;
const numColumns = 5;

export default function Board() {
	const [chompedSquares, setChompedSquares] = useState(
		Array.from({ length: numRows }, () => Array(numColumns).fill(false))
	);

	function handleChomp(row, col) {
		let nextChompedSquares = chompedSquares.slice();
		for (let i = row; i < numRows; i++) {
			for (let j = col; j < numColumns; j++) {
				nextChompedSquares[i][j] = true;
			}
		}
		setChompedSquares(nextChompedSquares);
	}

	let board = chompedSquares.map((row, i) => (
		<div className="board-row" key={i}>
			{row.map((isChomped, j) => {
				return (
					<Square
						row={i}
						col={j}
						isChomped={isChomped}
						isPoison={i + j === 0}
						onChomp={() => {
							// console.log(`Clicked square at row ${i + 1}, column ${j + 1}`);
							handleChomp(i, j);
						}}
						key={(i + 1) * 10 + (j + 1)}
					></Square>
				);
			})}
		</div>
	));
	return board;
}

function Square({ row, col, isChomped, isPoison, onChomp }) {
	// function handleClick() {
	// 	console.log(`Clicked square at row ${row + 1}, column ${col + 1}`);
	// }
	return (
		<div
			className={"square " + (isChomped ? "chomped" : "notChomped")}
			onClick={onChomp}
		>
			{isPoison && (
				<i className="fa-solid fa-skull-crossbones fa-2xl"></i>
			)}
		</div>
	);
}
// <i class="fa-solid fa-skull-crossbones"></i>
