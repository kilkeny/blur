import { VALIDATION } from './validationRules';
import { MetaInput, NameInput } from '../FormInput.types';

export const defaultInputs: Record<NameInput, MetaInput> = {
  first_name: {
    name: 'first_name',
    label: 'first name',
    type: 'text',
    rules: VALIDATION.first_name,
  },
  second_name: {
    name: 'second_name',
    label: 'second name',
    type: 'text',
    rules: VALIDATION.second_name,
  },
  display_name: {
    name: 'display_name',
    label: 'display_name',
    type: 'text',
    rules: VALIDATION.display_name,
  },
  login: {
    name: 'login',
    label: 'nickname',
    type: 'text',
    rules: VALIDATION.login,
  },
  email: {
    name: 'email',
    label: 'email',
    type: 'email',
    rules: VALIDATION.email,
  },
  phone: {
    name: 'phone',
    label: 'phone',
    type: 'tel',
    rules: VALIDATION.phone,
  },
  password: {
    name: 'password',
    label: 'password',
    type: 'password',
    rules: VALIDATION.password,
  },
  title: {
    name: 'title',
    label: 'title',
    type: 'text',
    rules: VALIDATION.title,
  },
  content: {
    name: 'content',
    label: 'text',
    type: 'textarea',
    multiline: true,
    rules: VALIDATION.content,
  },
};
