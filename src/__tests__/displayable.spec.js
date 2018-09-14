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
  });

  describe('displayable#with isDisplayed', () => {
    it('should have displayed the component', () => {
      Component = displayable(TextComponent);
      wrapper = shallow(<Component isDisplayed />);
      expect(wrapper.find('TextComponent').prop('isDisplayed')).toEqual(true);
    });
  });

  describe('displayable#without isDisplayed', () => {
    it('shouldnt have displayed the component', () => {
      Component = displayable(TextComponent);
      wrapper = shallow(<Component />);
      expect(wrapper.type()).toEqual(null);
    });
  });

  describe('displayable#with rules', () => {
    it('should have displayed the component if every rules are true', () => {
      const isPairB = props => props.b % 2 === 0;
      const isEvenA = props => props.a % 2 !== 0;
      const rules = [isPairB, isEvenA];

      Component = displayable(TextComponent);
      wrapper = shallow(<Component a={5} b={6} rules={rules} />);

      expect(wrapper.find('TextComponent').length).toEqual(1);
    });

    it('shouldnt have displayed the component if a rule is false', () => {
      // Oops, this rules is false, we should NOT display something
      const isPairB = props => props.b % 2 !== 0;
      const isEvenA = props => props.a % 2 !== 0;
      const rules = [isPairB, isEvenA];

      Component = displayable(TextComponent);
      wrapper = shallow(<Component a={5} b={6} rules={rules} />);

      expect(wrapper.type()).toEqual(null);
    });
  });
});
