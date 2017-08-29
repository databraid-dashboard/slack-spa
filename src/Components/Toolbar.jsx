// @flow

/* eslint-disable */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { selectChannel } from '../Actions/index';
import SLACK_API from '../Utils/Api'
import convertScoreToColorAndEmoji from '../Utils/';
import frustrated from '../images/emojis/frustrated.jpg';
import happy from '../images/emojis/happy.jpg';
import neutral from '../images/emojis/neutral.jpg';
import sad from '../images/emojis/sad.jpg';
import slack from '../images/slackIcon.png';
import smile from '../images/emojis/smile.jpg';
import '../index.css';
import type { ChannelData } from '../FlowTypes/';
import injectWidgetId from '../Utils/utils';
import type { Dispatch, OwnProps, State } from '../FlowTypes/';

const sentiments =
  {
    frustrated,
    sad,
    neutral,
    smile,
    happy,
  };

export class Toolbar extends React.Component {
  componentWillMount() {
    const channels = Object.keys(this.props.channelData);
    if (channels.length === 0) {
      this.props.fetchChannels();
    }
  }

  props: {
    score: mixed,
    channelData: ChannelData,
    fetchChannels: Function,
    selectChannel: mixed,
    selectedChannel: mixed,
  };

  render() {
    const { score, selectedChannel, channelData, selectChannel } = this.props;
    const currentSentiment = convertScoreToColorAndEmoji(score).emoji;
    const computedColor = convertScoreToColorAndEmoji(score).color;
    const menuClasses = `ui ${computedColor} inverted menu`;

    return (
      <Menu size="small" className={menuClasses}>
        <Menu.Item className="ui button">
          <Image avatar src={slack} />
        </Menu.Item>
        <Dropdown item text={selectedChannel || 'Select a channel'}>
          <Dropdown.Menu>
            {Object.keys(channelData).map(
              channel =>
                (<Dropdown.Item
                  key={channel}
                  onClick={() => selectChannel(channel)}
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

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const id = ownProps.widgetId;
  const selectedChannel =
    state.widgets.byId[id].selectedChannel;
  const score =
    state.widgets.byId[id].scoreData[state.widgets.byId[id].selectedChannel];
  const channelData = state.widgets.byId[id].channelData;

  return {
    channelData,
    score,
    selectedChannel,
  }
};

const fetchChannels = SLACK_API.fetchChannels;
export const mapDispatchToProps = (dispatch: Dispatch) =>
bindActionCreators({
  selectChannel, fetchChannels,
}, dispatch);

export default injectWidgetId(connect(mapStateToProps, mapDispatchToProps)(Toolbar));
