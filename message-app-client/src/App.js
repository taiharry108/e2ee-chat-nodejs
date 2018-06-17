import React, { Component } from 'react';
import './app.css';
import { Provider } from 'react-redux';
import store from './store';
import AppWrapper from './components/app-wrapper';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWrapper/>
      </Provider>
    );
  }
}

export default App;
