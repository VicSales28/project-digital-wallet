import { USER_LOGIN } from '../actions/actionsTypes';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
