import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStateHandlers, withHandlers } from "recompose";
import { firestoreConnect, getVal } from "react-redux-firebase";
import Quiz from "./Quiz.js";
import Timer from "./Timer.js";
import "./App.css";

class GameRoom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: {
				text: "Waiting for participants..."
			},
			question: {
				question: "Three of these animals hibernate. Which one does not?",
				options: ["Mouse", "Sloth", "Frog", "Snake"],
				correctOptionIndex: 1
			},
			timer: 10,
			selectedIndex: null,
			gameRoom: {},
			game: {
				participants: []
			}
		};
		this.handleUnload = this.handleUnload.bind(this);
	}

	componentDidMount() {
		// window.addEventListener("beforeunload", this.handleUnload);
		this.props.joinRoom();
	}

	componentWillUnmount() {
		// window.removeEventListener("beforeunload", this.props.leaveRoom);
	}

	handleUnload(evt) {
		evt.returnValue = "Hellooww";
	}

	renderWaitForParticipants = props => {
		return (
			<div>
				<p>{props.status.text}</p>
				{this.renderParticipants(props)}
			</div>
		);
	};

	renderLoading = props => {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	};

	renderParticipant = props => {
		return (
			<div>
				<p>{props.props.name}</p>
				<p>{props.props.score}</p>
			</div>
		);
	};

	renderParticipants = ({ props }) => {
		return props.game["7tjyKOhFLIDyZl6llFKp"].participants.map(participant =>
			this.renderParticipant(participant)
		);
	};

	renderRoomHeader = props => {
		return (
			<header>
				<div className="app-header" />
				<div className="game-timer" min="0" max="10" value="3" />
				<div className="game-header">
					<this.renderParticipant
						props={this.props.game["PPFzPCSyyF7srPm0Db1G"].participants[0]}
					/>
					<div>
						<p>{this.state.timer}</p>
						<p>
							<small>Time Left</small>
						</p>
					</div>
					<this.renderParticipant
						props={this.props.game["PPFzPCSyyF7srPm0Db1G"].participants[1]}
					/>
				</div>
			</header>
		);
	};

	render() {
		if (this.props.game) {
			return (
				<article className="App">
					{!this.props.game[this.props.match.params.id].isGameActive && (
						<this.renderWaitForParticipants
							props={this.props}
							status={this.state.status}
						/>
					)}
					{this.props.game[this.props.match.params.id].isGameActive && (
						<div className="App">
							<this.renderRoomHeader props={this.props} />
							<Quiz />
						</div>
					)}
					{/* <button onClick={() => this.props.leaveRoom()}>Leave Room</button> */}
				</article>
			);
		} else {
			return this.renderLoading();
		}
	}
}

export default compose(
	firestoreConnect(["games"]),
	connect((state, props) => {
		return { game: state.firestore.data.games };
	}),
	withHandlers({
		joinRoom: props => () => {
			props.firestore.update(
				{ collection: "games", doc: props.match.params.id },
				{
					participants: [
						{ name: "rohan", score: 300, isReady: true },
						{ name: "monica", score: 300, isReady: false }
					]
				}
			);
		},
		leaveRoom: props => () => {
			props.firestore.update(
				{ collection: "games", doc: props.match.params.id },
				{ participants: [{ name: "rohan" }], isGameActive: false }
			);
		},
		onPlayerReady: props => () => {
			props.firestore.update(
				{ collection: "games", doc: props.match.params.id },
				{
					participants: [
						{ name: "rohan", score: 300, isReady: true },
						{ name: "monica", score: 300, isReady: true }
					],
					isGameActive: true
				}
			);
		}
	})
)(GameRoom);

{
	/* 
				{this.props.game[this.props.match.params.id].participants.length ===
					2 && <this.renderRoomHeader />}
				{this.props.game[this.props.match.params.id].participants.length ===
					2 && <Quiz />} */
}
