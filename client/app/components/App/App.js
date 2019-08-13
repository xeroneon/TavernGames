import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom'

import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import NotFound from '../App/NotFound';
import Modal from "../Modal/Modal";
import Snackbar from "../Snackbar/Snackbar"

import Home from '../Home/Home';
import DeckBuilder from '../DeckBuilder/DeckBuilder';
import DeckView from '../DeckBuilder/DeckView';
import Admin from '../Admin/Admin';
import SignUp from '../SignUp/SignUp';



const App = (props) => (
  <>
    <Nav />
    <main>
      <Switch>
        <Route exact path="/" component={Home} user="something" />
        <Route exact path="/deckbuilder" component={DeckBuilder} />
        <Route path="/deckview/:id" component={DeckView} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/signup" component={SignUp} />

        <Route component={NotFound} />
      </Switch>
      <Modal />
      <Snackbar />
    </main>
    <Footer />
  </>
);

export default App;
