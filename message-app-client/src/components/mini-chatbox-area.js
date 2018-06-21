import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import './mini-chatbox-area.css';

class MiniChatboxArea extends Component {

  render() {
    return (
      <div className='mini-chatbox-area'>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
  }
};

MiniChatboxArea.propTypes = {
}

export default connect(mapStateToProps, { })(MiniChatboxArea);
