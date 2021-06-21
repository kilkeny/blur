import {
  EMAIL_VALIDATION,
  LOGIN_VALIDATION,
  NAME_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
} from './validationRules';

import { DefaultInputsNamesEnum } from '../FormInput.types';

export const defaultInputs = {
  first_name: {
    name: DefaultInputsNamesEnum.FirstName,
    label: 'Имя',
    type: 'text',
    rules: NAME_VALIDATION,
  },
  second_name: {
    name: DefaultInputsNamesEnum.LastName,
    label: 'Фамилия',
    type: 'text',
    rules: NAME_VALIDATION,
  },
  login: {
    name: DefaultInputsNamesEnum.Login,
    label: 'Логин',
    type: 'text',
    rules: LOGIN_VALIDATION,
  },
  email: {
    name: DefaultInputsNamesEnum.Email,
    label: 'Почта',
    type: 'email',
    rules: EMAIL_VALIDATION,
  },
  phone: {
    name: DefaultInputsNamesEnum.Phone,
    label: 'Номер телефона',
    type: 'tel',
    rules: PHONE_VALIDATION,
  },
  password: {
    name: DefaultInputsNamesEnum.Password,
    label: 'Пароль',
    type: 'password',
    rules: PASSWORD_VALIDATION,
  },
};
