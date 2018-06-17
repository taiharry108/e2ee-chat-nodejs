import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem
} from 'reactstrap';
import './sidebar.css';

class SideBar extends React.Component {

  render() {
    // const userDiv = this.props.roomInfo.map((user) => {
    //   return  <ListGroupItem key={user.clientId} className="text-nowrap">
    //             {user.username}
    //           </ListGroupItem>
    // })
    const userDiv = this.props.roomInfo.map((user) => {
      return  <CardText key={user.clientId} className="text-nowrap">
                {user.username}
              </CardText>
    })
    return (
      <Container className='sidebar-container h-100 pr-0'>
        <Card className="h-100">
          <CardBody>
            <CardTitle className="text-nowrap">Room Info</CardTitle>
              {userDiv}
          </CardBody>
        </Card>
      </Container>
    );
  }
}



const mapStateToProps = state => {
  return {
    roomInfo: state.room.roomInfo
  }
};

export default connect(mapStateToProps, {  })(SideBar);
