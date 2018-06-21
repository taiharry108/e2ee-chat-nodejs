import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './chatroom-info.css';

class ChatroomInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  render() {
    const userDiv = this.props.roomUserIds.map((userid) => {
      let user = this.props.roomUsers[userid];
      return  <Row key={user.userid} className='my-1'>
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
    roomUserIds: state.room.roomUserIds,
    roomUsers: state.room.roomUsers
  }
};

ChatroomInfo.propTypes = {
}

export default connect(mapStateToProps, {  })(ChatroomInfo);
