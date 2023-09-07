import React from "react";

import { useState } from "react";

export default function Board() {
	const rows = 4;
	const columns = 5;
	let boardTemplate = Array(rows).fill(Array(columns).fill(false));
	let board = boardTemplate.map((row) => (
		<div className="board-row">
			{row.map((square) => (
				<Square isChomped={false} />
			))}
		</div>
	));
	return board;
}

function Square({ isChomped }) {
	return (
		<div className={"square " + (isChomped ? "chomped" : "notChomped")}>
			Hi
		</div>
	);
}
