// @flow

import React from 'react';
import { List } from 'semantic-ui-react';
import Message from './Message';
import owl from './images/avatars/owl.png';

import store from './store';
import Actions from './Actions';

export default class MessageList extends React.Component {
  componentWillMount() {
    store.subscribe(() => this.forceUpdate());
  }

  props: {
    selectedChannel: ?string,
  }

  render() {
    const { selectedChannel } = this.props;
    let messages = store.getState().channelData[this.props.selectedChannel];
    if (!messages) {
      if (selectedChannel) {
        setTimeout(
          () => store.dispatch(Actions.fetchMessagesForChannel(selectedChannel)),
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
