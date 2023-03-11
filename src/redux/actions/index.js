import { USER_LOGIN } from './actionsTypes';

const enterAccount = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export { enterAccount };
