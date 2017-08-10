import { Reducer } from 'redux-testkit';
import { storeReducer } from '../store.js';

const initialState = {
  isShowingScores: false,
  isConnectedWithSlack: false,
  channelData: {},
  scoreData: {},
  selectedChannel: null,
};

describe('storeReducer', () => {

  it('should have initial state', () => {
    expect(storeReducer(initialState, {})).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(storeReducer).withState(initialState).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
  });

  it('should store boolean for slack connection', () => {
    const action = {type: 'CONNECTED_WITH_SLACK'};
    Reducer(storeReducer).withState(initialState).expect(action).toReturnState({...initialState, isConnectedWithSlack: true});
  });

  it('should store selected channel', () => {
    const existingState = {...initialState, selectedChannel: 1};
    const action = {type: 'SELECT_CHANNEL', channel: 2};
    Reducer(storeReducer).withState(existingState).expect(action).toReturnState({...initialState, selectedChannel: 2});
  });

  it('should store new channel data', () => {
    const channels = ['#random', '#general', '#redux'];
    const existingState = {...initialState, selectedChannel: 1};
    const action = {type: 'RECEIVED_CHANNEL_LIST', channels};
    Reducer(storeReducer).withState(existingState).expect(action).toReturnState({...initialState, channelData: {'#random': null, '#general': null, '#redux': null}, selectedChannel: 1});
  });

  it('should store messages for channel', () => {
    // const action = {type: 'RECEIVED_MESSAGES_FOR_CHANNEL'};
    // Reducer(storeReducer).withState(initialState).expect(action).toReturnState({...initialState, channelData: {}});

    //***Not sure how the action associated with this is supposed to work
  });

  it('should store new score', () => {
    const action = {
      type: 'RECEIVED_NEW_SCORE',
      scoreData: {'#random': 0.02}
    };
    Reducer(storeReducer).withState(initialState).expect(action).toReturnState({...initialState, isShowingScores: true, scoreData: {'#random': 0.02}});
  });

  // it('should store boolean indicating score presence', () => {
  //   const action = {type: 'SHOW_SCORE'};
  //   Reducer(storeReducer).withState(initialState).expect(action).toReturnState({...initialState, isShowingScores: true});
  // });
    //********Unnecessary reducer

  it('should store new message', () => {
    const newMessageData = {
      1: {
        1: 'This is a message',
      },
      1: {
        2: 'Here is another new message',
      }
    };
    const action = {type: 'RECEIVED_NEW_MESSAGES', messages: newMessageData};

    const newChannelData = {"1": {"2": "Here is another new message"}};
    Reducer(storeReducer).withState(initialState).expect(action).toReturnState({...initialState, channelData: newChannelData});
  });

});
