import React from 'react';
import { render } from 'react-dom';
import { ContextProvider } from "./globalState/state"

import {
  BrowserRouter as Router,
} from 'react-router-dom'

import App from './components/App/App';

import './styles/styles.scss';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4caf50',
      contrastText: '#fff'
    },
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
});

render((
  <Router>
    <MuiThemeProvider theme={theme}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </MuiThemeProvider>
  </Router>
), document.getElementById('app'));
