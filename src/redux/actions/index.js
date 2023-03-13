import { USER_LOGIN, GET_CURRENCIES } from './actionsTypes';

export const enterAccount = (payload) => ({
  type: USER_LOGIN,
  payload, // user e-mail
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload, // currencies available
});

export const fetchCurrencies = () => async (dispatch) => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(endPoint);
    const data = await response.json();
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(getCurrencies(currencies));
  } catch (error) {
    console.log(error);
  }
};
