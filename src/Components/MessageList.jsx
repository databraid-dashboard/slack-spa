// @flow

/* eslint-disable */
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessagesForChannel } from '../Actions/index';
import Message from './Message';
// import owl from '../images/avatars/owl.png';
import type { Dispatch, OwnProps, State } from '../FlowTypes/';

import injectWidgetId from '../Utils/utils';

export class MessageList extends Component {
  props: {
    selectedChannel: ?string,
    messages: {},
    fetchMessagesForChannel: Function,
  };

  render() {
    let { messages, selectedChannel, fetchMessagesForChannel } = this.props;

    if (!messages) {
      if (selectedChannel) {
        fetchMessagesForChannel(selectedChannel);
      }
      messages = {};
    }

    const messageIds = Object.keys(messages);

    const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive'];

    /*
    messageId: 3

    userId: "U6T3VM814"

    channelId: "C6DUVSW3A"

    rawTs: "1501626043.643661"

    messageTimestamp: "2017-08-01T22:20:43.643Z"

    message: "Happy things! Look at this message. It is sooooo cool."

    channelName: "dev"

    userName: "tylerlangenbrunner"

    realName: "Tyler Langenbrunner"

    firstName: "Tyler"

    lastName: "Langenbrunner"

    statusEmoji: ":slack:"

    image24: "https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png"

    image512: "https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png
    */

    return (
      <List celled size={sizes[3]}>
        {messageIds.map(msgId => {
          // const { userMapId, message, messageTimestamp, rawTs } = messages[msgId];
          const { avatarImage, name, text, timestamp } = messages[msgId];
          return (
            <Message
              key={timestamp}
              avatarImage={avatarImage}
              name={name}
              text={text}
              timestamp={timestamp}
            />
          );
        })}
      </List>
    );
  }
}

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  let id = ownProps.widgetId;
  const selectedChannel = state.widgets.byId[id].selectedChannel;
  const messages = state.widgets.byId[id].channelData[selectedChannel];
  return {
    selectedChannel,
    messages,
    // currentScore,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchMessagesForChannel }, dispatch);

export default injectWidgetId(connect(mapStateToProps, mapDispatchToProps)(MessageList));
