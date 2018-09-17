import React from 'react';
import PropTypes from 'prop-types';
import Animate from './animate';
import { verifyRules } from './helpers';

const makeDisplayable = (Component) => {
  class Displayable extends React.Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.isDisplayed !== this.props.isDisplayed;
    }

    render() {
      const { rules, Animation, isDisplayed, ...props } = this.props;

      return (isDisplayed || verifyRules(rules, props) ? (
        <Animate Animation={Animation}>
          <Component {...props} />
        </Animate>
      ) : null);
    }
  }

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
