import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainSection from './main-section';
import TextForm from './textform';
import LoginModal from './loginModal';
import InfoHeader from './info-header';
import { Container } from 'reactstrap';
import './app-wrapper.css'

class AppWrapper extends Component {
  render() {
    let sidebarWrapperClass = this.props.sidebarOut ? 'in' : '';
    return (
      <div className='app-wrapper'>
        <div className="modal-container">
          <LoginModal className='loginModal'/>
        </div>
        <Container className='whole-container shadow px-0'>
          <div className="main-container d-flex flex-column">
            <div className="order-1">
              <InfoHeader />
            </div>
            <div className="flex-middle order-2 flex-fill">
              <MainSection />
            </div>
            <div className="flex-bottom order-3">
              <TextForm/>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    sidebarOut: state.ui.sidebarOut
  }
};

AppWrapper.propTypes = {
}

export default connect(mapStateToProps, {  })(AppWrapper);
