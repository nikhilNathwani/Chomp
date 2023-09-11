import React from "react";
import { squareState } from "../constants.js";

export default function Square({
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
