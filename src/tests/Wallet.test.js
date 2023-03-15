import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Wallet from '../pages/Wallet';
import { renderWithRedux } from './helpers/renderWith';

describe('Wallet page tests', () => {
  test('01 - Tests if the element that displays the total sum of expenses is being updated', async () => {
    const { store } = renderWithRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '1');

    const descriptionInput = screen.getByTestId('description-input');
    userEvent.type(descriptionInput, 'test');

    const methodInput = screen.getByTestId('method-input');
    userEvent.selectOptions(methodInput, screen.getByTestId('Cartão de débito'));

    const tagInput = screen.getByTestId('tag-input');
    userEvent.selectOptions(tagInput, screen.getByTestId('Lazer'));

    const addBtn = screen.getByRole('button', { name: 'Adicionar despesa' });
    userEvent.click(addBtn);

    const totalField = screen.getByTestId('total-field');

    await waitFor(() => {
      const STORE = store.getState();
      const expense = STORE.wallet.expenses[0];
      const { value, exchangeRates, currency } = expense;
      const total = parseFloat(value) * parseFloat(exchangeRates[currency].ask);
      expect(totalField).toHaveTextContent(total.toFixed(2));
    });
  });
});
