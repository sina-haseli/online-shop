import * as CONSTANTS from "./Constants";
import {SET_CURRENT_USER} from "./Constants";
import isEmpty from '../Validation/Is-empty';
import {SET_LOGGED_IN_USER,TOGGLE_MENU} from "./Constants";


/*
 * In this app we tend to store that part of application state in Redux, which can be needed
 * by mulitple components.
 */
const initialState = {
    showMenu:true,
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
                _isAuthenticated:isEmpty(action.payload),
                loggedInUser: action.payload
            };

        case    TOGGLE_MENU:
            return{
                ...state,
                showMenu: !state.showMenu
            };

        default:
            return state;
    }
};

export default rootReducer;
