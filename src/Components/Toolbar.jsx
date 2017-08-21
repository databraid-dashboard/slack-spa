// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { selectChannel, fetchChannels } from '../Actions/index.js';
import convertScoreToColorAndEmoji from '../convertScoreToColorAndEmoji';
import frustrated from '../images/emojis/frustrated.jpg';
import happy from '../images/emojis/happy.jpg';
import neutral from '../images/emojis/neutral.jpg';
import sad from '../images/emojis/sad.jpg';
import slack from '../images/slackIcon.png';
import smile from '../images/emojis/smile.jpg';
import '../index.css';

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
    // color: string,
    isShowingScores: boolean,
    score: mixed,
  };

  render() {
    const { score, selectedChannel, channelData, selectChannel } = this.props;
    console.log(score);
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

const mapStateToProps = (state, ownProps) => ({
  selectedChannel: state.selectedChannel,
  score: state.scoreData[state.selectedChannel],
  channelData: state.channelData,

});
const mapDispatchToProps = dispatch => bindActionCreators({ selectChannel, fetchChannels }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
