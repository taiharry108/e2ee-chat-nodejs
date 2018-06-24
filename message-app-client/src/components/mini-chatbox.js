import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import {
  GENERATE_DH,
  DH_GENERATED } from '../actions/types';
import './mini-chatbox.css';

class MiniChatbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minimized: false
    }
    this.minBtnOnClick = this.minBtnOnClick.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  minBtnOnClick = (event) => {
    this.setState({
      minimized: !this.state.minimized
    });
  }

  onInput(e) {
    this.setState({
      textContent: e.target.innerHTML
    });
  }

  onKeyPressed(event) {
    if(event.charCode === 13) {
      event.preventDefault()
    }
  }

  render() {
    let user = this.props.roomUsers[this.props.userid];

    let chatboxClass = "mini-chatbox-wrapper rounded-top shadow-sm mx-3 align-self-end flex-shrink-0";
    let headerClass = "mini-chatbox-header bg-danger d-flex";
    let footerClass = "mini-chatbox-footer bg-light shadow";
    headerClass += this.state.minimized ? "" : " border-bottom";
    footerClass += this.state.minimized ? " in" : " border-top";
    chatboxClass += this.state.minimized ? " in" : "";
    return (
      <div className={chatboxClass}>
        <div className='mini-chatbox d-flex flex-column w-100 h-100'>
          <div className={headerClass}>
            <div className='h5 flex-fill ml-2 mb-0 align-self-center'>{user.username}</div>
            <FontAwesomeIcon className="minimize-btn m-2" icon="minus" onClick={this.minBtnOnClick}/>
            <FontAwesomeIcon className="close-chat-btn m-2" icon="times"/>
          </div>
          <div className='mini-chatbox-content flex-grow-1 shadow-sm bg-light'>
            <Container className='mini-chatbox-content-container'>
            </Container>
          </div>
          <div className={footerClass}>
            <div className='mini-chatbox-textarea h-100' contentEditable="true"
              onKeyPress={this.onKeyPressed} onInput={this.onInput}
              ref={(ele) => this.inputDiv = ele}>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    roomUsers: state.room.roomUsers,
  }
};

MiniChatbox.propTypes = {
}

export default connect(mapStateToProps, { })(MiniChatbox);
