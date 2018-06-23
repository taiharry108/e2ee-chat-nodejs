import React, { Component } from 'react';
import './app.css';
import { Provider } from 'react-redux';
import store from './store';
import AppWrapper from './components/app-wrapper';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faChevronDown, faMinus, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(far, faCheckCircle, faChevronDown, faChevronDown, faMinus, faTimes, faSpinner)

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
