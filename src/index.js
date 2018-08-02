import firebase from "firebase/app";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import "./index.css";
import BaseApp from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./GameRoom";
const firebaseConfig = {
	apiKey: "AIzaSyClOMud8MkK8SZnsf40KK1rQKKg7tUNDLc",
	projectId: "trivia-3fe7a"
};

const rrfConfig = {
	userProfile: "users",
	database: ""
	// useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig),
	reduxFirestore(firebase), // <- needed if using firestore
	typeof window === "object" && typeof window.devToolsExtension !== "undefined"
		? window.devToolsExtension()
		: f => f
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

// Setup react-redux so that connect HOC can be used
const App = () => (
	<Provider store={store}>
		<BaseApp />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
