import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Landing from './components/Landing.js';
import Nav from './components/Nav.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Profile from './components/Profile.js';
import Scorecard from './components/Scorecard';

const App = () => {

  // state
  const [user, setUser] = useState({})
  // const [loggedIn, setLoggedIn] = useState(true)
  const [loggedIn] = useState(true)
  const [scorecards, setScorecards] = useState([])
  const [scorecardToEdit, setScorecardToEdit] = useState('')

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

  // function (passed down to scorecard) to add new scorecard to state
  const updateScorecards = (scorecard) => {
    setScorecards([
      ...scorecards,
      scorecard
    ])
  }

  // function (passed down to scorecard) to replace scorecard in state
  const editUpdateScorecard = (scorecardObj) => {
    // console.log(scorecardObj)
    // const scorecardID = scorecardObj.id
    // let scorecardsArr = scorecards
    // scorecardsArr.forEach(function(scorecard, i) { if (scorecard.id === scorecardID) scorecard[i] = scorecardObj })
    // setScorecards(scorecardsArr)
    const scorecardID = scorecardObj.id
    let scorecardsArr = scorecards
    scorecardsArr.forEach(function(scorecard, i) { if (scorecard.id === scorecardID) scorecardsArr[i] = scorecardObj })
    setScorecards(scorecardsArr)
  }

  // function (passed down to profile -> Scorecard overview) to delete corresponding scorecard from state
  const deleteScorecard = (scorecardID) => {
    const updatedScorecards = scorecards.filter(item => item.id !== scorecardID)
    setScorecards(updatedScorecards)
  }

  // function (passed down to profile -> scorecard overview) that gets scorecard id and set it in state
  const updateEditScorecard = (scorecardID) => {
    setScorecardToEdit(scorecardID)
  }

  return (
    <div className="container">

      {
        loggedIn ? <Nav loggedIn={loggedIn} /> : null
      }

      <Switch>

        <Route path="/profile" render={() => <Profile 
          firstName={user.firstName} 
          userScorecards={scorecards}
          deleteScorecardFunc={deleteScorecard}
          updateEditScorecardFunc={updateEditScorecard}
          userID={user.id}
        />} />

        <Route path="/scorecard/edit" render={() => <Scorecard
          userID={user.id}
          scorecardID={scorecardToEdit}
          scorecardEditFunc={editUpdateScorecard}
        /> } />

        <Route path="/scorecard/new" render={() => <Scorecard 
          userID={user.id} 
          updateScorecardsFunc={updateScorecards}
        />} />

        <Route path="/login" render={() => <Login />} />

        <Route path="/signup" render={() => <Signup />} />

        <Route path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
