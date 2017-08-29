// @flow

/* eslint-disable */
import React from 'react';
import { List } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SLACK_API from '../Utils/Api';
import Message from './Message';
import owl from '../images/avatars/owl.png';
import type { Dispatch, OwnProps, State } from '../FlowTypes/';

import injectWidgetId from '../Utils/utils';

class MessageList extends React.Component {
  props: {
    selectedChannel: ?string,
    messages: {},
  }

  render() {
    const { selectedChannel } = this.props;
    let { messages } = this.props;

// TODO: remove this code - will fetch messages through sockets
    if (!messages) {
      if (selectedChannel) {
        setTimeout(
          () => fetchMessagesForChannel(selectedChannel),
          0,
        );
      }
      messages = {};
    }

    const messageIds = Object.keys(messages);

    return (
      <List celled>
        {messageIds.map((msgId) => {
          const { avatarImage, name, text, timestamp } = messages[msgId];
          return (
            <Message
              key={msgId}
              avatarImage={owl}
              name={name}
              text={`${avatarImage} says: ${text}`}
              timestamp={timestamp}
            />
          );
        })}
      </List>
    );
  }
}

export { MessageList };

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  let id = ownProps.widgetId;
  const messages = state.widgets.byId[id].channelData[state.widgets.byId[id].selectedChannel];
  return {
    messages,
    selectedChannel: state.widgets.byId[id].selectedChannel,
    // currentScore,
  };
};

const fetchMessagesForChannel = SLACK_API.fetchMessagesForChannel;
export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchMessagesForChannel }, dispatch);

export default injectWidgetId(connect(mapStateToProps, mapDispatchToProps)(MessageList));
