import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PropTypes from 'prop-types';
import './chatroom-info.css';

class ChatroomInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
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
    roomInfo: state.room.roomInfo
  }
};

ChatroomInfo.propTypes = {
}

export default connect(mapStateToProps, {  })(ChatroomInfo);
