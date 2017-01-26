import React, { Component } from 'react';
import { Button, ButtonToolbar, PageHeader, Nav, Navbar, NavItem } from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <PageHeader>Welcome to FoodDev!</PageHeader>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Menu</NavItem>
            <NavItem eventKey={2} href="#">Users</NavItem>
          </Nav>
        </Navbar>
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="large">Large button</Button>
          <Button bsSize="large">Large button</Button>
        </ButtonToolbar>
      </div>
    );
  }
}
export default App;
