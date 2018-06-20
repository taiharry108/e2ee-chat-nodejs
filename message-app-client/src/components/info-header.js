import React, { Component } from 'react';
import logo from '../logo.svg';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { UPDATE_ROOM_INFO } from '../actions/types';
import { updateRoomInfo, appTitleOnClick } from '../actions/roomActions';
import { toggleSidebar } from '../actions/uiActions';
import ChatroomInfo from './chatroom-info';
import './info-header.css';

class InfoHeader extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.allowPopover)
      this.props.appTitleOnClick(this.props.popoverOpen);
    else
      this.props.toggleSidebar(this.props.sidebarOut);
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
    sidebarOut: state.ui.sidebarOut,
    allowPopover: state.ui.allowPopover
  }
};

InfoHeader.propTypes = {
  socket: PropTypes.object,
  userNumber: PropTypes.number
}

export default connect(mapStateToProps, { updateRoomInfo, appTitleOnClick, toggleSidebar })(InfoHeader);
