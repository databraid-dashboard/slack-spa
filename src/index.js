// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import openSocket from 'socket.io-client';
import actions from './Actions';
import store from './store';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root'),
);
registerServiceWorker();

// const socket = openSocket('http://localhost:4000');
const socket = openSocket('https://databraid.localtunnel.me');


socket.on('messages', (messages) => {
  store.dispatch(actions.processNewMessages(messages));
});

socket.on('score', (scoreData) => {
  store.dispatch(actions.processNewScores(scoreData));
});
