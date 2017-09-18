
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Toolbar from '../Components/Toolbar';


describe('Toolbar test', () => {
  it('should render', () => {
    const component = shallow(<Toolbar />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
