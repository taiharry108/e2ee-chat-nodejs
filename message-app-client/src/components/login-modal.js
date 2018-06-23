import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader,
  ModalBody, ModalFooter, FormGroup,
  Label, Input, Form, FormFeedback } from 'reactstrap';
import './login-modal.css';
import { toggleModal } from '../actions/roomActions';
import { login } from '../actions/loginActions';
import uuidv1 from 'uuid/v1';
// import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    this.StatusDiv = this.StatusDiv.bind(this);
    this.StatusIcon = this.StatusIcon.bind(this);
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
    this.props.login(this.state.username, this.state.chatroomName, uuidv1());
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

  StatusDiv = (props) => {
    const finishedLoading = props.finishedLoading;
    if (finishedLoading) {
      return <div className='text-muted m-2'>Keys generated</div>;
    }
    else {
      return <div className='text-muted m-2'>Generating keys...</div>;
    }
  }

  StatusIcon = (props) => {
    const finishedLoading = props.finishedLoading;
    if (finishedLoading) {
      return <FontAwesomeIcon icon={["far", "check-circle"]} color="green"/>;
    }
    else {
      return <FontAwesomeIcon icon="spinner" spin/>;
    }
  }
  render() {
    const validUsername = this.checkValidity(this.state.username);
    const validChatroomName = this.checkValidity(this.state.chatroomName);
    const rsaKeyGenerated = this.props.rsaKey !== null;
    const validInputs = validUsername && validChatroomName && rsaKeyGenerated;
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
              <this.StatusDiv finishedLoading={rsaKeyGenerated}/>
              <this.StatusIcon finishedLoading={rsaKeyGenerated}/>
              <Button className="shadow" enable-shadows="true" disabled={!validInputs}
              color="primary" onClick={this.onClick} type="submit">Enter</Button>{' '}
            </ModalFooter>
          </Form>
        </Modal>
    );
  }
}

// <FontAwesome
//   className={"m-2" + (rsaKeyGenerated ? " finished-loading-icon text-success" : " spinning-spinner")}
//   name={rsaKeyGenerated ? "check-circle" : "spinner"}
//   />

const mapStateToProps = state => {
  return {
    modal: state.room.modal,
    rsaKey: state.encrypt.rsaKey
  }
};

export default connect(mapStateToProps, { login, toggleModal })(LoginModal);
