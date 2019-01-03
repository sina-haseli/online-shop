import * as CONSTANTS from "./Constants";
import {SET_CURRENT_USER} from "./Constants";
import isEmpty from '../Validation/Is-empty';
import {SET_LOGGED_IN_USER,TOGGLE_MENU} from "./Constants";


/*
 * In this app we tend to store that part of application state in Redux, which can be needed
 * by mulitple components.
 */
const initialState = {
    cartItems: [],
    showCartDialog: false,
    checkedOutItems: [],
    showMenu:true,
    loggedInUser: null,
    isAuthenticated: false,
    user: {},
    size: 0,

};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {

        case CONSTANTS.ADD_ITEM_IN_CART: {
            state.cartItems = state.cartItems || [];
            state.size = state.cartItems.length || 0;
            // User wants to add item in cart, let's first find if such item is already in cart.
            let index = state.cartItems.findIndex(x => x._id === action.payload._id);

            if (index !== -1) {

                // Item is there, let's just increase its quantity
                let cloneCartItems = [...state.cartItems];
                cloneCartItems[index] = {
                    ...cloneCartItems[index],
                    quantity: state.cartItems[index].quantity + 1
                };

                return { ...state, cartItems: cloneCartItems }
            }

            // Item is not there, add a new item.
            return { ...state, cartItems: state.cartItems.concat(action.payload) }

        }

        case CONSTANTS.UPDATE_CART_ITEM_QUANTITY: {
            let index = state.cartItems.findIndex(x => x._id === action.payload._id);

            /* Update quantity of certain item in cart */
            if (index !== -1) {
                let cloneCartItems = [...state.cartItems];
                cloneCartItems[index] = {
                    ...cloneCartItems[index],
                    quantity: action.payload.quantity
                };

                return { ...state, cartItems: cloneCartItems }
            }

            return state;
        }

        case CONSTANTS.SHOW_CART_DLG:
            return { ...state, showCartDialog: action.payload };

        case CONSTANTS.DELETE_CART_ITEM:
            console.log('>>>> pl', action.payload)
            console.log('>>> items', state.cartItems)
            return { ...state, cartItems: state.cartItems.filter(item => item._id !== action.payload) };
        case CONSTANTS.SET_CHECKEDOUT_ITEMS:
            return { ...state, checkedOutItems: action.payload };

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
