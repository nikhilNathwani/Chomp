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

function Square({ isChomped, isPoison }) {
	return (
		<div className={"square " + (isChomped ? "chomped" : "notChomped")}>
			{isPoison && <i class="fa-solid fa-skull-crossbones fa-2xl"></i>}
		</div>
	);
}
// <i class="fa-solid fa-skull-crossbones"></i>
