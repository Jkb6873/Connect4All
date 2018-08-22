import React, { Component } from 'react';
import './App.css';
import Connect4 from './components/connect4.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connect 4 All</h1>
        </header>
       <Connect4 />
      </div>
    );
  }
}

export default App;
