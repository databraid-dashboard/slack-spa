// @flow
import React, { Component } from 'react';
import LoginView from './LoginView';
import MessageList from './MessageList';
import Toolbar from './Toolbar';
import convertScoreToColorAndEmoji from './convertScoreToColorAndEmoji';
import './App.css';
import store from './store';

// type AppProps = {
//
// };
//
// export default function App(props: AppProps) {
//   // const messages = ...;

class App extends Component {
  componentWillMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const currentScore = state.scoreData[state.selectedChannel] || 0.01;
    const computedColor = convertScoreToColorAndEmoji(currentScore).color;
    // const computedEmoji = convertScoreToColorAndEmoji(currentScore).emoji;

    if (!state.isConnectedWithSlack) {
      return <LoginView />;
    }

    return (
      <div>
        <div>
          <Toolbar
            color={computedColor}
            score={currentScore}
            isShowingScores={false}
          />
        </div>
        <div className="listColor">
          <MessageList selectedChannel={state.selectedChannel} />
        </div>
      </div>
    );
  }
}

export default App;
