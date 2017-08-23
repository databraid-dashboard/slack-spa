// @flow

/* eslint-disable */
import React from 'react';
import { List } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMessagesForChannel } from '../Actions/index';
import Message from './Message';
import owl from '../images/avatars/owl.png';
import type { Dispatch, State } from '../FlowTypes/';

class MessageList extends React.Component {
  props: {
    selectedChannel: ?string,
    messages: {},
  }

  render() {
    const { selectedChannel } = this.props;
    let { messages } = this.props;
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

export const mapStateToProps = (state: State) => {
  const messages = state.channelData[state.selectedChannel];
  return {
    messages,
    selectedChannel: state.selectedChannel,
    // currentScore,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchMessagesForChannel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
