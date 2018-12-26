import * as CONSTANTS from  "./Constants";
import Axios, {CancelTokenSource as data} from 'axios';
import {applyMiddleware as dispatch} from "redux";
import {GET_ERRORS, SET_CURRENT_USER} from "./Constants";
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';



const axios = Axios.create({
    baseURL: CONSTANTS.BASE_URL,
    timeout: 1000,
    headers: {'x-access-token': ' localStorage '  }
});

// in action async hast
// bara hamin bayad aval redux thunk piade sazi koni
// ke bad az in state user set koni
// valy alan ino ejra migiram ke API call ro bebini
export const login = (user) => dispatch => {
    axios.post('v1/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            console.log(token);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.status
            });
        });
};

// action seda zade mishe
// khode in action 2 ta action dg ersal momkene bokone
// bara balee ham hamine
export const getProducts = () => dispatch =>  {
    return axios.get('https://api.parand-computer.ir/v1/products')
        .then(({data}) => {
            console.log(data); // array az product hast

            // action e success ba data e in
            // ke on action state ro update mikone products: [] <
            return data
        })
        .catch(err =>  {
            dispatch(
                {
                    type: GET_ERRORS,
                    payload: err.status
                })
        }) // action e failure
};


export const registerUser = (user, history) => dispatch => {
    axios.post('https://api.parand-computer.ir/v1/users', user)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload:decoded
    }
};

/*export const setLoggedOutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}
*/

export const setLoggedInUser = (user) => ({ type:  CONSTANTS.SET_LOGGED_IN_USER, payload: user });
export const toggleMenu = () => ({ type:  CONSTANTS.TOGGLE_MENU, payload: null });
export const showCartDlg = status => ({ type:  CONSTANTS.SHOW_CART_DLG, payload: status });
export const addItemInCart = item => ({ type:  CONSTANTS.ADD_ITEM_IN_CART, payload: item });
export const setCheckedOutItems = (items) => ({ type:  CONSTANTS.SET_CHECKEDOUT_ITEMS, payload: items });
export const deleteCartItem = id => ({ type:  CONSTANTS.DELETE_CART_ITEM, payload: id });
export const updateCartItemQnt = (obj) => ({ type:  CONSTANTS.UPDATE_CART_ITEM_QUANTITY, payload: obj });