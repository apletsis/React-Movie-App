import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
