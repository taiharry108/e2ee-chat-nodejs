import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/bootstrap.css';
import './css/emoji-mart.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
