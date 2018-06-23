import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainSection from './main-section';
import TextForm from './textform';
import LoginModal from './login-modal';
import InfoHeader from './info-header';
import { Container } from 'reactstrap';
import { connected, clearMsg } from '../actions/textActions';
import { updateRoomInfo, receiveInitRoomInfo } from '../actions/roomActions';
import { flipSwitch } from '../actions/uiActions';
import Worker from '../workers/encrypt.worker.js';
import { dispatchKeys,
  sendPubKey2Ser,
  assignedAsHost,
  removeAsHost,
  receivedEncryptedAESKey,
} from '../actions/encryptActions';
import { UPDATE_ROOM_INFO,
  INIT_ROOM_INFO,
  ASSIGN_HOST,
  REMOVE_HOST,
  CONNECTED,
  SEND_AES,
  SEND_MSG,
  GENERATE_RSA_KEYS,
  RSA_KEY_GENERATED
} from '../actions/types';
import './app-wrapper.css'

class AppWrapper extends Component {

  constructor(props) {
    super(props);
    this.worker = new Worker();
    this.worker.postMessage({type:GENERATE_RSA_KEYS})
    this.worker.onmessage = (event) => {
      switch (event.data.type) {
        case RSA_KEY_GENERATED:
          this.props.dispatchKeys(event.data.rsaKey);
          break;
        default:
      }
    }
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

      socket.on(INIT_ROOM_INFO, (resp) => {
        this.props.receiveInitRoomInfo(resp);
      })

      socket.on(ASSIGN_HOST, (othersKeys) => {
        this.props.assignedAsHost(othersKeys, socket);
      });

      socket.on(REMOVE_HOST, (othersKeys) => {
        this.props.removeAsHost();
      });

      socket.on(CONNECTED, () => {
        let pubKey = this.state.pubKey
        console.log('connected to server, going to send public kay', pubKey)
        sendPubKey2Ser(socket, pubKey);
        this.props.connected();
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
        <Container className='whole-container shadow px-0 container-fw'>
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
  dispatchKeys,
  flipSwitch,
  clearMsg,
  receiveInitRoomInfo
})(AppWrapper);
