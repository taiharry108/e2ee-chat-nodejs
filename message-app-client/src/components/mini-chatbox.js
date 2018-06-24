import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types';
import {
  GENERATE_DH,
  DH_GENERATED } from '../actions/types';
import { removeDMUser, sendDMMessage } from '../actions/dmActions';
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
    this.sendMsg = this.sendMsg.bind(this);
    this.headerBarOnClick = this.headerBarOnClick.bind(this);

  }

  minBtnOnClick = (event) => {
    this.setState({
      minimized: !this.state.minimized
    });
  }

  headerBarOnClick = (event) => {
    if (this.state.minimized)
      this.setState({
        minimized: false
      });
  }

  closeBtnOnClick = (event) => {
    this.props.removeDMUser(this.props.userid);
  }

  onInput(e) {
    this.setState({
      textContent: e.target.innerHTML
    });
  }

  onKeyPressed(event) {
    if(event.charCode === 13) {
      event.preventDefault();
      this.sendMsg();
    }
  }

  sendMsg() {
    if (this.state.textContent === "")
      return false;
      // senderUserid, receiverUserId, message, socket
    let senderUserid = this.props.appUserid;
    let receiverUserId = this.props.userid;
    let message = this.state.textContent;
    let socket = this.props.socket;

    sendDMMessage(senderUserid, receiverUserId, message, socket);
    this.setState({textContent: ''});
    this.inputDiv.innerHTML = "";
    return true;
  }

  MessageDiv = () => {
    const user = this.props.dmUsers[this.props.userid];
    if ('msg' in user) {
    // if ('msg' in user || true) {
      const messages = user.msg;
      // const messages = [{messageid:0, message: 'this is a short message', toReceiver:true}, {messageid:2, message: 'hi', toReceiver:true}, {toReceiver:false, messageid:1, message: 'this is a another short message'}, ]
      return messages.map((msg) =>  {
        let className = 'mini-chatbox-bubble my-1 p-2 d-inline-block';
        let wrapperName = "mini-chatbox-bubble-wrapper";
        className += !msg.toReceiver ? " sender" : "";
        wrapperName += !msg.toReceiver ? " align-self-end" : ""
        return  <div className={wrapperName} key={msg.messageid}>
                  <div className={className}>{msg.message}</div>
                </div>
      });
    }
    return <div></div>
  }

  render() {
    let user = this.props.roomUsers[this.props.userid];
    let chatboxClass = "mini-chatbox-wrapper rounded-top shadow-sm mx-3 align-self-end flex-shrink-0";
    let headerClass = "mini-chatbox-header d-flex";
    let mainClass = "mini-chatbox-content flex-grow-1 shadow-sm bg-light px-1 d-flex flex-column";
    let footerClass = "mini-chatbox-footer bg-light shadow";
    headerClass += this.state.minimized ? " in" : " border-bottom";
    mainClass += this.state.minimized ? " in" : "";
    footerClass += this.state.minimized ? " in" : " border-top";
    chatboxClass += this.state.minimized ? " in" : "";
    return (
      <div className={chatboxClass}>
        <div className='mini-chatbox d-flex flex-column w-100 h-100'>
          <div className={headerClass} onClick={this.headerBarOnClick}>
            <div className='h5 flex-fill ml-2 mb-0 align-self-center'>{user.username}</div>
            <FontAwesomeIcon className="minimize-btn m-2" icon="minus" onClick={this.minBtnOnClick}/>
            <FontAwesomeIcon className="close-chat-btn m-2" icon="times" onClick={this.closeBtnOnClick}/>
          </div>
          <Container className={mainClass} fluid>
            <this.MessageDiv/>
          </Container>
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
    socket: state.login.socket,
    appUserid: state.login.userid,
    dmUsers: state.dm.dmUsers
  }
};

MiniChatbox.propTypes = {
}

export default connect(mapStateToProps, { removeDMUser })(MiniChatbox);
