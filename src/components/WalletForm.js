import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import Select from './Select';
import { getSelectedCurrencies, addExpense } from '../redux/actions/index';

const initialState = {
  value: '',
  description: '',
  currency: '',
  method: '',
  methodsAvailable: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  tag: '',
  tagsAvailable: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
};

class WalletForm extends Component {
  state = initialState;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getSelectedCurrencies());
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  addNewExpense = () => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses } = this.props;
    const expenseID = JSON.stringify(expenses.length);
    const newExpense = { value, description, currency, method, tag, id: expenseID };
    dispatch(addExpense(newExpense));
    this.setState(initialState);
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
      <form
        onSubmit={ (e) => {
          e.preventDefault();
        } }
      >
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
        <button
          onClick={ this.addNewExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
