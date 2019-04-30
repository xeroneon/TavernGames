import React, { Component } from 'react';
import 'whatwg-fetch';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: []
    };


  }

  componentDidMount() {
console.log(this.props.router)
  }



  render() {
    return (
      <>

      </>
    );
  }
}

export default Home;
