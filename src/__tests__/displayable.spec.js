import React from 'react';
import { shallow } from 'enzyme';
import makeDisplayable from '../displayable';

describe('makeDisplayable', () => {
  let wrapper;

  const TextComponent = () => <div>Hello world</div>;
  const Component = makeDisplayable(TextComponent);
  const getWrapper = (props = {}) => shallow(<Component {...props} />);

  describe('with isDisplayed props', () => {
    it('should have displayed the component', () => {
      wrapper = getWrapper({ isDisplayed: true });

      expect(wrapper.type()).not.toEqual(null);
    });

    it('shouldnt have displayed the component', () => {
      wrapper = getWrapper();

      expect(wrapper.type()).toEqual(null);
    });
  });

  describe('with rules props', () => {
    it('should have displayed the component when every rules are true', () => {
      const isPairB = props => props.b % 2 === 0;
      const isEvenA = props => props.a % 2 !== 0;
      const rules = [isPairB, isEvenA];

      const C = makeDisplayable(TextComponent);
      wrapper = shallow(<C a={5} b={6} rules={rules} />);

      expect(wrapper.find('TextComponent').length).toEqual(1);
    });

    it('shouldnt have displayed the component when a rule is false', () => {
      const isPairB = props => props.b % 2 !== 0;
      const isEvenA = props => props.a % 2 !== 0;
      const rules = [isPairB, isEvenA];

      wrapper = getWrapper({ a: 5, b: 6, rules });

      expect(wrapper.type()).toEqual(null);
    });
  });

  describe('with Animation prop', () => {
    it('should have displayed the Animate component with an Animation props equals to the one passed as argument', () => {
      const SomeAnimation = () => null;

      wrapper = getWrapper({ Animation: SomeAnimation, isDisplayed: true });

      expect(wrapper.find('Animate').prop('Animation')).toEqual(SomeAnimation);
    });
  });

  describe('shouldComponentUpdate', () => {
    it('should have updated the component', () => {
      wrapper = getWrapper();

      const instance = wrapper.instance();

      expect(instance.shouldComponentUpdate({ isDisplayed: true })).toBe(true);
    });

    it('shouldnt have updated the component', () => {
      wrapper = getWrapper({ isDisplayed: true });

      const instance = wrapper.instance();

      expect(instance.shouldComponentUpdate({ isDisplayed: true })).toBe(false);
    });
  });
});
