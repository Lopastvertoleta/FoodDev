import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ButtonToolbar, PageHeader, Nav, Navbar, NavItem } from 'react-bootstrap';

import { checkAuthentication } from '../redux/actions/auth';
@connect(
  state => ({
    auth: state.auth
  }),
  dispatch => bindActionCreators({ checkAuthentication }, dispatch)
)
export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.props.checkAuthentication();
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <PageHeader>{this.props.auth.isRemembered ? 'Welcome to FoodDev!' : 'GO AWAY'}</PageHeader>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="./">React-Bootstrap</a>
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
