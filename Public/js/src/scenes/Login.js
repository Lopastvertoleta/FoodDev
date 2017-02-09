import React, { Component, PropTypes } from 'react';
import { Button, Form, PageHeader, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import './Login.css';
import { login } from '../redux/actions/auth';
@connect(
  () => ({}),
  dispatch => bindActionCreators({ login }, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <div className="container">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <PageHeader>Welcome to FoodDev!</PageHeader>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>Email</Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" value={this.state.email} onChange={event => this.setState({ email: event.nativeEvent.srcElement.value })} />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>Password</Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" value={this.state.password} onChange={event => this.setState({ password: event.nativeEvent.srcElement.value })} />
            </Col>
          </FormGroup>

          {/* <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>*/}

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={() => this.props.login(this.state.email, this.state.password)} >Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
