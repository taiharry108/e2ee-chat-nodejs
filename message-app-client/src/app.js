import React, { Component } from 'react';
import './app.css';
import { Provider } from 'react-redux';
import store from './store';
import AppWrapper from './components/app-wrapper';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path='/' component={AppWrapper}/>
        </Router>
      </Provider>
    );
  }
}

export default App;
