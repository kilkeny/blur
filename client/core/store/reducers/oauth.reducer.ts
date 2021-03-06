import { ActionProps, OAUTH } from '../actions';

const initialState = { callbackURL: 'https://kilkeny-blur-6.ya-praktikum.tech/' };

export const oauthReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
  case OAUTH.SET_ID:
    return { ...state, ...action.payload };
  case OAUTH.SET_URL:
    return { ...state, ...action.payload };
  case OAUTH.SET_CODE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};
