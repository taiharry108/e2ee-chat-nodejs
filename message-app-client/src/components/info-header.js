import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './info-header.css';

class InfoHeader extends Component {
  render() {
    return (
      <Container className="info-header">
        <Row>
          <Col className="text-center"><img src={logo} className="App-logo" alt="logo" /></Col>
        </Row>
        <Row>
          <Col><div className="h1 App-title text-center">Welcome to Secret Chatroom</div></Col>
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = state => {
  return {
  }
};

InfoHeader.propTypes = {
}

export default connect(mapStateToProps, {})(InfoHeader);
