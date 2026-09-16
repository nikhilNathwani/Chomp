import React from "react";

export default function NextTurnIndicator({ isPlayerOneNext, isGameOver }) {
	return (
		<div
			id="nextTurnIndicator"
			className={"player" + (isPlayerOneNext ? "-one" : "-two")}
		>
			Player {isPlayerOneNext ? "1" : "2"}
			{isGameOver ? " wins!" : "'s turn"}
		</div>
	);
}
