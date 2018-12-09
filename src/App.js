import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Login from "./Components/Login/Login"



class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-body">
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
