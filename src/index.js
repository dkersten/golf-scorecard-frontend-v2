import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="ezgolfscore.us.auth0.com"
    clientId="86iZhO04pLKgDbjkhfPxxF4Rmo1ktxLf"
    redirectUri={`http://localhost:3001/callback`}
    audience="https://ezgolfscore.us.auth0.com/api/v2/"
    scope="openid profile email"
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
