import React from 'react';
import { screen } from '@testing-library/react';
import Routes from '../Routes';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { signInWithValidInputs } from './helpers/helperFunctions';
import {
  VALID_EMAIL,
  INITIAL_TOTAL_SUM,
  INITIAL_HEADER_CURR,
} from './helpers/constants';

describe('Header component tests', () => {
  beforeEach(() => {
    const loginEntry = ['/'];
    renderWithRouterAndRedux(<Routes />, { loginEntry });
    signInWithValidInputs();
  });
  test('01 - Tests if an element displays the email of the logged-in user', () => {
    const emailField = screen.getByTestId('email-field');
    expect(emailField).toBeVisible();
    expect(emailField).toHaveTextContent(VALID_EMAIL);
  });

  test('02 - Tests if an element displays the initial total sum of expenses', () => {
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeVisible();
    expect(totalField).toHaveTextContent(INITIAL_TOTAL_SUM);
  });

  test('03 - Tests if an element displays the currency which will be BRL in this case', () => {
    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toBeVisible();
    expect(currencyField).toHaveTextContent(INITIAL_HEADER_CURR);
  });
});
