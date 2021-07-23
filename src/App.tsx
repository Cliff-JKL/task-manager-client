import React from 'react';
import {
  BrowserRouter, Route, Switch, Link,
} from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import Header from './components/Header';
import Tasks from './pages/Tasks';
import Login from './pages/Login';

// import styles from './App.scss';

const App = () => (
  <>
    <header>
      <Header />
    </header>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <p>Get Started!</p>
        </Route>
        <Route path="/users">
          <p>Users!</p>
        </Route>
        <Route path="/tasks">
          <Tasks />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <p>Register!</p>
        </Route>
      </Switch>
    </BrowserRouter>
    <footer />
  </>
);

export default hot(App);
