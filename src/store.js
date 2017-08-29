// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import SLACK_API from './Utils/Api';
import rootReducer from './Reducers/index';

/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(thunkMiddleware.withExtraArgument({ SLACK_API})),
  ));

export default store;
