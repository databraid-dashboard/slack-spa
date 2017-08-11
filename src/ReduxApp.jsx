// @flow
import React from 'react';
import { connect, Provider } from 'react-redux';
import App from './App';
import store from './store';

const ReduxApp = connect(
  state => ({
    isShowingScores: state.isShowingScores,
    messages: state.messages,
    score: state.score,
    selectedChannel: state.selectedChannel,
    slackSession: state.slackSession,
  }),
  {

    // onSlackLogin: Actions.slackLogin,
    // onSlackLoginSuccess: Actions.slackLoginSuccess,
    // onSlackLoginError: Actions.slackLoginError,
    // onStartConnecting: Actions.startConnecting,
    // onFinishConnecting: Actions.finishConnecting,
    // onFetchMessages: Actions.fetchMessages,
    // onFetchMessagesSuccess: Actions.fetchMessagesSuccess,
    // onFetchMessagesError: Actions.fetchMessagesError,
    // onOpenScoreModal: Actions.openScoreModal,
  },
)(App);

export default ReduxApp;
