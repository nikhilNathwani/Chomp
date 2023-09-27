import React from "react";
import { initialColumns, initialRows } from "./constants";
import Header from "./components/Header";
import Game from "./components/Game";
import Rules from "./components/Rules";

export default function App() {
	return (
		<React.Fragment>
			<Header></Header>
			<Game numRows={initialRows} numColumns={initialColumns}></Game>
			<Rules></Rules>
		</React.Fragment>
	);
}
