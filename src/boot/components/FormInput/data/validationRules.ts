import { makeValidationRules } from '@boot/utils/makeValidationRules';

const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
const PASSWORD_REGEXP = /^[\w!@#$%^&*]$/gi;
const LOGIN_REGEXP = /^[a-zA-Z0-9_]$/gi;
const NAME_REGEXP = /^[a-zA-Zа-яёА-ЯЁ]{2,}([a-zA-Zа-яёА-ЯЁ]+)*$/gi;
const PHONE_REGEXP = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;

const BASE_TEXT_VALIDATION = {
  required: true,
  minLength: 3,
  maxLength: 20,
};

export const NAME_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: NAME_REGEXP,
    message: 'Please enter only ',
  },
});

export const LOGIN_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: LOGIN_REGEXP,
    message: 'Nickname can have only latin letter, numbers and _',
  },
});

export const EMAIL_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: EMAIL_REGEXP,
    message: 'Please enter a valid email',
  },
});

export const PHONE_VALIDATION = makeValidationRules({
  required: true,
  minLength: 10,
  maxLength: 12,
  pattern: {
    value: PHONE_REGEXP,
    message: 'Please enter a valid phone number',
  },
});

export const PASSWORD_VALIDATION = makeValidationRules({
  required: true,
  minLength: 8,
  maxLength: 30,
  pattern: {
    value: PASSWORD_REGEXP,
    message: 'Password can have only letters, numbers and !@#$%^&*',
  },
});
