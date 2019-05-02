import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
class App extends Component {

  constructor() {
    super();
    console.log(window.opener);
    this.state = { user: null };
    var config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user =>
      this.setState({ user }));
  }

  async login() {
    let response = await fetch("http://localhost:81/login", {
      body:
        JSON.stringify({ username: "user@example.com", password: "test123", project: "megadw" }),
      headers: { 'content-type': 'application/json' },
      method: "POST"
    });
    let token = await response.json()
    window.opener.postMessage(token, '*');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.user ? this.state.user.uid : null}
        </p>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default App;
