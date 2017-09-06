import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../Actions/index';

describe('Actions', () => {
  it('should return an action object from connecting with Slack', () => {
    const action = actions.connectWithSlack();
    expect(action).toEqual({
      type: 'CONNECTED_WITH_SLACK',
    });
  });

  it('return an action object from fetchChannels', () => {
    const mockApiFetchChannels = jest.fn();
    mockApiFetchChannels.mockReturnValue(
      Promise.resolve([
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
      ]),
    );

    const extraArgument = {
      SLACK_API: {
        fetchRequestChannels: mockApiFetchChannels,
      },
    };

    const initialState = {
      isShowingScores: false,
      isConnectedWithSlack: true,
      channelData: {},
      scoreData: {},
      selectedChannel: null,
    };

    const expectedActions = [
      {
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
      },
    ];

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(initialState);

    return store.dispatch(actions.fetchChannels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('return an action object from fetchMessagesForChannel', () => {
    const mockApiFetchMessagesForChannel = jest.fn();
    mockApiFetchMessagesForChannel.mockReturnValue(
      Promise.resolve([
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
      ]),
    );

    const extraArgument = {
      SLACK_API: {
        fetchRequestMessagesForChannel: mockApiFetchMessagesForChannel,
      },
    };

    const initialState = {
      isShowingScores: false,
      isConnectedWithSlack: true,
      channelData: {},
      scoreData: {},
      selectedChannel: null,
    };

    const expectedActions = [
      {
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
      },
    ];

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(initialState);

    return store.dispatch(actions.fetchMessagesForChannel('dev')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an action object from processNewMessages', () => {
    const newMessageData = {
      1: {
        1: 'This is a message',
      },
      2: {
        2: 'Here is another new message',
      },
    };
    const expectedAction = {
      messages: newMessageData,
      type: 'RECEIVED_NEW_MESSAGES',
    };
    expect(actions.processNewMessages(newMessageData)).toEqual(expectedAction);
  });

  it('should return an action object from processNewScores', () => {
    const newScoreData = {
      random: 0.2,
    };
    const expectedAction = {
      scoreData: newScoreData,
      type: 'RECEIVED_NEW_SCORE',
    };
    expect(actions.processNewScores(newScoreData)).toEqual(expectedAction);
  });

  it('should return an action object from selectChannel', () => {
    const channel = 'random';
    const expectedAction = {
      channel,
      type: 'SELECT_CHANNEL',
    };
    expect(actions.selectChannel(channel)).toEqual(expectedAction);
  });
});
