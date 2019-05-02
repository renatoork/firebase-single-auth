import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(config);
var loginWindow;

class App extends Component {

  state = { user: null };

  constructor() {
    super();
    /*let token = this.getParameterByName("token", window.location.href);
    if (token) {
      firebase.auth().signInWithCustomToken(token);
    }*/
    firebase.auth().onAuthStateChanged(user =>
      this.setState({ user }));
    window.addEventListener('message', function (event) {
      if (event.data.token) {
        firebase.auth().signInWithCustomToken(event.data.token);
        loginWindow.close();
      }
    });
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  async login() {
    loginWindow = window.open("http://localhost:3000", "_blank", 'height=400,width=300');
  }

  async signOut() {
    await firebase.auth().signOut();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.user ? this.state.user.uid : null}
        <button onClick={this.login}>Login with Mega</button>
        <button onClick={this.signOut}>Sign out </button>
      </div>
    );
  }
}

export default App;
