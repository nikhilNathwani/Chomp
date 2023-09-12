import React from "react";

const HelpDialog = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div id="helpDialog" className="modal-dialog">
			<div className="help-content">
				<h2>How to play:</h2>
				<ol id="chomp-rules">
					{/* <li>
						It's you (Player 1) vs. the computer (Player 2) (tbd..
						for now you control both players).
					</li> */}
					<li>
						Take turns "chomping" a square of chocolate from the bar
					</li>
					<li>
						With each chomp, all squares below and to the right are
						also eaten
					</li>
					<li>
						The goal is to avoid the "poison" square marked with{" "}
						<i className="fa-solid fa-skull-crossbones fa-s"></i>.
						If your opponent chomps it, you win!
					</li>
				</ol>
				<button className="close-button" onClick={onClose}>
					Play!
				</button>
			</div>
		</div>
	);
};

export default HelpDialog;
