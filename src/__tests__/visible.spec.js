import React from 'react';
import { shallow } from 'enzyme';
import makeVisible from '../visible';

describe('makeVisible', () => {
  let wrapper;

  const TextComponent = () => <div>Hello world</div>;
  const Component = makeVisible(TextComponent);
  const getWrapper = (props = {}) => shallow(<Component {...props} />);

  describe('with isDisplayed props', () => {
    it('should have displayed the component with a display style of flex', () => {
      wrapper = getWrapper({ isVisible: true });

      expect(wrapper.find(TextComponent).prop('style')).toEqual({ display: 'flex' });
    });

    it('should also have displayed the component but with a display style of none', () => {
      wrapper = getWrapper();

      expect(wrapper.find(TextComponent).prop('style')).toEqual({ display: 'none' });
    });
  });

  describe('with rules props', () => {
    it('should have displayed the component when every rules are true', () => {
      const isPairB = props => props.b % 2 === 0;
      const isEvenA = props => props.a % 2 !== 0;
      const rules = [isPairB, isEvenA];

      const C = makeVisible(TextComponent);
      wrapper = shallow(<C a={5} b={6} rules={rules} />);

      expect(wrapper.find('TextComponent').length).toEqual(1);
    });

    it('should have displayed the component with a display style of none when rules doesnt match', () => {
      const isPairB = props => props.b % 2 !== 0;
      const isEvenA = props => props.a % 2 !== 0;
      const rules = [isPairB, isEvenA];

      wrapper = getWrapper({ a: 5, b: 6, rules });

      expect(wrapper.find(TextComponent).prop('style')).toEqual({ display: 'none' });
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

      expect(instance.shouldComponentUpdate({ isVisible: true })).toBe(true);
    });

    it('shouldnt have updated the component', () => {
      wrapper = getWrapper({ isVisible: true });

      const instance = wrapper.instance();

      expect(instance.shouldComponentUpdate({ isVisible: true })).toBe(false);
    });
  });
});
