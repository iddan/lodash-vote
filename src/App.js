import React, { Component } from 'react';
import Proposals from './Proposals';
import './App.css';

const { REACT_APP_GITHUB_CLIENT_ID } = process.env;

class App extends Component {

  state = {};

  login = () => {
    const url = new URL('http://github.com/login/oauth/authorize');
    url.searchParams.set('client_id', REACT_APP_GITHUB_CLIENT_ID);
    url.searchParams.set('redirect_uri', window.location.href);
    url.searchParams.set('scope', '');
    url.searchParams.set('state', Math.random());
    window.location.replace(url);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Loadsh Vote</h1>
          <h2>Vote and keep track lodash proposals</h2>
        </header>
        <button onClick={ this.login }>login</button>
        <Proposals />
      </div>
    );
  }
}

export default App;
