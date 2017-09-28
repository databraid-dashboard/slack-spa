// @flow

/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { processNewMessages, processNewScores, fetchScoreForChannel, connectWithSlack } from './Actions/index';
import LoginView from './Components/LoginView';
import MessageList from './Components/MessageList';
import injectWidgetId from './Utils/utils';
import Toolbar from './Components/Toolbar';
import convertScoreToColorAndEmoji from './Utils/';
import type { DefaultProps, Dispatch, OwnProps, State } from './FlowTypes/';
import { WIDGET_ID } from './Constants/';
import './App.css';


class App extends React.Component<DefaultProps, OwnProps, State> {
  state: State;
  socket: Object;

  componentWillMount() {
    this.props.connectWithSlack();
    this.socket = io.connect(process.env.REACT_APP_SLACK_API_URL);
    this.socket.on('messages', messages => {
      this.props.processNewMessages(messages);
    });

    this.socket.on('score', scoreData => {
      this.props.processNewScores(scoreData);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
    //console.dir('Disconnecting Socket as component will unmount');
  }

  getChildContext() {
    return { widgetId: this.props.widgetId };
  }

  props: {
    score: mixed,
    fetchScoreForChannel: PropTypes.func,
    processNewMessages: PropTypes.func,
    processNewScores: PropTypes.func,
    isConnectedWithSlack: boolean,
    selectedChannel: mixed,
    widgetId: string,
  };


  render() {
    const { score, isConnectedWithSlack, fetchScoreForChannel, selectedChannel } = this.props;
    const computedColor = convertScoreToColorAndEmoji(score).color;
    const sentiment = `${computedColor}`;

    if (!isConnectedWithSlack) {
      return <LoginView />;
    }

    return (
      <div>
        <div>
          <Toolbar />
        </div>
        <div className={sentiment}>
          <MessageList selectedChannel={selectedChannel} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  widgetId: PropTypes.string.isRequired,
};

App.defaultProps = {
  widgetId: WIDGET_ID,
  isShowingScores: false, // will need this later
  isConnectedWithSlack: false,
  channelData: { redux: {} },
  scoreData: { score: null },
  selectedChannel: null,
};

App.childContextTypes = {
  widgetId: PropTypes.string,
};

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const id = ownProps.widgetId;
  const messages = state.widgets.byId[id].channelData[state.widgets.byId[id].selectedChannel];

  const isConnectedWithSlack = state.widgets.byId[id].isConnectedWithSlack;
  const selectedChannel = state.widgets.byId[id].selectedChannel;
  const score = state.widgets.byId[id].scoreData[selectedChannel];
  const isShowingScores = state.widgets.byId[id].isShowingScores;

  return {
    isShowingScores,
    messages,
    score,
    selectedChannel,
    isConnectedWithSlack,
    // slackSession: state.slackSession,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchScoreForChannel,
      processNewMessages,
      processNewScores,
      connectWithSlack,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
