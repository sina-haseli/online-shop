import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducer";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const initialState= {};

const store = createStore (rootReducer,
    initialState,composeEnhancers(
    applyMiddleware(thunk)
));



export default store;


