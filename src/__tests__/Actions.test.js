import { Thunk } from 'redux-testkit';
import Actions from '../Actions';

function fakePromise(data, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay || 2000);
  });
}

describe('Actions', () => {
  it('should return an action object from changeSubject', () => {
    const action = Actions.connectWithSlack();
    expect(action).toEqual({
      type: 'CONNECTED_WITH_SLACK',
    });
  });

  it('should return an action object from fetchChannels', async () => {
    const channels = await fakePromise(['#random', '#general', '#redux']);
    const dispatches = await Thunk(Actions.fetchChannels).execute();
    expect(dispatches.length).toBe(1);
    expect(dispatches[0].isPlainObject()).toBe(true);
    expect(dispatches[0].getAction()).toEqual({
      channels,
      type: 'RECEIVED_CHANNEL_LIST',
    });
  });

  // it('should return an action object from fetchScores', async () => {
  //   const channels = await fakePromise({ '#random': 0, '#general': 0.5, '#redux': -0.2 });
  //   const dispatches = await Thunk(Actions.fetchScores).execute();
  //   expect(dispatches.length).toBe(1);
  //   expect(dispatches[0].isPlainObject()).toBe(true);
  //   expect(dispatches[0].getAction()).toEqual({
  //     scores,
  //     type: 'RECEIVED_CHANNEL_LIST',
  //   });
  // });
  //* *******Unnecessary action

  it('should return an action object from processNewScores', async () => {
    const newScoreData = { '#random': 0.02 };

    const expectedAction = {
      scoreData: newScoreData,
      type: 'RECEIVED_NEW_SCORE',
    };

    expect(Actions.processNewScores(newScoreData)).toEqual(expectedAction);
  });

  it('should return an action object from processNewMessages', () => {
    const newMessageData = {
      1: {
        2: {
          avatarImage: '',
          userId: 1,
          name: '',
          text: 'Here is another new message',
          timestamp: new Date(1501626043.643661 * 1000),
          channelId: 1,
        },
      },
    };

    const expectedAction = {
      messages: newMessageData,
      type: 'RECEIVED_NEW_MESSAGES',
    };

    expect(Actions.processNewMessages(newMessageData)).toEqual(expectedAction);
  });

  it('should return an action object from fetchMessagesForChannel', async () => {
    // ***I DONT UNDERSTAND HOW THIS ACTION WORKS

    // const messages = ????
    // const channels = await fakePromise(messages);
    // const dispatches = await Thunk(Actions.fetchMessagesForChannel).execute();
    // expect(dispatches.length).toBe(1);
    // expect(dispatches[0].isPlainObject()).toBe(true);
    // expect(dispatches[0].getAction()).toEqual({
    //   channel,
    //   messages,
    //   type: 'RECEIVED_MESSAGES_FOR_CHANNEL',
    // });
  });

  it('should return an action object from selectChannel', () => {
    const channel = 'general';

    const expectedAction = {
      channel,
      type: 'SELECT_CHANNEL',
    };

    expect(Actions.selectChannel(channel)).toEqual(expectedAction);
  });
});
