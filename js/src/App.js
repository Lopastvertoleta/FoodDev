import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
        <ButtonGroup>
          <Button bsStyle="primary" bsSize="large">Large button</Button>
          <Button bsSize="large">Large button</Button>
        </ButtonGroup>
      </div>
    );
  }
}
export default App;
