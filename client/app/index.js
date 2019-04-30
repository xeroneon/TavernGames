import React from 'react';
import { render } from 'react-dom';
import { ContextProvider } from "./globalState/state"

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
import Admin from './components/Admin/Admin';

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
});

render((
  <Router>
    <MuiThemeProvider theme={theme}>
      <ContextProvider>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/deckbuilder" component={DeckBuilder} />
            <Route exact path="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </ContextProvider>
    </MuiThemeProvider>
  </Router>
), document.getElementById('app'));
