// @flow

/* eslint-disable */
import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessagesForChannel } from '../Actions/index';
import Message from './Message';
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
NOTE: Properties available for each message:
 - messageId* (integer): Primary key from database table. *Only a property of messages retrieved fmor the database, not on messages emitted via Socket.io
 - avatarImage (string): Image size 24
 - name (string): "Real name", e.g. 'Kurtis Houser'
 - userName (string): "User name", e.g. 'thekurtishouser' or other
 - text (string): The message
 - timestamp (string): Formatted timestamp, e.g. '2017-08-01T22:20:43.643Z'
 - rawTimestamp (string): Raw timestamp e.g. '1501626043.643661'
 - channelName (string): Name of the the channel, e.g. 'dev'
 - statusEmoji (string): As labeled internally by slack, e.g. ':slack:'
*/

    return (
      <List celled size={sizes[2]} className="scrolling">
        {messageIds.map(msgId => {
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
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchMessagesForChannel }, dispatch);

export default injectWidgetId(connect(mapStateToProps, mapDispatchToProps)(MessageList));
