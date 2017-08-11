// @flow

import { Dropdown, Image, Menu } from 'semantic-ui-react';
import React from 'react';
import slack from './images/slack_icon.png';
import frustrated from './images/emojis/frustrated.jpg';
import sad from './images/emojis/sad.jpg';
import neutral from './images/emojis/neutral.jpg';
import happy from './images/emojis/happy.jpg';
import smile from './images/emojis/smile.jpg';
import convertScoreToColorAndEmoji from './convertScoreToColorAndEmoji';

import './index.css';
import store from './store';
import Actions from './Actions';

const sentiments =
  {
    frustrated,
    sad,
    neutral,
    smile,
    happy,
  };


export default class Toolbar extends React.Component {
  componentWillMount() {
    const channels = Object.keys(store.getState().channelData);
    if (channels.length === 0) {
      store.dispatch(Actions.fetchChannels());
    }
    store.subscribe(() => this.forceUpdate());
  }

  props: {
    color: string,
    isShowingScores: boolean,
    score: mixed,
  };

  render() {
    const { color, score, isShowingScores } = this.props;
    const menuClasses = `ui ${color} inverted menu`;
    const { selectedChannel } = store.getState();
    const currentSentiment = convertScoreToColorAndEmoji(score).emoji;

    return (
      <Menu size="small" className={menuClasses}>
        <Menu.Item className="ui button">
          <Image avatar src={slack} />
        </Menu.Item>
        <Dropdown item text={selectedChannel || 'Select a channel'}>
          <Dropdown.Menu>
            {Object.keys(store.getState().channelData).map(
              channel =>
                (<Dropdown.Item
                  key={channel}
                  onClick={() => store.dispatch(Actions.selectChannel(channel))}
                  selected={channel === selectedChannel}
                >
                  {channel}
                </Dropdown.Item>),
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <Menu.Item className="ui button">
            <Image
              avatar
              src={sentiments[currentSentiment]}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
