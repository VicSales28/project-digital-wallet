import React from 'react';
import { screen } from '@testing-library/react';

import Routes from '../Routes';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { signInWithValidInputs } from './helpers/helperFunctions';

describe('WalletForm component tests', () => {
  beforeEach(() => {
    const loginEntry = ['/'];
    renderWithRouterAndRedux(<Routes />, { loginEntry });
    signInWithValidInputs();
  });
  test('01 - Tests if the component has a field for type the expense value', () => {
    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeVisible();
  });

  test('02 - Tests if the component has a field for type the expense description', () => {
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeVisible();
  });

  test('03 - Tests if the component has a field for choose the currency', () => {
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeVisible();
  });

  test('04 - Tests if the component has a field for choose the method', () => {
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeVisible();
  });

  test('05 - Tests if the component has a field for choose the tag', () => {
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeVisible();
  });

  test('06 - Tests if the component has a button to add an expense', () => {
    const addBtn = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(addBtn).toBeVisible();
  });
});
