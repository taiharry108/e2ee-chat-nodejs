import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form } from 'reactstrap';
import './loginModal.css';
import { login } from '../actions/loginActions';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      username: '',
      chatroomName: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onClick() {
    this.toggle();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.chatroomName);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} className={this.props.className}>
          <ModalHeader>Please enter your name</ModalHeader>
          <Form onSubmit={this.onSubmit} autoComplete="new-password">
            <ModalBody>
              <FormGroup>
                <Label for="userName">User Name</Label>
                <Input autoComplete="off" type="text" name="username" id="userName" placeholder="" onChange={this.onChange} value={this.state.username}/>
                <Label for="chatroomName">Chatroom</Label>
                <Input autoComplete="off" type="text" name="chatroomName" id="chatroomName" placeholder="" onChange={this.onChange} value={this.state.chatroomName}/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.onClick} type="submit">Enter</Button>{' '}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { login })(LoginModal);
