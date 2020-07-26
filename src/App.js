import React, { useState, useEffect, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Landing from './components/Landing.js';
import Nav from './components/Nav.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';

const App = () => {

  // state
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(true)
  const [scorecards, setScorecards] = useState([])

  //fetch user and their scorecard on after app render
  useEffect(() => {
    // this is only executed once
    fetch('http://localhost:3000/api/v1/users/1')
      .then(resp => resp.json())
      .then(user => getUser(user))
  }, [])

  // add user (w/out scorecards) to state
  const getUser = (user) => {
    let scorecards = user.scorecards
    getScorecards(scorecards)

    // remove scorecards from user before updating state
    setUser({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email
    })
  }

  // add user's scorecards to state
  const getScorecards = (scorecards) => {
    setScorecards(scorecards)
  }

  console.log(user, scorecards)

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
