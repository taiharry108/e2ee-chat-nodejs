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
import { setDhForDMUser, setPubKeyForDMUser, receiveDMMessage, selectDMUser } from '../actions/dmActions';
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
  RSA_KEY_GENERATED,
  DH_GENERATED,
  INIT_SESSION_FOR_DM,
  GENERATE_DH,
  SEND_DM_MESSAGE
} from '../actions/types';
import './app-wrapper.css'

class AppWrapper extends Component {

  constructor(props) {
    super(props);
    this.props.worker.postMessage({type:GENERATE_RSA_KEYS})
    this.props.worker.onmessage = (event) => {
      switch (event.data.type) {
        case RSA_KEY_GENERATED:
          this.props.dispatchKeys(event.data.rsaKey);
          break;
        case DH_GENERATED:
          let targetUserid = event.data.userid;
          let myPubKey = event.data.pubKey;
          let myPrivateKey = event.data.privateKey;
          let myUserid = this.props.userid;
          this.props.setDhForDMUser(targetUserid, myPubKey, myPrivateKey);
          console.log('going to sent dh pubKey to server');
          this.props.socket.emit(DH_GENERATED, {myUserid, targetUserid, myPubKey})
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

      socket.on(DH_GENERATED, ({myUserid, targetUserid, myPubKey}) => {
        if (!(myUserid in this.props.dmUsers))
          this.props.worker.postMessage({type: GENERATE_DH, content:myUserid});
        this.props.setPubKeyForDMUser(myUserid, myPubKey)
      })

      socket.on(SEND_DM_MESSAGE, ({senderUserid, receiverUserId, message, messageid, toReceiver}) => {
        console.log('received message from ', senderUserid, ':', message)
        this.props.receiveDMMessage(senderUserid, receiverUserId, message, messageid, toReceiver);
        this.props.selectDMUser(toReceiver ? senderUserid: receiverUserId);
      })

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
    msg: state.texts.msg,
    worker: state.encrypt.worker,
    dmUsers: state.dm.dmUsers,
    userid: state.login.userid
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
  receiveInitRoomInfo,
  setDhForDMUser,
  setPubKeyForDMUser,
  receiveDMMessage,
  selectDMUser
})(AppWrapper);
