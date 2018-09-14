import React from 'react';
import PropTypes from 'prop-types';

const manageRules = (rules, props) => {
  const ruleNotResolved = rules.find(rule => !rule(props));

  if (ruleNotResolved) {
    return false;
  }

  return true;
};

const displayable = (Component) => {
  function Displayable({ rules, ...props }) {
    if (props.isDisplayed) {
      return <Component {...props} />;
    }

    if (rules.length) {
      if (manageRules(rules, props)) {
        return <Component {...props} />;
      }
    }

    return null;
  }

  Displayable.propTypes = {
    isDisplayed: PropTypes.bool,
    rules: PropTypes.arrayOf(PropTypes.func),
  };

  Displayable.defaultProps = {
    isDisplayed: false,
    rules: [],
  };

  return Displayable;
};

export default displayable;
