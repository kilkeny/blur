import { VALIDATION } from './validationRules';
import { MetaInputs } from '../FormInput.types';

export const defaultInputs: MetaInputs = {
  first_name: {
    name: 'first_name',
    label: 'Имя',
    type: 'text',
    rules: VALIDATION.first_name,
  },
  second_name: {
    name: 'second_name',
    label: 'Фамилия',
    type: 'text',
    rules: VALIDATION.second_name,
  },
  login: {
    name: 'login',
    label: 'Логин',
    type: 'text',
    rules: VALIDATION.login,
  },
  email: {
    name: 'email',
    label: 'Почта',
    type: 'email',
    rules: VALIDATION.email,
  },
  phone: {
    name: 'phone',
    label: 'Номер телефона',
    type: 'tel',
    rules: VALIDATION.phone,
  },
  password: {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    rules: VALIDATION.password,
  },
};
