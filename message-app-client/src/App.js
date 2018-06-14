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
        <Container>
          <LoginModal className='loginModal'/>
          <Row className="fixed-top">
            <Col>
              <InfoHeader />
            </Col>
          </Row>
          <Row className="scrollable-middle">
            <Col>
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

// <Provider store={store}>
//   <Container>
//     <LoginModal className='loginModal'/>
//     <Row className="sticky-top">
//       <Col>
//         <InfoHeader />
//       </Col>
//     </Row>
//     <Row className="scrollable-middle">
//       <Col>
//         <Messages />
//       </Col>
//     </Row>
//     <Row className='sticky-bottom'>
//       <Col>
//         <TextForm />
//       </Col>
//     </Row>
//   </Container>
// </Provider>
// );
// }
// }



export default App;
