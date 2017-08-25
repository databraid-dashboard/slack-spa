// @flow

/* eslint-disable */

/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginView from './Components/LoginView';
import MessageList from './Components/MessageList';
import Toolbar from './Components/Toolbar';
import type { State } from './FlowTypes/';
import './App.css';

class App extends Component {
  props: {
    isConnectedWithSlack: boolean,
    selectedChannel: mixed,
  };

  render() {
    const { isConnectedWithSlack, selectedChannel } = this.props;

    if (!isConnectedWithSlack) {
      return <LoginView />;
    }

    return (
      <div>
        <div>
          <Toolbar />
        </div>
        <div className="listColor">
          <MessageList selectedChannel={selectedChannel} />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state: State) => {
  const currentScore = state.scoreData[state.selectedChannel] || 0.01;
  const messages = state.channelData[state.selectedChannel] || {};
  return {
    // isShowingScores: state.isShowingScores,
    messages,
    score: state.score,
    selectedChannel: state.selectedChannel,
    isConnectedWithSlack: state.isConnectedWithSlack,
    // slackSession: state.slackSession,
    currentScore,
  };
};

export default connect(mapStateToProps)(App);
