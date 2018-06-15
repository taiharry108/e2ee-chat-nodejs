import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './chatroom-info.css';

class ChatroomInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [
        {id: 0, name: "Harry_______fadsfsdaf"},
        {id: 1, name: "Sherry"},
        {id: 2, name: "Harry"},
        {id: 3, name: "Sherry"},
        {id: 4, name: "Harry"},
        {id: 5, name: "Sherry"},
        {id: 6, name: "Harry"},
        {id: 7, name: "Sherry"},
        {id: 8, name: "Harry"},
        {id: 9, name: "Sherry"},
        {id: 10, name: "Harry"},
        {id: 11, name: "Sherry"},
        {id: 12, name: "Harry"},
        {id: 13, name: "Sherry"},
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    // subscribe to socket
    if (this.props.socket === null && nextProps.socket) {

      let socket = nextProps.socket;

      // socket.on(UPDATE_USER_NUMBER, (userNumber) => {
      // })
    }
  }

  render() {
    const userDiv = this.props.roomInfo.map((user) => {
      return  <Row key={user.clientId} className='my-1'>
                <Col>{user.username}</Col>
              </Row>
    })
    return (
      <Popover className='chatroom-info' placement="bottom" isOpen={this.props.popoverOpen} target="app-title">
        <PopoverHeader>Chatroom info</PopoverHeader>
        <PopoverBody>
          <Container>
            {userDiv}
          </Container>
        </PopoverBody>
      </Popover>
    );
  }

}

const mapStateToProps = state => {
  return {
    popoverOpen: state.room.popoverOpen,
    socket: state.login.socket,
    roomInfo: state.room.roomInfo
  }
};

ChatroomInfo.propTypes = {
  socket: PropTypes.object,
}

export default connect(mapStateToProps, {  })(ChatroomInfo);
