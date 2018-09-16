import React from 'react';
import PropTypes from 'prop-types';

const Animate = ({ Animation, children }) =>
  (Animation ? <Animation>{children}</Animation> : children);

Animate.propTypes = {
  Animation: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Animate.defaultProps = {
  Animation: null,
  children: null,
};

export default Animate;
