import * as CONSTANTS from "./Constants";

/*
 * In this app we tend to store that part of application state in Redux, which can be needed
 * by mulitple components.
 */
const initialState = {
    loggedInUser: null,

};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {


        case CONSTANTS.SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.payload };

        default:
            return state;
    }
};

export default rootReducer;
