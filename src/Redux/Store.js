import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Reducer";
import thunk from 'redux-thunk';

const initialState= {};

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));


export default store;