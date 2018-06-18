import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from './sidebar';
import Messages from './messages';
import './main-section.css';

class MainSection extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    let sidebarWrapperClass = this.props.sidebarOut ? 'in' : '';
    let messageWrapperClass = this.props.sidebarOut ? 'in' : '';
    return (
      <div className='main-section-wrapper d-flex w-100 h-100'>
        <div id='message-wrapper' className={messageWrapperClass}>
          <Messages />
        </div>
        <div id='sidebar-wrapper' className={sidebarWrapperClass}>
          <SideBar/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    sidebarOut: state.ui.sidebarOut
  }
};

MainSection.propTypes = {
}

export default connect(mapStateToProps, {  })(MainSection);
