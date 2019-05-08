import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import Header from './Header';
import Main from './Main';
import './App.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      <div className="App">
        <DevTools />
        <Header />
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
