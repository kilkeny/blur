import { RulesObj, RulesOptions } from '@components/FormInput/FormInput.types';

export const makeValidationRules = (options: RulesOptions) => {
  const { required, minLength, maxLength, pattern, valueAsNumber } = options;

  const rules: RulesObj = {
    minLength: {
      value: minLength,
      message: `Пожалуйста, введите от ${minLength} до ${maxLength} символов.`,
    },
    maxLength: {
      value: maxLength,
      message: `Пожалуйста, введите от ${minLength} до ${maxLength} символов.`,
    },
  };

  if (required) {
    rules.required = 'Пожалуйста, заполните это поле.';
  }

  if (pattern) {
    rules.pattern = pattern;
  }

  if (valueAsNumber) {
    rules.valueAsNumber = valueAsNumber;
  }

  return rules;
};
