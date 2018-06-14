import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './info-header.css';

class InfoHeader extends Component {
  render() {
    return (
      <Container className="container-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Secret Chatroom</h1>
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
