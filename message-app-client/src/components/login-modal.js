import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader,
  ModalBody, ModalFooter, FormGroup,
  Label, Input, Form, FormFeedback } from 'reactstrap';
import './login-modal.css';
import { toggleModal } from '../actions/roomActions';
import { login } from '../actions/loginActions';


class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      chatroomName: ''
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
    this.feedback = this.feedback.bind(this);

  }

  onClick() {
    let modal = this.props.modal;
    this.props.toggleModal(modal);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.chatroomName);
  }

  checkValidity(text) {
    return text !== '';
  }

  feedback(isValid) {
    if (isValid) {
      return (
        <div>
          <FormFeedback valid>Sweet!</FormFeedback>
        </div>
      )
    } else {
      return (
        <FormFeedback>{"Can't be empty bro"}</FormFeedback>
      )
    }
  }

  render() {
    let validUsername = this.checkValidity(this.state.username);
    let validChatroomName = this.checkValidity(this.state.chatroomName);
    let validInputs = validUsername && validChatroomName;
    return (
        <Modal isOpen={this.props.modal} className={this.props.className}
          autoFocus={false}>
          <ModalHeader>Please enter your name</ModalHeader>
          <Form onSubmit={this.onSubmit} autoComplete="new-password">
            <ModalBody>
              <FormGroup>
                <Label for="userName">User Name</Label>
                <Input valid={validUsername} invalid={!validUsername}
                  autoComplete="off" type="text" name="username" id="userName"
                  placeholder="" onChange={this.onChange} value={this.state.username}
                  autoFocus ref={(ele) => this.usernameDiv = ele}/>
                {this.feedback(validUsername)}
                <Label for="chatroomName">Chatroom</Label>
                <Input valid={validChatroomName} invalid={!validChatroomName}
                  autoComplete="off" type="text" name="chatroomName" id="chatroomName"
                  placeholder="" onChange={this.onChange} value={this.state.chatroomName}/>
                {this.feedback(validChatroomName)}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button className="shadow" enable-shadows="true" disabled={!validInputs}
              color="primary" onClick={this.onClick} type="submit">Enter</Button>{' '}
            </ModalFooter>
          </Form>
        </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.room.modal
  }
};

export default connect(mapStateToProps, { login, toggleModal })(LoginModal);
