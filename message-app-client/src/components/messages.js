import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMsgs, receiveMsg } from '../actions/textActions'
import { RECEIVE_MSG } from '../actions/types';
import { decrypt } from '../actions/encryptActions';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import './messages.css';

class Messages extends Component {

  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.messageDiv = this.messageDiv.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.msgs.length !== nextProps.msgs.length) {
      let length = nextProps.msgs.length
      nextProps.msgs[length - 1].aesKey = this.props.aesKey
    }
    if (this.props.socket === null && nextProps.socket) {
      nextProps.socket.on(RECEIVE_MSG, (msg) => {
        this.props.receiveMsg(msg);
      });
    }
  }

  EmptyMsg(msg) {
    return;
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  messageDiv(msg, isSender, msgClass, messageBoxClass, msgContent) {
          return <Col xs="auto" className={messageBoxClass}>
                  <div className={msgClass}>
                    <Row>
                      <Col>{msg.username}</Col>
                    </Row>
                    <Row>
                      <Col>{msgContent}</Col>
                    </Row>
                  </div>
                </Col>
  }

  render() {
    const messageItems = this.props.msgs.map(msg => {
      if (msg.aesKey === null) {
        return;
      }
      else {
        let msgContent = decrypt(msg.textContent, msg.aesKey);
        let isSender = msg.senderId === this.props.clientId
        let msgClass = isSender ? "messageText myMsg" : "messageText"
        let rowClass = isSender ? "justify-content-end" : "justify-content-start"
        let bSide = isSender ? " b-right" : " b-left"
        let messageBoxClass = 'speech-bubble my-3 p-2' + bSide

        return  <Row className={rowClass} key={msg._id}>
                  <Col xs="5">
                    <Row className={rowClass}>
                      {this.messageDiv(msg, isSender, msgClass, messageBoxClass, msgContent)}
                    </Row>
                  </Col>
                </Row>
      }
    });
    return (
      <Container fluid={true} className='scrollbar-primary'>
        {messageItems}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </Container>
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

Messages.propTypes = {
  msgs: PropTypes.array.isRequired,
  clientId: PropTypes.string,
  aesKey: PropTypes.object,
  socket: PropTypes.object
}

export default connect(mapStateToProps, { fetchMsgs, receiveMsg })(Messages);
