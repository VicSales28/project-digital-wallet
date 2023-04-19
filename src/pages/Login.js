/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../components/Input';
import pocket from '../styles/images/pocket.png';
import coins from '../styles/images/coins.png';
import Footer from '../components/Footer';
import { enterAccount } from '../redux/actions/index';
import '../styles/pages/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  isEmailValid = (emailTested) => {
    // Validação de e-mail obtida em: https://uibakery.io/regex-library/email
    const basicValidation = /\S+@\S+\.\S+/;
    return basicValidation.test(emailTested);
  };

  isPasswordValid = (passwordTested) => {
    const minLength = 6;
    return passwordTested.length >= minLength;
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    return (
      <div className="loginPage_container">

        <div className="images_container">
          <img src={ pocket } alt="pocket" />
          <img src={ coins } alt="coins" />
        </div>

        <div className="login_container">
          <form
            className="login_form"
            onSubmit={ (e) => {
              e.preventDefault();
              history.push('/carteira');
            } }
          >

            <h1>
              Digital Wallet
            </h1>

            <label>
              E-mail:
              <Input
                type="email"
                placeholder="Utilize seu e-mail para realizar o login"
                testid="email-input"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>

            <label>
              Senha:
              <Input
                type="password"
                placeholder="Digite uma senha"
                testid="password-input"
                name="password"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
            <div className="login_checkbox">
              <input type="checkbox" id="session-check" />
              <label htmlFor="session-check">
                Permanecer logado
              </label>
            </div>

            <button
              disabled={
                !(this.isEmailValid(email)
            && this.isPasswordValid(password))
              }
              onClick={ () => dispatch(enterAccount({ email })) }
            >
              Entrar
            </button>

            <Footer />

          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

export default connect()(Login);
