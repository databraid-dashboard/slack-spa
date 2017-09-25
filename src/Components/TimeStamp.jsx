// @flow

import React from 'react';
import moment from 'moment';
import type { TimeStampType } from '../FlowTypes/';

export default function TimeStamp({ timestamp }: TimeStampType) {
  return (
    <span className="message-timestamp">
      {`\t${moment.utc(timestamp).format('LLLL')}`}
    </span>
  );
}
