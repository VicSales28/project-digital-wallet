import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: '',
    method: '',
    methodsAvailable: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
    tag: '',
    tagsAvailable: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      methodsAvailable,
      tag,
      tagsAvailable } = this.state;
    const { currencies } = this.props;
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
        <Select
          testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
          options={ currencies }
        />
        <Select
          testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
          options={ methodsAvailable }
        />
        <Select
          testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
          options={ tagsAvailable }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
