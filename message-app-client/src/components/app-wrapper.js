import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainSection from './main-section';
import TextForm from './textform';
import LoginModal from './login-modal';
import InfoHeader from './info-header';
import { Container } from 'reactstrap';
import { connected, clearMsg } from '../actions/textActions';
import { updateRoomInfo } from '../actions/roomActions';
import { flipSwitch } from '../actions/uiActions';
import { genKeys,
  sendPubKey2Ser,
  assignedAsHost,
  removeAsHost,
  receivedEncryptedAESKey,
} from '../actions/encryptActions';
import { UPDATE_ROOM_INFO,
  ASSIGN_HOST,
  REMOVE_HOST,
  CONNECTED,
  SEND_AES,
  SEND_MSG
} from '../actions/types';
import './app-wrapper.css'

class AppWrapper extends Component {

  constructor(props) {
    super(props);
    this.props.genKeys();
    this.state = {
      width: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    let prevWidth = this.state.width;
    let minWidth = 576;
    this.setState({ width: window.innerWidth });

    if (prevWidth > minWidth && window.innerWidth <= minWidth)
      this.props.flipSwitch(true);
    else if (prevWidth <= minWidth && window.innerWidth > minWidth) {
      this.props.flipSwitch(false);
    }

  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.rsaKey) {
        this.setState({pubKey:nextProps.rsaKey.exportKey('pkcs8-public-pem')});
      }
    // subscribe to socket
    if (this.props.socket === null && nextProps.socket) {

      let socket = nextProps.socket;

      socket.on(UPDATE_ROOM_INFO, (resp) => {
        this.props.updateRoomInfo(resp);
      })

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

      socket.on(SEND_AES, (encryptedAES) => this.props.receivedEncryptedAESKey(encryptedAES, this.props.rsaKey));
    }

    if (nextProps.msg !== "") {
      this.props.socket.emit(SEND_MSG, nextProps.msg);
      this.props.clearMsg();
    }
  }

  render() {
    return (
      <div className='app-wrapper'>
        <div className="modal-container">
          <LoginModal className='loginModal'/>
        </div>
        <Container className='whole-container shadow px-0'>
          <div className="main-container d-flex flex-column">
            <div className="order-1">
              <InfoHeader />
            </div>
            <div className="flex-middle order-2 flex-fill">
              <MainSection />
            </div>
            <div className="flex-bottom order-3">
              <TextForm/>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

//

const mapStateToProps = state => {
  return {
    sidebarOut: state.ui.sidebarOut,
    socket: state.login.socket,
    rsaKey: state.encrypt.rsaKey,
    msg: state.texts.msg
  }
};

AppWrapper.propTypes = {
}

export default connect(mapStateToProps, {
  updateRoomInfo,
  assignedAsHost,
  removeAsHost,
  connected,
  receivedEncryptedAESKey,
  genKeys,
  flipSwitch,
  clearMsg
})(AppWrapper);
