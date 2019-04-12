import React, { Component } from 'react';
import MovieApp from './modules/movie-app/movie-app.container';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieApp />
      </div>
    );
  }
}

export default App;
