import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav'

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
