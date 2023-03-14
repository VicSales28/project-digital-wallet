import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enterAccount } from '../redux/actions/index';
import Input from '../components/Input';

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
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          history.push('/carteira');
        } }
      >
        <Input
          type="email"
          placeholder="Type your e-mail"
          testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <Input
          type="password"
          placeholder="Type your password"
          testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          disabled={
            !(this.isEmailValid(email)
            && this.isPasswordValid(password))
          }
          onClick={ () => dispatch(enterAccount({ email })) }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

export default connect()(Login);
