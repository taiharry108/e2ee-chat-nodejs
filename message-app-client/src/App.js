import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import Messages from './components/messages';
import TextForm from './components/textform';
import LoginModal from './components/loginModal';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <LoginModal className='loginModal'/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <footer className="App-footer">
            <div>
              <Messages />
            </div>
            <div>
              <TextForm />
            </div>
          </footer>
        </div>
      </Provider>
    );
  }
}


export default App;
