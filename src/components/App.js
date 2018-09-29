import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../theme/default';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Dashboard/>
      </ThemeProvider>
    );
  }
}

export default App;
