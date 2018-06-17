import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Card, CardBody, CardTitle, CardSubtitle, CardHeader, Row, Col
} from 'reactstrap';
import './sidebar.css';
import avatar from '../avatars/man.svg';
const svgs = require.context('../avatars', true, /\.svg$/)

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    const keys = svgs.keys();
    const svgsArray = keys.map(key => svgs(key));
    this.state = {
      svgsArray
    }
  }

  render() {

    const userDiv = this.props.roomInfo.map((user) => {
      let noOfAva = this.state.svgsArray.length;
      let avaIdx = Math.floor(Math.random() * noOfAva)
      return  <div className="d-flex flex-row" key={user.clientId}>
                <img src={this.state.svgsArray[avaIdx]} className='avatar rounded-circle my-2 mr-2'></img>
                <div className="border-bottom p-2 text-nowrap flex-fill">
                  <CardTitle key={user.clientId} className="text-nowrap">
                    {user.username}
                  </CardTitle>
                  <CardSubtitle className="text-nowrap status-text">
                    This is a status
                  </CardSubtitle>
                </div>
              </div>
    })
    return (
      <Container className='sidebar-container h-100 pr-0'>
        <Card className="h-100 sidebar-card">
          <CardHeader className="text-nowrap text-center h5 pt-2 pb-3">Room Info</CardHeader>
          <CardBody className="p-0">
            <Container>
              <div className="d-flex flex-column">
                {userDiv}
              </div>
            </Container>
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
