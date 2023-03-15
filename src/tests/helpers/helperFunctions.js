import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VALID_EMAIL, VALID_PASSWORD } from './constants';

export function logInWithValidInputs() {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginBtn = screen.getByRole('button', { name: 'Entrar' });

  userEvent.type(emailInput, VALID_EMAIL);
  userEvent.type(passwordInput, VALID_PASSWORD);
  userEvent.click(loginBtn);
}
