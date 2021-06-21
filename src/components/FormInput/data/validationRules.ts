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
    message: 'Имя может состоять только из букв',
  },
});

const LOGIN_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: REGEXP.LOGIN,
    message:
            'Логин может состоять только из латинских букв, цифр и символа _',
  },
});

const EMAIL_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: REGEXP.EMAIL,
    message:
            'Введите корректный адрес электронной почты. Пример: ya@test.ru',
  },
});

const PHONE_VALIDATION = makeValidationRules({
  required: true,
  minLength: 10,
  maxLength: 12,
  pattern: {
    value: REGEXP.PHONE,
    message:
            'Номер должен состоять из цифр, а также может содержать символы +-(). Пример: +7(123)456-78-90',
  },
});

const PASSWORD_VALIDATION = makeValidationRules({
  required: true,
  minLength: 8,
  maxLength: 30,
  pattern: {
    value: REGEXP.PASSWORD,
    message: 'Пароль может содержать буквы, цифры и символы !@#$%^&*',
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
  password: PASSWORD_VALIDATION,
};
