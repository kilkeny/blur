import { RulesObj, RulesOptions } from '../components/FormInput/FormInput.types';

export const makeValidationRules = (options: RulesOptions) => {
  const { required, minLength, maxLength, pattern, valueAsNumber } = options;

  const rules: RulesObj = {
    minLength: {
      value: minLength,
      message: `enter from ${minLength} to ${maxLength} characters`,
    },
    maxLength: {
      value: maxLength,
      message: `enter from ${minLength} to ${maxLength} characters`,
    },
  };

  if (required) {
    rules.required = 'this field is required';
  }

  if (pattern) {
    rules.pattern = pattern;
  }

  if (valueAsNumber) {
    rules.valueAsNumber = valueAsNumber;
  }

  return rules;
};
