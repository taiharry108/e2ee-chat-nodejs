import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMsgs, receiveMsg } from '../actions/textActions'
import { RECEIVE_MSG } from '../actions/types';
import { decrypt } from '../actions/encryptActions';
import { Row, Col } from 'reactstrap';
import './messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.fetchMsgs();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.msgs.length !== nextProps.msgs.length) {
      let length = nextProps.msgs.length
      nextProps.msgs[length - 1].aesKey = this.props.aesKey
    }
    if (this.props.socket === null && nextProps.socket) {
      nextProps.socket.on(RECEIVE_MSG, (msg) => {
        console.log('received message', msg.textContent)
        this.props.receiveMsg(msg);
      });
    }
  }

  EmptyMsg(msg) {
    return;
  }

  Msg(msg) {
    let msgContent = decrypt(msg.textContent, msg.aesKey);
    return (
      <div key={msg._id} className="messageText">
        <p>{msg.senderId}:{msgContent}</p>
      </div>
    )
  }

  render() {
    const messageItems = this.props.msgs.map(msg => {
      if (msg.aesKey === null) {
        return;
      }
      else {
        let msgContent = decrypt(msg.textContent, msg.aesKey);
        let msgClass = msg.senderId === this.props.clientId ? "messageText myMsg" : "messageText"
        return <div key={msg._id} className={msgClass}>
                <Row>
                  <Col xs="1">{msg.username}</Col>
                  <Col xs="auto">{msgContent}</Col>
                </Row>
              </div>
      }
    })
    return (
      <div>
        {messageItems}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    msgs: state.texts.msgs,
    clientId: state.texts.clientId,
    aesKey: state.encrypt.aesKey,
    socket: state.login.socket
  }
};

export default connect(mapStateToProps, { fetchMsgs, receiveMsg })(Messages);
