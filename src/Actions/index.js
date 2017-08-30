// @flow

import type { MessageType, Id, Dispatch, GetState } from '../FlowTypes/';

const PATH = 'http://localhost:8001/';

/* eslint func-names: ["error", "never"] */
function fetchRequest(path) {
  return fetch(path).then(response => response.json());
}

export function connectWithSlack() {
  return {
    type: 'CONNECTED_WITH_SLACK',
  };
}

export function fetchChannels() {
  return async function (dispatch: Dispatch) {
    const channels = await fetchRequest(`${PATH}channels`);

    dispatch({
      channels,
      type: 'RECEIVED_CHANNEL_LIST',
    });
  };
}

export function fetchMessagesForChannel(channel: string) {
  return async function (dispatch: Dispatch, getState: GetState) {
    const oldMessages = getState().channelData[channel];

    if (oldMessages) return;

    const messages = await fetchRequest(`${PATH}messages/${channel}`);

    dispatch({
      channel,
      messages,
      type: 'RECEIVED_MESSAGES_FOR_CHANNEL',
    });
  };
}

export function processNewMessages(newMessageData: { [string]: ?{ [Id]: { [Id]: MessageType } } }) {
  return {
    messages: newMessageData,
    type: 'RECEIVED_NEW_MESSAGES',
  };
}

export function processNewScores(scoreData: { [string]: number }) {
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
