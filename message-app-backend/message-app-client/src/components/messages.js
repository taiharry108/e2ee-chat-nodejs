import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMsgs, receiveMsg } from '../actions/textActions';
import { RECEIVE_MSG } from '../actions/types';
import { decrypt } from '../actions/encryptActions';
import { Container, Row, Col } from 'reactstrap';
import { Emoji } from 'emoji-mart';
import Push from 'push.js';
import PropTypes from 'prop-types';
import './messages.css';
import reactStringReplace from 'react-string-replace';

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
      <div>
        {reactStringReplace(msg, /(\:[a-z0-9\_\-]+\:)/g, (match, i) => {
          return <div className="symbol-wrapper"><Emoji key={i} emoji={match} size={28} fallback={(emoji) => {
            return <div key={i}>"ABC"</div>;
          }}/></div>
        })}
      </div>
    )
  }

  constructor(props) {
    super(props);
    this.messageDiv = this.messageDiv.bind(this);
    this.replaceMsgWithEmoji = this.replaceMsgWithEmoji.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({});
  }

  componentDidMount() {
    if (this.props.allowAutoBottom)
      this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.allowAutoBottom)
     this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {

    // New Message arrive
    if (this.props.msgs.length !== nextProps.msgs.length) {
      let length = nextProps.msgs.length;
      let newMsg = nextProps.msgs[length - 1];
      newMsg.textContent = decrypt(newMsg.textContent, this.props.aesKey);
      if (newMsg.senderId !== this.props.clientId)
        Push.create('New Message', {
          body: newMsg.textContent,
          timeout: 2000,
          icon:'http://www.myiconfinder.com/uploads/iconsets/256-256-8007c02e43c5e5c87fc8976e34c8290f-message.png'
        });
    }
    // subscribe to socket
    if (this.props.socket === null && nextProps.socket) {
      nextProps.socket.on(RECEIVE_MSG, (msg) => {
        this.props.receiveMsg(msg);
      });
    }

    if (!this.props.scrollToBot && nextProps.scrollToBot) {
      this.scrollToBottom();
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
        let msgContent = msg.textContent;
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
        <div className='w-100 h-100' ref={(ele) => this.mainDiv = ele}>
          {messageItems}
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>

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
    allowAutoBottom: state.ui.allowAutoBottom,
  }
};

Messages.propTypes = {
  msgs: PropTypes.array.isRequired,
  clientId: PropTypes.string,
  aesKey: PropTypes.object,
  socket: PropTypes.object,
}

export default connect(mapStateToProps, { fetchMsgs, receiveMsg })(Messages);
