import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Messages from './components/messages';
import TextForm from './components/textform';
import MemberBox from './components/memberBox';
import LoginModal from './components/loginModal';
import { Container, Row, Col } from 'reactstrap';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <LoginModal className='loginModal'/>
          <header className="App-header sticky-top">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-main">
            <Container fluid={true}>
              <Row>
                <Col>
                  <Messages />
                </Col>
              </Row>
            </Container>
          </div>
          <footer className="App-footer">
            <Container fluid={true}>
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
