// @flow

/* eslint-disable */
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessagesForChannel } from '../Actions/index';
import Message from './Message';
import owl from '../images/avatars/owl.png';
import type { Dispatch, State } from '../FlowTypes/';

export class MessageList extends Component {
  props: {
    selectedChannel: ?string,
    messages: {},
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

    return (
      <List celled>
        {messageIds.map(msgId => {
          const { userMapId, message, messageTimestamp, rawTs } = messages[msgId];
          return (
            <Message
              key={rawTs}
              avatarImage={owl}
              name={userMapId}
              text={`${userMapId} says: ${message}`}
              timestamp={messageTimestamp}
            />
          );
        })}
      </List>
    );
  }
}

export const mapStateToProps = (state: State) => {
  const selectedChannel = state.selectedChannel;
  const messages = state.channelData[selectedChannel];
  return {
    selectedChannel,
    messages,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchMessagesForChannel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
