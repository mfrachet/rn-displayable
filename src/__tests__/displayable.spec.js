import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import displayable from './../displayable';

describe('displayable', () => {
  let Component;
  let TextComponent;
  let wrapper;

  beforeEach(() => {
    TextComponent = () => <Text>Hello world</Text>;
    Component = displayable(TextComponent);
  });

  describe('displayable#with isDisplayed', () => {
    it('should have displayed the component', () => {
      wrapper = shallow(<Component isDisplayed />);
      expect(wrapper.find('TextComponent').prop('isDisplayed')).toEqual(true);
    });
  });

  describe('displayable#without isDisplayed', () => {
    it('shouldnt have displayed the component', () => {
      wrapper = shallow(<Component />);
      expect(wrapper.type()).toEqual(null);
    });
  });
});
