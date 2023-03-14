import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const total = expenses
      .reduce((acc, { value, exchangeRates, currency }) => {
        acc += parseFloat(value) * parseFloat(exchangeRates[currency].ask);
        return acc;
      }, 0);

    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <p data-testid="total-field">{ total.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

export default connect(mapStateToProps)(Header);
