/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from './Input';
import Select from './Select';
import { getSelectedCurrencies, addExpense } from '../redux/actions/index';
import { fetchAllCurrencies } from '../helpers/fetchFunctions';
import '../styles/components/WalletForm.css';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: '',
  exchangeRates: [],
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

  addNewExpense = async () => {
    const { dispatch, expenses } = this.props;
    const expenseID = expenses.length;
    this.setState({
      id: expenseID,
      exchangeRates: await fetchAllCurrencies(),
    }, () => {
      dispatch(addExpense(this.state));
      this.setState(initialState);
    });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const { currencies } = this.props;
    const methodsAvailable = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagsAvailable = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form
        className="expense_form"
        onSubmit={ (e) => {
          e.preventDefault();
        } }
      >
        <label>
          Valor
          <Input
            type="number"
            testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Descrição
          <Input
            type="text"
            testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Moeda
          <Select
            testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            options={ currencies }
          />
        </label>
        <label>
          Método de pagamento
          <Select
            testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            options={ methodsAvailable }
          />
        </label>
        <label>
          Tag
          <Select
            testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            options={ tagsAvailable }
          />
        </label>
        <button
          onClick={ this.addNewExpense }
          className="add_btn"
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
