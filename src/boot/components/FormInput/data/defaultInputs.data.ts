import {
  EMAIL_VALIDATION,
  LOGIN_VALIDATION,
  NAME_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
} from './validationRules';

export const defaultInputs = {
  firstName: {
    name: 'first_name',
    label: 'first name',
    type: 'text',
    rules: NAME_VALIDATION,
  },
  lastName: {
    name: 'second_name',
    label: 'last name',
    type: 'text',
    rules: NAME_VALIDATION,
  },
  login: {
    name: 'login',
    label: 'nickname',
    type: 'text',
    rules: LOGIN_VALIDATION,
  },
  email: {
    name: 'email',
    label: 'email',
    type: 'email',
    rules: EMAIL_VALIDATION,
  },
  phone: {
    name: 'phone',
    label: 'phone',
    type: 'tel',
    rules: PHONE_VALIDATION,
  },
  password: {
    name: 'password',
    label: 'password',
    type: 'password',
    rules: PASSWORD_VALIDATION,
  },
};
