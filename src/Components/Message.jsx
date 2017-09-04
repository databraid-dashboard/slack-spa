// @flow

import React from 'react';
import { Image, List } from 'semantic-ui-react';
import type { MessageType } from '../FlowTypes/';

export default function Message({ avatarImage, name, text, timestamp }: MessageType) {
  return (
    <List.Item className="listItem">
      <Image avatar src={avatarImage} />
      <List.Content>
        <List.Header>
          {`${name}`}
          {/* {`${name}, ${timestamp}`} */}
          <List.Description>
            {text}
            {timestamp}
          </List.Description>
        </List.Header>
      </List.Content>
    </List.Item>
  );
}
