import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../actions/textActions';
import { encrypt } from '../actions/encryptActions';
import PropTypes from 'prop-types';
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
  }

  onEnterPressed(event) {
    if(event.charCode === 13) {
      event.preventDefault()
      let didSendMessage = this.sendMsg();
      if (didSendMessage)
        event.target.innerHTML = '';
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
    return true;
  }

  onSubmit(e) {
    e.preventDefault();
    this.sendMsg();
  }

  checkValidity(text) {
    return text !== '';
  }

  render() {
    let textContent = this.state.textContent;
    let validTextContent = this.checkValidity(textContent);
    return (
      <div>
      <Container className="textform-footer py-2" >
        <Row>
          <Col>
            <form onSubmit={this.onSubmit} autoComplete="new-password">
              <Row>
                <Col className="my-1 pr-lg-0">
                  <div className="text-div py-1 px-2" contentEditable="true" place-text="Type a message" onKeyPress={this.onEnterPressed} onInput={(e) => this.setState({
                    textContent: e.target.innerHTML
                  })}></div>
                </Col>
                <Col lg="1" className="my-1 mw-100 d-none d-lg-block">
                  <Button color="secondary" className="send-msg-btn d-none d-sm-block" disabled={!validTextContent}>Send</Button>
                </Col>
              </Row>
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
});

TextForm.propTypes = {
  aesKey: PropTypes.object,
}

export default connect(mapStateToProps, { sendMsg })(TextForm);
