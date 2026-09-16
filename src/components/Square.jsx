import React from "react";
import { squareState } from "../constants.js";

export default function Square({
	row,
	col,
	state,
	isPoison,
	onSquareClick,
	onSquareHoverChange,
	touchStarted = false,
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
			onTouchStart={() => {
				touchStarted = true;
				onSquareHoverChange(row, col, true);
			}}
			onTouchEnd={() => {
				onSquareClick();
				touchStarted = false;
				// document.removeEventListener("touchstart");
				// setTimeout(() => {
				// 	document.addEventListener("touchstart");
				// }, 1000);
			}}
			onTouchCancel={(event) => {
				if (touchStarted) {
					onSquareHoverChange(row, col, false);
					// Cancel the initial touchstart behavior
					event.preventDefault();
					event.stopPropagation();

					// Reset the flag
					touchStarted = false;
				}
			}}
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
