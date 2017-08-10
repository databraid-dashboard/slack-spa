// @flow

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

export type Id = mixed;

export type MessageType = {
  avatarImage: string,
  name: string,
  text: string,
  timestamp: string,
};

type ChannelData = {[string]: ?{[Id]: {[Id]: MessageType}}};

export type State = {
  isShowingScores: boolean,
  isConnectedWithSlack: boolean,
  channelData: ChannelData,
  scoreData: {[string]: ?number},
  selectedChannel: ?string,
};

export function storeReducer(state: State, action): State {
  let newChannelData: ChannelData;
  let newScoreData: {[string]: ?number};

  switch (action.type) {
    case 'CONNECTED_WITH_SLACK':
      return {
        ...state,
        isConnectedWithSlack: true,
      };
    case 'SELECT_CHANNEL':
      return {
        ...state,
        selectedChannel: action.channel,
      };
    case 'RECEIVED_CHANNEL_LIST':
      newChannelData = { ...state.channelData };
      action.channels.forEach((channel) => {
        newChannelData[channel] = newChannelData[channel] || null;
      });
      let newSelectedChannel = state.selectedChannel;
      if (!newSelectedChannel) {
        newSelectedChannel = action.channels[0];
      }
      return {
        ...state,
        channelData: newChannelData,
        selectedChannel: newSelectedChannel,
      };
    case 'RECEIVED_MESSAGES_FOR_CHANNEL':
      newChannelData = { ...state.channelData };
      newChannelData[action.channel] = { ...newChannelData[action.channel] };
      Object.keys(action.messages).forEach((id) => {
        newChannelData[action.channel][id] = action.messages[id];
      });
      return {
        ...state,
        channelData: newChannelData,
      };

    case 'RECEIVED_NEW_SCORE':
      newScoreData = { ...state.scoreData, ...action.scoreData };
      return {
        ...state,
        isShowingScores: true,
        scoreData: newScoreData,
      };
    case 'SHOW_SCORE':
      return {
        ...state,
        isShowingScores: true,
      };

    case 'RECEIVED_NEW_MESSAGES':
      newChannelData = { ...state.channelData };
      Object.keys(action.messages).forEach((channelId) => {
        newChannelData[channelId] = { ...newChannelData[channelId] };
        Object.keys(action.messages[channelId]).forEach((messageId) => {
          newChannelData[channelId][messageId] = action.messages[channelId][messageId];
        });
      });

      return {
        ...state,
        channelData: newChannelData,
      };

    default:
      return state;
  }
}

const store = createStore(
  storeReducer,
  {
    isShowingScores: false,
    isConnectedWithSlack: false,
    channelData: {},
    scoreData: {},
    selectedChannel: null,
  },
  applyMiddleware(
    thunkMiddleware,
  ),
);

/* es-lint-disable-nextline */
store.subscribe(() => {
  console.log('State: ', store.getState());
});

// TODO: remove
window.store = store;


export default store;
