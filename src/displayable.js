import React from 'react';
import PropTypes from 'prop-types';
import Animate from './animate';

const verifyRules = (rules, props) => rules.length && !rules.find(rule => !rule(props));

const displayable = (Component) => {
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

export default displayable;
