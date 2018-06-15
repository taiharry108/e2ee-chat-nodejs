import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Messages from './components/messages';
import TextForm from './components/textform';
import LoginModal from './components/loginModal';
import InfoHeader from './components/info-header';
import { Container, Row, Col } from 'reactstrap';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container className='whole-container'>
          <Row>
            <Col>
              <LoginModal className='loginModal'/>
            </Col>
          </Row>
          <Row className="sticky-top">
            <Col className='px-0'>
              <InfoHeader />
            </Col>
          </Row>
          <Row className="scrollable-middle">
            <Col className='px-0'>
              <Messages />
            </Col>
          </Row>
          <Row className="fixed-bottom">
            <Col>
              <TextForm />
            </Col>
          </Row>
        </Container>
      </Provider>
    );
  }
}
export default App;
