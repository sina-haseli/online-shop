import * as CONSTANTS from  "./Constants";
import Axios from 'axios';
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
export function login(username, password) {
    return axios.post('/login', { username, password })
        //.then(({data}) => {
        .then(res=>{
            console.log(res.data);
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            //return data.token // JWT token
            // osolesh ine ke toye db e browser set esh koni ino
            // aval token check koni age bod login nakoni
            // age nabod login koni
        })
        .catch(err => {
            console.log('AUTH FAILED', err)
           /* dispatch({
               type: GET_ERRORS,
               payload: err.response.data
            }); */
            // action failure
        })
}

// action seda zade mishe
// khode in action 2 ta action dg ersal momkene bokone
// bara balee ham hamine
/*export function getProducts() {
    return axios.get('/products')
        .then(({data}) => {
            console.log(data); // array az product hast

            // action e success ba data e in
            // ke on action state ro update mikone products: [] <
            return data
        })
        .catch(err => {}) // action e failure
}
*/

export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload:decoded
    }
};

export const setLoggedInUser = (user) => ({ type:  CONSTANTS.SET_LOGGED_IN_USER, payload: user });
export const toggleMenu = () => ({ type:  CONSTANTS.TOGGLE_MENU, payload: null });
export const showCartDlg = status => ({ type:  CONSTANTS.SHOW_CART_DLG, payload: status });
