import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';
import DeckBuilder from './components/DeckBuilder/DeckBuilder';

import './styles/styles.scss';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4caf50',
      contrastText: '#fff'
    },
    type: 'dark',
  }
  // overrides: {
  //   MuiSnackbar: { // Name of the component ⚛️ / style sheet
  //     bodyStyle: { // Name of the rule
  //       background: 'black',
  //       color: 'black' // Some CSS
  //     }
  // },
});

render((
  <Router>
    <MuiThemeProvider theme={theme}>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/deckbuilder" component={DeckBuilder} />
        <Route component={NotFound}/>
      </Switch>
    </App>
    </MuiThemeProvider>
  </Router>
), document.getElementById('app'));
