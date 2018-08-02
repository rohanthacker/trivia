import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameRoom from "./GameRoom.js";
import NewGame from "./NewGame.js";

const BasicExample = () => (
	<Router>
		<div className="App">
			<Route exact path="/" component={Home} />
			<Route path="/new-game" component={NewGame} />
			<Route path="/game/:id" component={GameRoom} />
		</div>
	</Router>
);

const Home = () => (
	<div>
		<Link to="/new-game">New Game</Link>
	</div>
);

export default BasicExample;
