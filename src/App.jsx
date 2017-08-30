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
  const selectedChannel = state.selectedChannel;
  const isConnectedWithSlack = state.isConnectedWithSlack;
  const isShowingScores = state.isShowingScores;
  // const slackSession = state.slackSession;
  // const currentScore = state.scoreData[state.selectedChannel] || 0.01;
  // const messages = state.channelData[state.selectedChannel] || {};
  // const store = state.score,

  return {
    selectedChannel,
    isConnectedWithSlack,
    isShowingScores,
    // messages,
    // score,
    // currentScore,
  };
};

export default connect(mapStateToProps)(App);
