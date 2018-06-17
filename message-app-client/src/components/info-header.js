import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { UPDATE_ROOM_INFO } from '../actions/types';
import { updateRoomInfo, appTitleOnClick, toggleModal } from '../actions/roomActions';
import { toggleSidebar } from '../actions/uiActions';
import ChatroomInfo from './chatroom-info';
import './info-header.css';

class InfoHeader extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.logoOnClick = this.logoOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // subscribe to socket
    if (this.props.socket === null && nextProps.socket) {

      let socket = nextProps.socket;

      socket.on(UPDATE_ROOM_INFO, (resp) => {
        this.props.updateRoomInfo(resp);
      })
    }
  }

  onClick() {
    this.props.appTitleOnClick(this.props.popoverOpen);
    this.props.toggleSidebar(this.props.sidebarOut);
  }

  logoOnClick() {
    // let modal = this.props.modal;
    // this.props.toggleModal(modal);
  }


  render() {
    return (
      <Container className="info-header shadow px-0">
        <Row>
          <Col className="text-center"><img src={logo} className="App-logo" alt="logo" onClick={this.logoOnClick}/></Col>
        </Row>
        <Row>
          <Col>
            <div data={this.props.userNumber} id="app-title" className="h1 app-title text-center user-number mb-0 py-2" onClick={this.onClick}>Welcome to Secret Chatroom</div>
            <ChatroomInfo />
          </Col>
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = state => {
  return {
    socket: state.login.socket,
    userNumber: state.room.userNumber,
    popoverOpen: state.room.popoverOpen,
    modal: state.room.modal,
    sidebarOut: state.ui.sidebarOut
  }
};

InfoHeader.propTypes = {
  socket: PropTypes.object,
  userNumber: PropTypes.number
}

export default connect(mapStateToProps, { updateRoomInfo, appTitleOnClick, toggleModal, toggleSidebar })(InfoHeader);
