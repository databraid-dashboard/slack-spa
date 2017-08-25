// @flow

import type {
  MessageType,
  Id,
  Dispatch,
  GetState,
} from '../FlowTypes/';

// const PATH = 'https://databraid.localtunnel.me';
const PATH = 'http://localhost:4000/';

/* eslint func-names: ["error", "never"] */
function fetchRequest(path) {
  return fetch(path);
}

export function connectWithSlack() {
  return {
    type: 'CONNECTED_WITH_SLACK',
  };
}

export function fetchChannels() {
  return async function (dispatch: Dispatch) {
    const response = await fetchRequest(`${PATH}channels`);
    const channels = await response.json();
    dispatch({
      channels,
      type: 'RECEIVED_CHANNEL_LIST',
    });
  };
}


export function fetchMessagesForChannel(channel: string) {
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

export function processNewMessages(newMessageData: {[string]: ?{[Id]: {[Id]: MessageType}}}) {
  // Mark that we have messages to avoid fetching multiple times.
  return {
    messages: newMessageData,
    type: 'RECEIVED_NEW_MESSAGES',
  };
}

export function processNewScores(scoreData: {[string]: number}) {
  return {
    scoreData,
    type: 'RECEIVED_NEW_SCORE',
  };
}

export function selectChannel(channel: string) {
  return {
    channel,
    type: 'SELECT_CHANNEL',
  };
}
