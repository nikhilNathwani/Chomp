import React from "react";

export default function Rules() {
	return (
		<div id="rules">
			<h2>How to play:</h2>
			<ol id="chomp-rules">
				<li>Take turns "chomping" a square from the chocolate bar</li>
				<li>
					With each chomp, all squares below and to the right are also
					eaten
				</li>
				<li>
					The goal is to avoid the "poison" square marked with{" "}
					<i className="fa-solid fa-skull-crossbones fa-s"></i>
				</li>
				<li>If your opponent chomps it, you win! Else... you lose!</li>
			</ol>
		</div>
	);
}
