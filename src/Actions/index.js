// @flow
// import SLACK_API from '../Utils/Api';
// import { WIDGET_ID } from '../Constants/index';
import type { MessageType, Id, Dispatch, GetState, SlackApi } from '../FlowTypes/';

/* eslint func-names: ["error", "never"] */

export function connectWithSlack() {
  return {
    type: 'CONNECTED_WITH_SLACK',
  };
}

export function fetchChannels() {
  return async (dispatch: Dispatch, getState: GetState, { SLACK_API }: SlackApi) => {
    const channels = await SLACK_API.fetchRequestChannels();
    dispatch({
      channels,
      type: 'RECEIVED_CHANNEL_LIST',
    });
  };
}

export function fetchMessagesForChannel(channel: string) {
  return async (dispatch: Dispatch, getState: GetState, { SLACK_API }: SlackApi) => {
    const messages = await SLACK_API.fetchRequestMessagesForChannel(channel);

    dispatch({
      channel,
      messages,
      type: 'RECEIVED_MESSAGES_FOR_CHANNEL',
    });
  };
}

export function fetchScoreForChannel(channel: string) {
  return async (dispatch: Dispatch, getState: GetState, { SLACK_API }: SlackApi) => {
    const scoreData = await SLACK_API.fetchRequestScoreForChannel(channel);

    dispatch({
      scoreData,
      type: 'RECEIVED_SCORE_FOR_CHANNEL',
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
