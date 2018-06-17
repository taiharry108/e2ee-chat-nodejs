import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import MainSection from './components/main-section';
import TextForm from './components/textform';
import LoginModal from './components/loginModal';
import InfoHeader from './components/info-header';
import { Container } from 'reactstrap';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}


//

// <Container className='whole-container shadow'>
//   <Row>
//     <Col>
//       <LoginModal className='loginModal'/>
//     </Col>
//   </Row>
//   <Row className="sticky-top fixed-header">
//     <Col className='px-0'>
//       <InfoHeader />
//     </Col>
//   </Row>
//   <Row className="scrollable-middle">
//     <Col className='px-0'>
//       <Messages />
//     </Col>
//   </Row>
//   <Row>
//     <Col className="px-0">
//       <TextForm/>
//     </Col>
//   </Row>
// </Container>

//

export default App;
