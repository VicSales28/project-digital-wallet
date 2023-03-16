import { USER_LOGIN, GET_CURRENCIES, ADD_EXPENSE, UPDATE_EXPENSES } from './actionsTypes';
import { fetchAllCurrencies } from '../../helpers/fetchFunctions';

export const enterAccount = (payload) => ({
  type: USER_LOGIN,
  payload, // user e-mail
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload, // selected currencies available
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload, // new expense
});

export const updateExpenses = (payload) => ({
  type: UPDATE_EXPENSES,
  payload, // updated expenses
});

export function getSelectedCurrencies() {
  return async (dispatch) => {
    try {
      const data = await fetchAllCurrencies();
      const selectedCurrencies = Object.keys(data)
        .filter((currency) => currency !== 'USDT');
      return dispatch(getCurrencies(selectedCurrencies));
    } catch (error) {
      console.log(error);
    }
  };
}
