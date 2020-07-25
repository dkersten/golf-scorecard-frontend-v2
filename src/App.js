import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Landing from './components/Landing.js';
import Nav from './components/Nav.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';

const App = () => {

  const [user, setUser] = useState('Dan')
  const [loggedIn, setLoggedIn] = useState(true)

  console.log(user)
  const updateUser = () => {
    setUser('Liz')
  }
  
  console.log(user)
  return (
    <div className="container">

      {
        loggedIn ? <Nav loggedIn={loggedIn} /> : null
      }

      <Switch>

        <Route path="/login" render={() => <Login />} />

        <Route path="/signup" render={() => <Signup />} />

        <Route path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
