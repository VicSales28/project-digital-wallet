import React, { Component } from 'react';
import Input from './Input';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { value, description } = this.state;
    return (
      <form>
        <h3>WalletForm</h3>
        <Input
          type="number"
          placeholder="Expense value"
          testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <Input
          type="text"
          placeholder="Expense description"
          testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </form>
    );
  }
}

export default WalletForm;
