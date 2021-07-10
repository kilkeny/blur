import { ProfileProps } from '@core/api';
import { ActionProps, PROFILE } from '../actions';

const initialState = {} as ProfileProps;

export const profileReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
  case PROFILE.SET:
    return { ...state, ...action.payload };
  case PROFILE.CLEAR:
    return initialState;
  default:
    return state;
  }
};
