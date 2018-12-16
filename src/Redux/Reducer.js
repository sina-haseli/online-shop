import * as CONSTANTS from "./Constants";
import {SET_CURRENT_USER} from "./Constants";
import isEmpty from '../Validation/Is-empty';
import {SET_LOGGED_IN_USER} from "./Constants";


/*
 * In this app we tend to store that part of application state in Redux, which can be needed
 * by mulitple components.
 */
const initialState = {
    loggedInUser: null,
    isAuthenticated: false,
    user: {}

};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {


       /* case CONSTANTS.SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.payload };*/

        case SET_CURRENT_USER:
            return {
                ...state,
                _isAuthenticated:isEmpty(action.payload),
                user:action.payload
            };

        case    SET_LOGGED_IN_USER:
            return{
                ...state,
                loggedInUser: action.payload
            };

        default:
            return state;
    }
};

export default rootReducer;
