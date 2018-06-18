import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMsgs, receiveMsg } from '../actions/textActions';
import { RECEIVE_MSG } from '../actions/types';
import { decrypt } from '../actions/encryptActions';
import { Container, Row, Col } from 'reactstrap';
import { Emoji } from 'emoji-mart'
import PropTypes from 'prop-types';
import './messages.css';
import reactStringReplace from 'react-string-replace'
const emojiREGEX = /(\:[a-z0-9\_\-]+\:)/g

String.prototype.matchAll = function(regexp) {
  var matches = [];
  this.replace(regexp, function() {
    var arr = ([]).slice.call(arguments, 0);
    var extras = arr.splice(-2);
    arr.index = extras[0];
    arr.input = extras[1];
    matches.push(arr);
  });
  return matches.length ? matches : null;
};

class Messages extends Component {
  replaceMsgWithEmoji = (msg) => {
    msg = msg.replace(/&nbsp;/g, ' ');
    return (
      <div className='d-flex flex-row'>
        {reactStringReplace(msg, /(\:[a-z0-9\_\-]+\:)/g, (match, i) => {
          return <div className="my-1"><Emoji key={i} emoji={match} size={24}/></div>
        })}
      </div>
    )
  }


  constructor(props) {
    super(props);
    this.messageDiv = this.messageDiv.bind(this);
    this.replaceMsgWithEmoji = this.replaceMsgWithEmoji.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.msgs.length !== nextProps.msgs.length) {
      let length = nextProps.msgs.length
      nextProps.msgs[length - 1].aesKey = this.props.aesKey
    }
    // subscribe to socket
    if (this.props.socket === null && nextProps.socket) {
      nextProps.socket.on(RECEIVE_MSG, (msg) => {
        this.props.receiveMsg(msg);
      });
    }
  }

  EmptyMsg(msg) {
    return;
  }

  messageDiv(msg, messageBoxClass, msgContent, isSender) {
    let msgClass = "message-text lead";
    msgClass += isSender ? " sender-msg pr-5" : " pr-5";
    let senderNameText = isSender ? "" : msg.username;
    let senderNameClass = isSender ? "" : "col mb-0 h6";
    return <Col xs="auto" className={messageBoxClass}>
            <div>
              <Row>
                <div className={senderNameClass}>
                  {senderNameText}
                </div>
              </Row>
              <Row>
                <Col className={msgClass}>
                    {this.replaceMsgWithEmoji(msgContent)}
                </Col>
              </Row>
            </div>
          </Col>
  }


  render() {
    const messageItems = this.props.msgs.map(msg => {
      if (msg.aesKey === null) {
        return <div></div>;
      }
      else {
        let msgContent = decrypt(msg.textContent, msg.aesKey);
        let isSender = msg.senderId === this.props.clientId;
        let rowClass = isSender ? "justify-content-end" : "justify-content-start";
        let bSide = isSender ? " b-right" : " b-left";
        let messageBoxClass = 'speech-bubble m-3 pl-2 pr-3 py-1 shadow-sm' + bSide;
        messageBoxClass += isSender ? " my-msg" : " others-msg";

        return  <Row className={rowClass} key={msg._id}>
                  <Col lg="7" md="12">
                    <Row className={rowClass}>
                      {this.messageDiv(msg, messageBoxClass, msgContent, isSender)}
                    </Row>
                  </Col>
                </Row>
      }
    });
    return (
      <Container className='container-main scrollbar-primary'>
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
    socket: state.login.socket,
    // sidebarOut: state.ui.sidebarOut
  }
};

Messages.propTypes = {
  msgs: PropTypes.array.isRequired,
  clientId: PropTypes.string,
  aesKey: PropTypes.object,
  socket: PropTypes.object
}

export default connect(mapStateToProps, { fetchMsgs, receiveMsg })(Messages);
