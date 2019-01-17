import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav'

import { createMuiTheme } from '@material-ui/core/styles';
createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const App = ({ children }) => (
  <>
  <Nav />
    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
