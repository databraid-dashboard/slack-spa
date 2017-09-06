import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Toolbar from '../Components/Toolbar';

describe('Renders toolbar with default props', () => {
  it('should render', () => {
    const toolbar = shallow(<Toolbar />);
    expect(toJson(toolbar)).toMatchSnapshot();
  });
});
