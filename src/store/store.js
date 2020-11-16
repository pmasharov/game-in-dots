import { combineReducers, createStore, /*applyMiddleware*/ } from "redux";
// import thunk from 'redux-thunk'
import { reducers } from "./reducers";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers(reducers),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const { dispatch, getState } = store;

export { dispatch, getState, store };
