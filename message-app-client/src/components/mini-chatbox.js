import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './mini-chatbox.css';

class MiniChatbox extends Component {

  render() {
    return (
      <div className="mini-chatbox-wrapper">
        <div className='d-flex flex-col'>
          <div className='mini-chatbox-header'></div>
          <div className='mini-chatbox-content'></div>
          <div className='mini-chatbox-footer'></div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
  }
};

MiniChatbox.propTypes = {
}

export default connect(mapStateToProps, { })(MiniChatbox);
