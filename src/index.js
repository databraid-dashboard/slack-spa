// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { WIDGET_ID } from './Constants/';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
/* eslint-disable react/jsx-filename-extension */

ReactDOM.render(
  <Provider store={store}>
    <App widgetId={WIDGET_ID} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();


export default App;
