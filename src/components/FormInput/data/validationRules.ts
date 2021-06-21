import { makeValidationRules } from '../../../utils/makeValidationRules';

const REGEXP: { [key: string]: string } = {
  EMAIL: '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/i',
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

export const NAME_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: REGEXP.NAME,
    message: 'Имя может состоять только из букв',
  },
});

export const LOGIN_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: REGEXP.LOGIN,
    message: 'Логин может состоять только из латинских букв, цифр и символа _',
  },
});

export const EMAIL_VALIDATION = makeValidationRules({
  ...BASE_TEXT_VALIDATION,
  pattern: {
    value: REGEXP.EMAIL,
    message: 'Введите корректный адрес электронной почты. Пример: ya@test.ru',
  },
});

export const PHONE_VALIDATION = makeValidationRules({
  required: true,
  minLength: 10,
  maxLength: 12,
  pattern: {
    value: REGEXP.PHONE,
    message: 'Номер должен состоять из цифр, а также может содержать символы +-(). Пример: +7(123)456-78-90',
  },
});

export const PASSWORD_VALIDATION = makeValidationRules({
  required: true,
  minLength: 8,
  maxLength: 30,
  pattern: {
    value: REGEXP.PASSWORD,
    message: 'Пароль может содержать буквы, цифры и символы !@#$%^&*',
  },
});
