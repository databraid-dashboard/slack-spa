import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import LoginView from '../LoginView';

describe('Renders message with default props', () => {
  it('should render a message when given props', () => {
    const loginView = shallow(<LoginView />);
    expect(toJson(loginView)).toMatchSnapshot();
  });
});
