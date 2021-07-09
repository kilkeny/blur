import { RulesObj, RulesOptions } from '@components/FormInput/FormInput.types';

export const makeValidationRules = (options: RulesOptions) => {
  const { required, minLength, maxLength, pattern, valueAsNumber } = options;

  const rules: RulesObj = {};

  if (required) {
    rules.required = 'this field is required';
  }

  if (minLength && maxLength) {
    rules.minLength = {
      value: minLength,
      message: `enter from ${minLength} to ${maxLength} characters`,
    };
    rules.maxLength = {
      value: maxLength,
      message: `enter from ${minLength} to ${maxLength} characters`,
    };
  }

  if (pattern) {
    rules.pattern = pattern;
  }

  if (valueAsNumber) {
    rules.valueAsNumber = valueAsNumber;
  }

  return rules;
};
