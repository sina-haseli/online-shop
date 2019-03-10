import React, { Component } from 'react';
import './App.css';
import Menu from './Components/Menu/Menu';
import Header from './Components/Header/Header';
import { Switch, Route } from 'react-router-dom'
import CartDialog from "./Components/CartDialog/CartDialog";
import Order from "./Components/Order/Order"
//import Order from "./Components/Order/Order"
import Login from "./Components/Login/Login"
import {login, getProducts} from './Redux/Actions'
import Register from "./Components/Register/Register";
import ProductList from "./Components/ProductList/ProductList"; 
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"

class App extends Component {
  render() {
    login('sina', 'password');
      getProducts();
    return (
      <div className="app">
          <Header/>
        <div className="app-body">
          <Menu/>
            <div className="content">
              <CartDialog/>
                <Switch>
                  <Route path='/search/' component={ProductList}/>
                  <Route exact path="/" component={ProductList} />
                  <Route path='/about' render={() => <div>About us</div>} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register}/>
                  <ProtectedRoute path='/order' component={Order} />
                </Switch>
            </div>
          </div>
      </div>
    );
  }
}
 
export default App;
