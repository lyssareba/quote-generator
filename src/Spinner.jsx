import React from 'react';
import PropTypes from 'prop-types';

import SpinnerImg from './assets/spinner-bluehost-grad-200x200.gif';

const { string, bool } = PropTypes;
const propTypes = {
  sSize: string,
  visible: bool,
};

const defaultProps = {
  sSize: 'm',      // xxl, xl, l, m, s, xs
  visible: true,
};

function Spinner(props) {
  return (
    <div className={`spinner spinner-${props.sSize} ${props.visible ? 'visible' : 'hidden'}`}>
      <img src={SpinnerImg} alt="Loading..." />
    </div>
  );
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
export default Spinner;