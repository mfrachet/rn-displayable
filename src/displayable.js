import React from 'react';
import PropTypes from 'prop-types';
import Animate from './animate';
import { verifyRules } from './helpers';

const makeDisplayable = (Component) => {
  const Displayable = ({ rules, Animation, isDisplayed, ...props }) =>
    (isDisplayed || verifyRules(rules, props) ? (
      <Animate Animation={Animation}>
        <Component {...props} />
      </Animate>
    ) : null);

  Displayable.propTypes = {
    isDisplayed: PropTypes.bool,
    rules: PropTypes.arrayOf(PropTypes.func),
    Animation: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  };

  Displayable.defaultProps = {
    isDisplayed: false,
    rules: [],
    Animation: null,
  };

  return Displayable;
};

export default makeDisplayable;
