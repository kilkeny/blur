import { ActionProps, AUTH } from '../actions';

const initialState = { isAuth: false };

export const authReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
  case AUTH.SET:
    return { isAuth: true };
  case AUTH.CLEAR:
    return { isAuth: false };
  default:
    return state;
  }
};
