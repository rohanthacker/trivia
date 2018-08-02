import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStateHandlers, withHandlers } from "recompose";
import { firestoreConnect, getVal } from "react-redux-firebase";
import { withRouter } from "react-router-dom";

class NewGame extends Component {
	handleClick = () => {
		this.props.createRoom().then(doc => {
			this.props.history.push(`/game/${doc.id}`);
		});
	};
	render() {
		return (
			<div>
				<div>
					<p>Category</p>
					<select />
				</div>
				<div>
					<p>Questions</p>
					<select />
				</div>
				<div>
					<p>Timer</p>
					<select />
				</div>
				<button onClick={() => this.handleClick()}>Create Game</button>
			</div>
		);
	}
}

export default compose(
	firestoreConnect(["games"]),
	withHandlers({
		createRoom: props => () => {
			return new Promise(function(resolve, reject) {
				props.firestore
					.add({ collection: "games" }, { isActive: true })
					.then(doc => {
						resolve(doc);
					})
					.catch(err => {
						reject(err);
					});
			});
		}
	})
)(NewGame);
