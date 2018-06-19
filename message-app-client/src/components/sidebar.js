import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Card, CardBody, CardTitle, CardSubtitle, CardHeader
} from 'reactstrap';
import './sidebar.css';
import { toggleSidebar } from '../actions/uiActions';
import FontAwesome from 'react-fontawesome';
const svgs = require.context('../avatars', true, /\.svg$/)

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    const keys = svgs.keys();
    const svgsArray = keys.map(key => svgs(key));
    this.closeBtnOnClick = this.closeBtnOnClick.bind(this);
    this.state = {
      svgsArray
    }
  }

  closeBtnOnClick() {
    this.props.toggleSidebar(true);
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
      <Container className='sidebar-container h-100 px-0'>
        <Card className="h-100 sidebar-card">
          <CardHeader className="text-nowrap pt-2 pb-3">
            <div className='d-flex d-row'>
              <FontAwesome
                className="close-btn align-self-center mb-2"
                name="times"
                onClick={this.closeBtnOnClick}
                />
              <div className='text-center h5 flex-fill'>
                Room Info
              </div>
            </div>
          </CardHeader>
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

export default connect(mapStateToProps, { toggleSidebar })(SideBar);
