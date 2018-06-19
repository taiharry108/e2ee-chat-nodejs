import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from './sidebar';
import Messages from './messages';
import { toggleAllowAutoBottom } from '../actions/uiActions';
import FontAwesome from 'react-fontawesome';
import './main-section.css';

class MainSection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      circleShown: false
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.circleOnClick = this.circleOnClick.bind(this);
  }

  componentDidMount() {
    this.mainDiv.addEventListener('scroll', this.handleScroll, true);
  }

  handleScroll(event) {
    let element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      if (!this.props.allowAutoBottom) {
        this.props.toggleAllowAutoBottom(true);
        this.setState({
          circleShown: false
        });
      }
    } else {
      if (this.props.allowAutoBottom) {
        this.props.toggleAllowAutoBottom(false);
        this.setState({
          circleShown: true
        });
      }
    }
  }

  circleOnClick(event) {
    this.setState({
      circleShown: !this.state.circleShown
    });
  }

  render() {
    let sidebarWrapperClass = this.props.sidebarOut ? 'in' : '';
    let messageWrapperClass = this.props.sidebarOut ? 'in' : '';
    let circleClassName = "rounded-circle circle shadow-sm text-black-50" + (this.state.circleShown ? " bg-light" : " in bg-secondary")

    return (
      <div className='main-section-wrapper d-flex w-100 h-100'>
        <div id='message-wrapper' className={messageWrapperClass} ref={(ele) => this.mainDiv = ele}>
          <Messages scrollToBot={!this.state.circleShown}/>
          <div className="circle-wrapper">
            <div className={circleClassName} onClick={this.circleOnClick}>
              <FontAwesome className="fa-down" name="chevron-down" size="2x"/>
            </div>
          </div>
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
    sidebarOut: state.ui.sidebarOut,
    allowAutoBottom: state.ui.allowAutoBottom
  }
};

MainSection.propTypes = {
}

export default connect(mapStateToProps, { toggleAllowAutoBottom })(MainSection);
