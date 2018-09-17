import React from 'react';
import PropTypes from 'prop-types';
import Animate from './animate';
import { verifyRules } from './helpers';

const makeVisible = (Component) => {
  class Visible extends React.Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.isVisible !== this.props.isVisible;
    }

    render() {
      const { rules, Animation, isVisible, style, ...props } = this.props;
      const visibilityStyle = { display: isVisible || verifyRules(rules, props) ? 'flex' : 'none' };

      return (
        <Animate Animation={Animation}>
          <Component style={{ ...style, ...visibilityStyle }} {...props} />
        </Animate>
      );
    }
  }

  Visible.propTypes = {
    isVisible: PropTypes.bool,
    rules: PropTypes.arrayOf(PropTypes.func),
    Animation: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  };

  Visible.defaultProps = {
    isVisible: false,
    rules: [],
    Animation: null,
  };

  return Visible;
};

export default makeVisible;
