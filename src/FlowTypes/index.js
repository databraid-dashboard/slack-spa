export type Action = {
  type: string,
};

export type Id = mixed;

export type MessageType = {
  avatarImage: string,
  name: string,
  text: string,
  timestamp: string,
};

export type ChannelData = {[string]: ?{[Id]: {[Id]: MessageType}}};

export type State = {
  // isShowingScores: boolean,
  isConnectedWithSlack: boolean,
  channelData: ChannelData,
  scoreData: {[string]: ?number},
  selectedChannel: ?string,
};

export type Dispatch = ({ type: string }) => void;
export type GetState = () => State;
