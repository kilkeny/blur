import { makeValidationRules } from '../../../utils/makeValidationRules';
import { NameInput, RulesObj } from '../FormInput.types';

const REGEXP: { [key: string]: string } = {
  EMAIL:
        '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/i',
  PASSWORD: '/^[\\w!@#$%^&*]$/gi',
  LOGIN: '/^[a-zA-Z0-9_]$/gi',
  NAME: '/^[a-zA-Zа-яёА-ЯЁ]*$/gi',
  PHONE: '/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s./0-9]*$/g',
};

const BASE_TEXT_VALIDATION = {
  required: true,
  minLength: 3,
  maxLength: 20,
};

const NAME_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: REGEXP.NAME,
    message: 'use letters only',
  },
});

const LOGIN_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: REGEXP.LOGIN,
    message:
            'use letters numbers and _',
  },
});

const EMAIL_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: REGEXP.EMAIL,
    message:
            'enter a valid email address: user@mail.com',
  },
});

const PHONE_VALIDATION = makeValidationRules({
  required: true,
  minLength: 10,
  maxLength: 12,
  pattern: {
    value: REGEXP.PHONE,
    message:
            'enter a valid phone number: +71234567890',
  },
});

const TOPIC_TITLE_VALIDATION = makeValidationRules({
  required: true,
  minLength: 1,
  maxLength: 50,
});

const TOPIC_BODY_VALIDATION = makeValidationRules({
  required: true,
  minLength: 1,
  maxLength: 500,
});

const PASSWORD_VALIDATION = makeValidationRules({
  required: true,
  minLength: 8,
  maxLength: 30,
  pattern: {
    value: REGEXP.PASSWORD,
    message: 'use letters numbers and !@#$%^&* symbols',
  },
});

export type ValidationsProps = {
  [key in NameInput]: RulesObj;
};

export const VALIDATION: ValidationsProps = {
  first_name: NAME_VALIDATION,
  second_name: NAME_VALIDATION,
  login: LOGIN_VALIDATION,
  email: EMAIL_VALIDATION,
  phone: PHONE_VALIDATION,
  title: TOPIC_TITLE_VALIDATION,
  text: TOPIC_BODY_VALIDATION,
  password: PASSWORD_VALIDATION,
};
