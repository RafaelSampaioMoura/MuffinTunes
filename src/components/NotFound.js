import React, { Component } from 'react';
import Header from './Header';

class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-not-found">NotFound</div>
      </>
    );
  }
}

export default NotFound;
