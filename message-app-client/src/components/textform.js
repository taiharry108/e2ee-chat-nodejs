import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMsg, connected } from '../actions/textActions';
import { genKeys, sendPubKey2Ser, assignedAsHost, removeAsHost, receivedEncryptedAESKey, encrypt } from '../actions/encryptActions';
import { ASSIGN_HOST, REMOVE_HOST, CONNECTED, SEND_AES } from '../actions/types';
import PropTypes from 'prop-types';
import { Input, Container, Row, Col  } from 'reactstrap';
import './textform.css';

class TextForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textContent: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.props.genKeys();

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rsaKey) {
      this.setState({pubKey:nextProps.rsaKey.exportKey('pkcs8-public-pem')});
    }

    // subscribe to socket
    if (this.props.socket === null && nextProps.socket) {

      let socket = nextProps.socket;
      socket.on(ASSIGN_HOST, (othersKeys) => {
        this.props.assignedAsHost(othersKeys, socket);
      });

      socket.on(REMOVE_HOST, (othersKeys) => {
        this.props.removeAsHost();
      });

      socket.on(CONNECTED, (clientId) => {
        let pubKey = this.state.pubKey
        console.log('connected to server, going to send public kay', pubKey)
        sendPubKey2Ser(socket, pubKey);
        this.props.connected(clientId);
      })

      socket.on(SEND_AES, (encryptedAES) => this.props.receivedEncryptedAESKey(encryptedAES, this.props.rsaKey))
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const textMsg = {
      textContent: encrypt(this.state.textContent, this.props.aesKey)
    }
    this.props.sendMsg(this.props.socket, textMsg);
    this.setState({textContent: ''});
  }

  render() {
    return (
      <Container className="textform-footer">
        <Row>
          <Col>
            <form onSubmit={this.onSubmit} autoComplete="new-password">
              <Input autoComplete="off" className="textArea"
                type="text" name="textContent"
                onChange={this.onChange} placeholder="Type a message"
                value={this.state.textContent}/>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = state => ({
  rsaKey: state.encrypt.rsaKey,
  aesKey: state.encrypt.aesKey,
  socket: state.login.socket
});

TextForm.propTypes = {
  rsaKey: PropTypes.object,
  aesKey: PropTypes.object,
  socket: PropTypes.object
}

export default connect(mapStateToProps, { genKeys, sendMsg, assignedAsHost, removeAsHost, receivedEncryptedAESKey, connected })(TextForm);
