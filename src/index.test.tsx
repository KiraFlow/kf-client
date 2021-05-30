import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import "../setupTests"


describe('App', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').length).toEqual(1);
  });
});
