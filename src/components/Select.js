import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { testid, name, value, onChange, options } = this.props;
    return (
      <select
        data-testid={ testid }
        name={ name }
        value={ value }
        onChange={ onChange }
      >
        {
          options.map((option) => (
            <option
              key={ option }
              value={ option }
              data-testid={ option }
            >
              { option }
            </option>
          ))
        }
      </select>
    );
  }
}

Select.propTypes = {
  testid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
