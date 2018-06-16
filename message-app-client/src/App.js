import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Messages from './components/messages';
import TextForm from './components/textform';
import LoginModal from './components/loginModal';
import InfoHeader from './components/info-header';
import SideBar from './components/side-bar';
import { Container, Row, Col } from 'reactstrap';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container className='whole-container shadow'>
          <Row>
            <Col>
              <LoginModal className='loginModal'/>
            </Col>
          </Row>
          <Row className="sticky-top fixed-header">
            <Col className='px-0'>
              <InfoHeader />
            </Col>
          </Row>
          <Row className="scrollable-middle">
            <Col className='px-0'>
              <Messages />
            </Col>
          </Row>
          <Row>
            <Col className="px-0">
              <TextForm/>
            </Col>
          </Row>
        </Container>
      </Provider>
    );
  }
}


  // <div className='app-wrapper'>
  //   <Container className='whole-container shadow'>
  //     <div className="modal-container">
  //       <LoginModal className='loginModal'/>
  //     </div>
  //     <div className="d-flex flex-column">
  //       <div>
  //         <InfoHeader />
  //       </div>
  //       <div className="flex-middle">
  //         <Messages />
  //       </div>
  //       <div className="flex-bottom">
  //         <TextForm/>
  //       </div>
  //     </div>
  //   </Container>
  // </div>
//

export default App;
