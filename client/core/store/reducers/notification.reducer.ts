import { ActionProps, NOTIFICATION } from '../actions';

const initialState = {
  notificationsAllowed: false,
};

export const notificationReducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
  case NOTIFICATION.ALLOWED:
    return { notificationsAllowed: true };
  default:
    return state;
  }
};
