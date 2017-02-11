import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, Image, Grid, Col, Row } from 'react-bootstrap';

@connect(
  state => ({
    auth: state.auth,
    menu: state.menu
  }),
  dispatch => bindActionCreators({ }, dispatch)
)
export default class Menu extends Component {
  render() {
    console.log(this.props.menu.menu)
    return (
      <ListGroup style={{ padding: 20, flex: 1 }}>
        {this.props.menu.menu.map(menuItem => (
          <Grid>
            <Row >
              <Col>
                <Image width={100} height={100} src={menuItem.imageURL} rounded />
              </Col>
              <Col>
                <div style={{ width: 200 }}>{menuItem.title}</div>
              </Col>
              
            </Row>
          </Grid>
        ))}
      </ListGroup>
    );
  }
}
