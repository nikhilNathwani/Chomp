import React from "react";

import { useState } from "react";

export default function Board() {
	const rows = 4;
	const columns = 5;
	let boardTemplate = Array(rows).fill(Array(columns).fill(false));
	let board = boardTemplate.map((row, i) => (
		<div className="board-row" key={i}>
			{row.map((square, j) => {
				return (
					<Square
						row={i}
						col={j}
						isChomped={false}
						isPoison={i + j == 0}
						key={j}
					></Square>
				);
			})}
		</div>
	));
	return board;
}

function Square({ row, col, isChomped, isPoison }) {
	function handleClick() {
		console.log(`Clicked square at row ${row + 1}, column ${col + 1}`);
	}
	return (
		<div
			className={"square " + (isChomped ? "chomped" : "notChomped")}
			onClick={handleClick}
		>
			{isPoison && <i class="fa-solid fa-skull-crossbones fa-2xl"></i>}
		</div>
	);
}
// <i class="fa-solid fa-skull-crossbones"></i>
