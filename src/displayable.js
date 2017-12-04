import React from 'react';
import PropTypes from 'prop-types';

const displayable = (Component) => {
  function Displayable(props) {
    if (props.isDisplayed) {
      return <Component {...props} />;
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
