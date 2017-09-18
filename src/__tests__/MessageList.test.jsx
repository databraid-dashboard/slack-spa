import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { MessageList } from '../Components/MessageList';

describe('Renders message list with default props', () => {
  it('should render a message list when given props', () => {
    const fetchMessagesForChannel = jest.fn();
    const messageList = shallow(
      <MessageList
        selectedChannel="dev"
        fetchMessagesForChannel={fetchMessagesForChannel}
      />,
    );
    expect(toJson(messageList)).toMatchSnapshot();
  });
});
