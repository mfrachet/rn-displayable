import React from 'react';
import PropTypes from 'prop-types';

const manageRules = (rules, props) => {
  const ruleNotResolved = rules.find(rule => !rule(props));

  if (ruleNotResolved) {
    return false;
  }

  return true;
};

const displayable = (Component, rules) => {
  function Displayable(props) {
    if (props.isDisplayed) {
      return <Component {...props} />;
    }

    if (rules) {
      if (manageRules(rules, props)) {
        return <Component {...props} />;
      }
    }

    return null;
  }

  Displayable.propTypes = {
    isDisplayed: PropTypes.bool,
  };

  Displayable.defaultProps = {
    isDisplayed: false,
  };

  return Displayable;
};

export default displayable;
