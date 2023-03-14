import { GET_CURRENCIES, ADD_EXPENSE } from '../actions/actionsTypes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
