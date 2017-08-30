// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import getSocket from './Sockets/';
import store from './store';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  React.createElement(Provider, { store }, React.createElement(App)),
  document.getElementById('root'),
);
registerServiceWorker();

getSocket();
