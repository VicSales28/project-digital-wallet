import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateExpenses } from '../redux/actions/index';

class Table extends Component {
  getValue = (value) => parseInt(value, 10).toFixed(2);

  getName = (obj, key) => obj[key].name;

  getRoundedRate = (obj, key) => Number(obj[key].ask).toFixed(2);

  getConvertedValue = (val, obj, key) => (val * Number(obj[key].ask)).toFixed(2);

  toRemove = (expenseID) => {
    const { dispatch, expenses } = this.props;
    const updated = expenses.filter(({ id }) => id !== expenseID);
    dispatch(updateExpenses(updated));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>

        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          { expenses.map(({
            id,
            description,
            tag,
            method,
            exchangeRates,
            currency,
            value,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{this.getValue(value)}</td>
              <td>{this.getName(exchangeRates, currency)}</td>
              <td>{this.getRoundedRate(exchangeRates, currency)}</td>
              <td>{this.getConvertedValue(value, exchangeRates, currency)}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  onClick={ () => this.toRemove(id) }
                >
                  Delete
                </button>
                <button
                  data-testid="edit-btn"
                >
                  Editar despesa
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
