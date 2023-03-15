import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Routes from '../Routes';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { signInWithValidInputs } from './helpers/helperFunctions';
import {
  VALID_EMAIL,
  VALID_PASSWORD,
  INVALID_EMAIL_0,
  INVALID_EMAIL_1,
  INVALID_EMAIL_2,
  INVALID_EMAIL_3,
  INVALID_PASSWORD,
} from './helpers/constants';

describe('Login page tests', () => {
  test('01 - The path to the Login page must be root', () => {
    const loginEntry = ['/'];
    const { history } = renderWithRouterAndRedux(<Routes />, { loginEntry });
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });

  test('02 - Tests if the Login page has all required elements', () => {
    const loginEntry = ['/'];
    renderWithRouterAndRedux(<Routes />, { loginEntry });

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeVisible();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeVisible();

    const loginBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(loginBtn).toBeVisible();
  });

  test('03 - Tests validations in the email and password fields and button disabling', () => {
    const loginEntry = ['/'];
    renderWithRouterAndRedux(<Routes />, { loginEntry });

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, INVALID_EMAIL_0);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, INVALID_EMAIL_1);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, INVALID_EMAIL_2);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, INVALID_EMAIL_3);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    expect(loginBtn).toBeEnabled();
  });

  test('04 - The route should be changed after cliking in the button', () => {
    const loginEntry = ['/'];
    const { history } = renderWithRouterAndRedux(<Routes />, { loginEntry });

    signInWithValidInputs();

    const { pathname } = history.location;
    expect(pathname).toEqual('/carteira');
  });
});
