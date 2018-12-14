import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducer";
import thunk from 'redux-thunk';

const initialState= {};

const store = createStore (rootReducer,
    initialState,
    applyMiddleware(thunk));



export default store;


