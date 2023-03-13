import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, placeholder, testid, name, value, onChange } = this.props;
    return (
      <input
        type={ type }
        placeholder={ placeholder }
        data-testid={ testid }
        name={ name }
        value={ value }
        onChange={ onChange }
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
