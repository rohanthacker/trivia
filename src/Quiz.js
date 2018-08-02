import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStateHandlers, withHandlers } from "recompose";
import { firestoreConnect, getVal } from "react-redux-firebase";

class Quiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
	}

	handelSelect = selectedIndex => {
		this.setState({ selectedIndex: selectedIndex });
	};

	handelSubmit = () => {
		this.state.selectedIndex === this.state.question.correctOptionIndex
			? this.setState({ score: this.state.score + 10 })
			: this.setState({ score: this.state.score - 10 });
	};

	renderOptions = () => {
		return this.state.question.options.map((option, index) => (
			<button onClick={() => this.handelSelect(index)}>{option}</button>
		));
	};
	render() {
		return (
			<section className="game">
				<section className="quiz">
					<h1>{this.state.question.question}</h1>
					<div className="options">{this.renderOptions()}</div>
					<button className="is-danger" onClick={() => this.handelSubmit()}>
						Submit
					</button>
				</section>
			</section>
		);
	}
}

export default compose(
	firestoreConnect(["games"]),
	connect(state => {
		return { game: state.firestore.data.games };
	})
)(Quiz);
