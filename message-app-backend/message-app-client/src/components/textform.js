import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../actions/textActions';
import { encrypt } from '../actions/encryptActions';
import { emojiClicked, clearEmoji } from '../actions/uiActions';
import PropTypes from 'prop-types';
import EmojiPane from './emoji-pane';
import { Container, Row, Col, Button } from 'reactstrap';
import './textform.css';

class TextForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.onEnterPressed = this.onEnterPressed.bind(this);
    this.emojiOnClick = this.emojiOnClick.bind(this);
    this.onInput = this.onInput.bind(this);
    this.focusInputDiv = this.focusInputDiv.bind(this);
  }

  focusInputDiv() {
    let range = document.createRange();
    let sel = window.getSelection();

    range.setStart(this.inputDiv, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    this.inputDiv.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.emoji) {
      let emoji = nextProps.emoji;
      this.inputDiv.innerHTML += emoji.colons;
      this.setState({
        textContent: this.inputDiv.innerHTML
      });
      this.props.clearEmoji();
      this.focusInputDiv();
    }

    if (this.props.modalShown && !nextProps.modalShown) {
      this.inputDiv.focus();
    }
  }

  onEnterPressed(event) {
    if(event.charCode === 13) {
      event.preventDefault()
      this.sendMsg();
    }
  }

  sendMsg() {
    if (this.state.textContent === "")
      return false;
    const textMsg = {

      textContent: encrypt(this.state.textContent, this.props.aesKey)
    }
    this.props.sendMsg(textMsg);
    this.setState({textContent: ''});
    this.inputDiv.innerHTML = "";
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    this.sendMsg();
  }

  checkValidity(text) {
    return text !== '';
  }

  emojiOnClick() {
    this.props.emojiClicked(this.props.emojiPaneOut);
  }

  onInput(e) {
    this.setState({
      textContent: e.target.innerHTML
    });
  }

  render() {
    let textContent = this.state.textContent;
    let validTextContent = this.checkValidity(textContent);
    return (
      <div>
      <Container className="textform-footer p-1" >
        <Row>
          <Col>
            <form onSubmit={this.onSubmit} autoComplete="new-password">
              <div className="d-flex flex-row">
                <div className="m2 p-2">
                  <i className="far fa-smile emoji-icon align-self-center my-1 fa-2x text-secondary" onClick={this.emojiOnClick} id='emoji-icon'></i>
                  <EmojiPane/>
                </div>
                <div className="text-div py-1 px-2 m-2 flex-grow-1"
                  contentEditable="true" place-text="Type a message"
                  onKeyPress={this.onEnterPressed} onInput={this.onInput}
                  ref={(ele) => this.inputDiv = ele}>
                </div>
                <div>
                  <Button color="secondary" className="send-msg-btn d-none d-sm-block m-2 align-self-end" disabled={!validTextContent}>Send</Button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  aesKey: state.encrypt.aesKey,
  emojiPaneOut: state.ui.emojiPaneOut,
  emoji: state.ui.emoji,
  modalShown: state.room.modal
});

TextForm.propTypes = {
  aesKey: PropTypes.object,
}

export default connect(mapStateToProps, { sendMsg, emojiClicked, clearEmoji })(TextForm);
