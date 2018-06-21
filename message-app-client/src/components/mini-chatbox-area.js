import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import MiniChatbox from './mini-chatbox'
import './mini-chatbox-area.css';

class MiniChatboxArea extends Component {

  render() {
    const dmUsersDiv = this.props.dmUsersShow.map((userid) => {
      return <MiniChatbox key={userid} userid={userid}/>;
    })
    return (
      <div className='mini-chatbox-area d-flex flex-row-reverse'>
        {dmUsersDiv}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    dmUsers: state.dm.dmUsers,
    dmUsersShow: state.dm.dmUsersShow
  }
};

MiniChatboxArea.propTypes = {
}

export default connect(mapStateToProps, { })(MiniChatboxArea);
