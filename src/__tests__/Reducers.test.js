import { Reducer } from 'redux-testkit';
import { storeReducer } from '../Reducers/index';
import { processNewScores, processNewMessages } from '../Actions/index';

const initialState = {
  isShowingScores: false,
  isConnectedWithSlack: false,
  channelData: {},
  scoreData: undefined,
  selectedChannel: null,
};

describe('storeReducer', () => {
  it('should not do anything when action is unknown', () => {
    expect(storeReducer({ foo: 'bar' }, { type: 'UNKNOWN_ACTION' })).toEqual({ foo: 'bar' });
  });

  it('should have initial state', () => {
    expect(storeReducer(initialState, {})).toEqual(initialState);
  });

  it('should not affect state', () => {
    Reducer(storeReducer)
      .withState(initialState)
      .expect({ type: 'NOT_EXISTING' })
      .toReturnState(initialState);
  });

  it('should store boolean for slack connection', () => {
    const action = { type: 'CONNECTED_WITH_SLACK' };
    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({ ...initialState, isConnectedWithSlack: true });
  });

  it('should store selected channel', () => {
    const existingState = { ...initialState, selectedChannel: 1 };
    const action = { type: 'SELECT_CHANNEL', channel: 2 };
    Reducer(storeReducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({ ...initialState, selectedChannel: 2 });
  });

  it('should store channel list', () => {
    const action = {
      channels: [
        {
          channelId: 'C6DUVSW3A',
          channelName: 'dev',
        },
        {
          channelId: 'C6E2XMK4H',
          channelName: 'general',
        },
        {
          channelId: 'C6E2XMLAV',
          channelName: 'random',
        },
      ],
      type: 'RECEIVED_CHANNEL_LIST',
    };

    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({
        ...initialState,
        channelData: {
          dev: null,
          general: null,
          random: null,
        },
        selectedChannel: 'dev',
      });
  });

  // TODO: Fix this test
  xit('should store new messages for a channel', () => {
    const initialState = {
      widgets: {
        ids: ['slack'],
        byId: {
          slack: {
            isShowingScores: true,
            isConnectedWithSlack: true,
            channelData: {
              dev: null,
              general: null,
              random: null,
            },
            scoreData: {
              dev: '0.02',
            },
            selectedChannel: 'dev',
          },
        },
      },
    };

    const action = {
      channel: 'dev',
      messages: [
        {
          dev: {
            3: {
              messageId: 3,
              avatarImage:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
              name: 'Tyler Langenbrunner',
              userName: 'tylerlangenbrunner',
              text: 'Happy things! Look at this message. It is sooooo cool.',
              timestamp: '2017-08-01T22:20:43.643Z',
              rawTimestamp: '1501626043.643661',
              channelName: 'dev',
              statusEmoji: ':slack:',
            },
          },
        },
      ],
      type: 'RECEIVED_MESSAGES_FOR_CHANNEL',
    };

    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({
        ...initialState,
        dev: {
          3: {
            avatarImage:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
            channelName: 'dev',
            messageId: 3,
            name: 'Tyler Langenbrunner',
            rawTimestamp: '1501626043.643661',
            statusEmoji: ':slack:',
            text: 'Happy things! Look at this message. It is sooooo cool.',
            timestamp: '2017-08-01T22:20:43.643Z',
            userName: 'tylerlangenbrunner',
          },
        },
      });
  });

  // TODO: Fix this test
  xit('should store score for a channel', () => {
    const initialState = {
      isShowingScores: false,
      isConnectedWithSlack: false,
      channelData: {
        dev: null,
        general: null,
        random: null,
      },
      scoreData: undefined,
      selectedChannel: 'dev',
    };

    const action = {
      scoreData: [{ dev: '0.02' }],
      type: 'RECEIVED_SCORE_FOR_CHANNEL',
    };

    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({
        ...initialState,
        scoreData: { dev: '0.02' },
        isShowingScores: true,
      });
  });

  it('should store boolean indicating score presence', () => {
    const action = { type: 'SHOW_SCORE' };
    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({ ...initialState, isShowingScores: true });
  });

  it('should store score for recent messages', () => {
    const action = processNewScores({ Ch1: 0.2 });
    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({ ...initialState, isShowingScores: true, scoreData: { Ch1: 0.2 } });
  });

  it('should store new message', () => {
    const newMessageData = {
      1: {
        1: 'This is a message',
      },
      2: {
        2: 'Here is another new message',
      },
    };
    const action = processNewMessages(newMessageData);
    Reducer(storeReducer)
      .withState(initialState)
      .expect(action)
      .toReturnState({ ...initialState, channelData: newMessageData });
  });
});
