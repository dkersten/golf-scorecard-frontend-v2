import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Landing from './components/Landing.js';

const App = () => {

  const [user, setUser] = useState('Dan')
  console.log(user)
  const updateUser = () => {
    setUser('Liz')
  }
  
  console.log(user)
  return (
    <div className="container">
      <h1 className="test">E-Z Golf</h1>
      <Switch>
        <Route path="/" component={Landing} />
      </Switch>
    </div>
  );
}

export default App;
