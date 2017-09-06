import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Message from '../Components/Message';

describe('Renders message with default props', () => {
  it('should render a message when given props', () => {
    const message = shallow(
      <Message
        avatarImage="img.png"
        name="John Appleseed"
        text="Hello there"
        timestamp="3:50 PM, 08-02-2017"
      />,
    );
    expect(toJson(message)).toMatchSnapshot();
  });
});
