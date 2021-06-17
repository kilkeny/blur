import { RulesObj, RulesOptions } from '@boot/components/FormInput/types/types';

export const makeValidationRules = (options: RulesOptions) => {
  const { required, minLength, maxLength, pattern, valueAsNumber } = options;

  const rules: RulesObj = {
    minLength: {
      value: minLength,
      message: `Please enter between ${minLength} and ${maxLength} characters.`,
    },
    maxLength: {
      value: maxLength,
      message: `Please enter between ${minLength} and ${maxLength} characters.`,
    },
  };

  if (required) {
    rules.required = 'This field is required';
  }

  if (pattern) {
    rules.pattern = pattern;
  }

  if (valueAsNumber) {
    rules.valueAsNumber = valueAsNumber;
  }

  return rules;
};
