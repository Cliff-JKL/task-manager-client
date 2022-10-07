import React from 'react';
import {
  BrowserRouter, Route, Routes, Link,
} from 'react-router-dom';

import Header from './components/Header';
import Tasks from './pages/Tasks';
import Login from './pages/Login';

// import styles from './App.scss';

const App = () => {
  return (
    <>
      <header>
        <Header />
      </header>
        <Routes>
          <Route path="/" element={<p>Get Started!</p>}/>
          <Route path="/users" element={<p>Users!</p>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/login" element={<Login isLoggedIn />}/>
          <Route path="/register" element={<Login isLoggedIn={false}/>}/>
        </Routes>
      <footer />
    </>
  );
}

export default App;