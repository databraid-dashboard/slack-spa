// @flow

import React from 'react';
import { Image, List } from 'semantic-ui-react';
import TimeStamp from './TimeStamp';
import type { MessageType } from '../FlowTypes/';

export default function Message({ avatarImage, name, text, timestamp }: MessageType) {
  return (
    <List.Item className="listItem">
      <Image avatar src={avatarImage} />
      <List.Content>
        <List.Header>
          <span className="message-author">{name}</span>
          <TimeStamp timestamp={timestamp} />
          <List.Description className="message-text">{text}</List.Description>
        </List.Header>
      </List.Content>
    </List.Item>
  );
}
