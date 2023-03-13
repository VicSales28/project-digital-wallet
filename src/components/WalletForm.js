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
    currency: 'EUR',
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
    const { value, description, currency } = this.state;
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
