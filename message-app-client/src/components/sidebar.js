import React from 'react';
import { connect } from 'react-redux';
import {
  Container, Card, CardBody, CardTitle, CardSubtitle, CardHeader
} from 'reactstrap';
import './sidebar.css';
import { toggleSidebar } from '../actions/uiActions';
import { selectDMUser } from '../actions/dmActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GENERATE_DH } from '../actions/types';
const svgs = require.context('../avatars', true, /\.svg$/)

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    const keys = svgs.keys();
    const svgsArray = keys.map(key => svgs(key));
    this.closeBtnOnClick = this.closeBtnOnClick.bind(this);
    this.roomMemberOnClick = this.roomMemberOnClick.bind(this);
    this.state = {
      svgsArray
    }
  }

  closeBtnOnClick() {
    this.props.toggleSidebar(true);
  }

  roomMemberOnClick(userid) {
    if (!(userid in this.props.dmUsers))
      this.props.worker.postMessage({type: GENERATE_DH, content:userid});
    this.props.selectDMUser(userid);
  }
  render() {

    const userDiv = this.props.roomUserIds.map((userid) => {
      let user = this.props.roomUsers[userid]
      let avaIdx = user.avaIdx;
      return  <div className="room-member d-flex flex-row" key={user.userid} onClick={() => this.roomMemberOnClick(user.userid)}>
                <img src={this.state.svgsArray[avaIdx]} className='avatar rounded-circle my-2 mr-2' alt={user.username[0].toUpperCase()}></img>
                <div className="border-bottom p-2 text-nowrap flex-fill">
                  <CardTitle key={user.userid} className="text-nowrap">
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
              <FontAwesomeIcon
                className="close-btn align-self-center mb-2"
                icon="times"
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
    roomUserIds: state.room.roomUserIds,
    roomUsers: state.room.roomUsers,
    worker: state.encrypt.worker,
    dmUsers: state.dm.dmUsers
  }
};

export default connect(mapStateToProps, { toggleSidebar, selectDMUser })(SideBar);
