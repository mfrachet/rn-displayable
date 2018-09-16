import React from 'react';
import { shallow } from 'enzyme';
import Animate from '../animate';

describe('Animate', () => {
  const getWrapper = props => shallow(<Animate {...props} />);

  it('should have displayed an animation wrapper when the prop Animation is passed as argument', () => {
    const SomeAnimation = () => null;
    const wrapper = getWrapper({ Animation: SomeAnimation });

    expect(wrapper.find(SomeAnimation).length).toBe(1);
  });

  it('should have displayed only the children when Animation props is null', () => {
    const children = <div>Hey you</div>;
    const wrapper = getWrapper({ Animation: null, children });

    expect(wrapper.find('div').prop('children')).toBe('Hey you');
  });
});
