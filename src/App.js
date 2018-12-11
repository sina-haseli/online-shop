import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import { Switch, Route } from 'react-router-dom'
import Login from "./Components/Login/Login"
import {login, getProducts} from './Redux/Actions' // in rah e dorost e action nist, valy kirete


class App extends Component {
  render() {
    login('sina', 'password')
    //   getProducts()
    return (
      <div className="app">

        <div className="app-body">
            <Header/>
          <div className="content">
            <Switch>

              <Route path='/about' render={() => <div>About us</div>} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
 
export default App;
