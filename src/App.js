import React from "react";

import { useState } from "react";

export default function Board() {
	const rows = 4;
	const columns = 5;
	let boardTemplate = Array(4).fill(Array(5).fill(false));
	let board = boardTemplate.map((row) => (
		<div className="board-row">
			{row.map((square) => (
				<Square />
			))}
		</div>
	));
	return board;
}

function Square() {
	const isChomped = false;
	return (
		<div className={"square " + (isChomped ? "chomped" : "notChomped")}>
			Hi
		</div>
	);
}
