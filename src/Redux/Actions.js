import * as CONSTANTS from  "./Constants";


export const setLoggedInUser = (user) => ({ type:  CONSTANTS.SET_LOGGED_IN_USER, payload: user });
