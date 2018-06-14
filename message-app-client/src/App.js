import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Messages from './components/messages';
import TextForm from './components/textform';
import MemberBox from './components/memberBox';
import LoginModal from './components/loginModal';
import InfoHeader from './components/info-header';
import { Container, Row, Col } from 'reactstrap';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <LoginModal className='loginModal'/>
          <header className="App-header sticky-top">
            <InfoHeader />
          </header>
          <div className="App-main">
            <Container className="main">
              <Row>
                <Col>
                  <Messages />
                </Col>
              </Row>
            </Container>
          </div>
          <footer className="App-footer">
            <Container>
              <Row>
                <Col className="textform-col"><TextForm /></Col>
              </Row>
            </Container>
          </footer>
        </div>
      </Provider>
    );
  }
}


export default App;
