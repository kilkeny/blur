import { ProfileProps } from '@core/api';
import { ActionProps, USER } from '../actions/action.types';

const initialState = {} as ProfileProps;

export const userReducer = (
  state = initialState,
  { type, payload }: ActionProps,
) => {
  switch (type) {
  case USER.FETCH:
    return { ...state, ...payload };
  case USER.UPDATE:
    return { ...state, ...payload };
  default:
    return state;
  }
};
