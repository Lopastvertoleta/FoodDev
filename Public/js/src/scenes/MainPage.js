import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ButtonToolbar, PageHeader, Nav, Navbar, NavItem } from 'react-bootstrap';

import Menu from './Menu';

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
      isLoggedIn: false,
      currentScreen: SCREENS.MENU
    };
  }

  componentDidMount() {
    this.props.checkAuthentication();
  }

  renderContent = () => {
    switch (this.state.currentScreen) {
      case SCREENS.MENU: return <Menu />;
    }
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <PageHeader>{'Welcome to FoodDev!'}</PageHeader>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="./?#/main">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Menu</NavItem>
            <NavItem eventKey={2} href="#">Users</NavItem>
          </Nav>
        </Navbar>
        {this.renderContent()}
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="large">Large button</Button>
          <Button bsSize="large">Large button</Button>
        </ButtonToolbar>
      </div>
    );
  }
}


const SCREENS = Object.freeze({
  MENU: 'MENU',
  USERS: 'USERS'
})