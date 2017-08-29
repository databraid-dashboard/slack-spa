// @flow

import type { Dispatch, GetState } from '../FlowTypes';

// const PATH = 'https://databraid.localtunnel.me';
const PATH = 'http://localhost:4000/';

/* eslint func-names: ["error", "never"] */
function fetchRequest(path) {
  return fetch(path);
}

export default class SLACK_API {

  static fetchChannels() {
    return async function (dispatch: Dispatch) {
      const response = await fetchRequest(`${PATH}channels`);
      const channels = await response.json();
      dispatch({
        channels,
        type: 'RECEIVED_CHANNEL_LIST',
      });
    };
  }

  static fetchMessagesForChannel(channel: string) {
    return async function (dispatch: Dispatch, getState: GetState) {
      const oldMessages = getState().channelData[channel];
      if (oldMessages) {
        // Don't fetch again if we already have messages.
        return;
      }
      // Mark that we have messages to avoid fetching multiple times.
      dispatch({
        channel,
        messages: {},
        type: 'RECEIVED_MESSAGES_FOR_CHANNEL',
      });

      // TODO: replace with real Api call
      fetch('http://localhost:4000/messages');
    };
  }
}
