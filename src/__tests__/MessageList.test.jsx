import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import MessageList from '../Components/MessageList';

describe('Renders message list with default props', () => {
  it('should render a message list when given props', () => {
    const messageList = shallow(<MessageList selectedChannel="dev" />);
    expect(toJson(messageList)).toMatchSnapshot();
  });
});
