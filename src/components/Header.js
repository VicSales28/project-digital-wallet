import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WalletIcon from '../icons/WalletIcon';
import '../styles/components/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const total = expenses
      .reduce((acc, { value, exchangeRates, currency }) => {
        acc += parseFloat(value) * parseFloat(exchangeRates[currency].ask);
        return acc;
      }, 0);

    return (
      <header>
        <div className="container_header">

          <div className="user_header">
            <WalletIcon />
            <span data-testid="email-field">
              { email }
            </span>
          </div>

          <div className="total_header">
            <h2>
              Despesa Total (
              <span data-testid="header-currency-field">
                BRL
              </span>
              )
            </h2>
            $
            <span data-testid="total-field">
              { total.toFixed(2) }
            </span>
          </div>

        </div>
      </header>
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
