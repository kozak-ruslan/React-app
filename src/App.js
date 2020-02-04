import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import thunk from 'redux-thunk';

import logo from './logo.svg';

import './App.css';

import Games from './components/games/Games';
import UsersListHooks from './components/component-hooks/UsersListHook';
import UsersList from './components/component-class/UsersList';
import DemandSupply from './components/demand-supply/demand-supply';
import Nav from './components/nav/nav';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux";
import InputPhone from "./components/phone-component/phones-list";
import TodoComponent from "./components/todo-list/todi-component";
import rootReducer from './reducers'

var store = createStore(rootReducer, applyMiddleware(thunk));


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="app-logo" alt="logo" />
          <div id='root-home'></div>
        </header>
        <Router>
          <Nav />
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
                <Games />
              </Route>
              <Route path='/hooks-user-list'>
                <h1>
                  Hooks
                </h1>
                <UsersListHooks />
              </Route>
              <Route path='/class-user-list'>
                <h1>
                  Class User List
                </h1>
                <UsersList />
              </Route>
              <Route path='/demand-supply'>
                <h1>
                  DemandSupply
                </h1>
                <DemandSupply />
              </Route>
              <Router path='/phone-component'>
                <InputPhone />
              </Router>
              <Router path='/todo-component'>
                <TodoComponent />
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
