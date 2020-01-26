import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';


import logo from './logo.svg';

import './App.css';

import Games from './games/Games';
import UsersListHooks from './component-hooks/UsersListHook';
import UsersList from './component-class/UsersList';
import DemandSupply from './demand-supply/demand-supply';
import Nav from './nav/nav';
import reducer from "./reducer";
import { createStore } from 'redux'
import {Provider} from "react-redux";
import InputPhone from "./phone-component/phones-list"

var store = createStore(reducer);
 
store.dispatch({
  type: "SET_STATE",
  state: {
    phones: [ "iPhone 7 Plus", "Samsung Galaxy A5" ]
  }
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="app-logo" alt="logo" />
          <div id='root-home'></div>
        </header>
        <Router>
          <Nav/>
          <main>
            <Switch>
              <Route exact path='/' >
                <h1>
                  Home Page
                </h1>
              </Route>
              <Route path='/games'>
                <h1>
                  Page Game
                </h1>
                <Games/>
              </Route>
              <Route path='/hooks-user-list'>
                <h1>
                  Hooks
                </h1>
                <UsersListHooks/>
              </Route>
              <Route path='/class-user-list'>
                <h1>
                  Class User List
                </h1>
                <UsersList/>
              </Route>
              <Route path='/demand-supply'>
                <h1>
                  DemandSupply
                </h1>
                <DemandSupply/>
              </Route>
              <Router path='/phone-component'>
                  <InputPhone/>
              </Router>
              <Route path='*'>
                <h1>
                  404
                </h1>
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </Provider>
      
  );
}

export default App;
