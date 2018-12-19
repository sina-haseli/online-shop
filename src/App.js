import React, { Component } from 'react';
import './App.css';
import Menu from './Components/Menu/Menu';
import Header from './Components/Header/Header';
import { Switch, Route } from 'react-router-dom'
import Login from "./Components/Login/Login"
import {login, getProducts} from './Redux/Actions'
import Register from "./Components/Register/Register"; // in rah e dorost e action nist, valy kirete


class App extends Component {
  render() {
    login('sina', 'password')
    //   getProducts()
    return (
      <div className="app">
          <Header/>
        <div className="app-body">
          <Menu/>
            <div className="content">
              <Switch>
                <Route path='/about' render={() => <div>About us</div>} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register}/>
              </Switch>
            </div>
          </div>
      </div>
    );
  }
}
 
export default App;
