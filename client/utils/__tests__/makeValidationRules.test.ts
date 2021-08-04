import { makeValidationRules } from '../makeValidationRules';

describe('makeValidationRules', () => {
  function createOptionsRequired() {
    return {
      required: true,
      minLength: 10,
      maxLength: 20,
    };
  }

  function createOptionsWithPattern(pattern: { value: string; message: string }) {
    return {
      required: false,
      minLength: 10,
      maxLength: 20,
      pattern: { value: pattern.value, message: pattern.message },
    };
  }

  function createOptionsWithValueAsNumber(valueAsNumber: boolean) {
    return {
      required: false,
      minLength: 10,
      maxLength: 20,
      valueAsNumber,
    };
  }

  it('should create valid required rules', () => {
    const options = createOptionsRequired();
    const rules = makeValidationRules(options);
    const expected = {
      maxLength: {
        message: 'enter from 10 to 20 characters',
        value: 20,
      },
      minLength: {
        message: 'enter from 10 to 20 characters',
        value: 10,
      },
      required: 'this field is required',
    };
    expect(rules).toStrictEqual(expected);
  });

  it('should create valid rules with pattern', () => {
    const options = createOptionsWithPattern({ value: '/^[a-zA-Z0-9_]$/gi', message: 'use letters numbers and _' });
    const rules = makeValidationRules(options);
    const expected = {
      maxLength: {
        message: 'enter from 10 to 20 characters',
        value: 20,
      },
      minLength: {
        message: 'enter from 10 to 20 characters',
        value: 10,
      },
      pattern: { value: '/^[a-zA-Z0-9_]$/gi', message: 'use letters numbers and _' },
    };
    expect(rules).toStrictEqual(expected);
  });

  it('should create valid rules with value as number', () => {
    const options = createOptionsWithValueAsNumber(true);
    const rules = makeValidationRules(options);
    const expected = {
      maxLength: {
        message: 'enter from 10 to 20 characters',
        value: 20,
      },
      minLength: {
        message: 'enter from 10 to 20 characters',
        value: 10,
      },
      valueAsNumber: true,
    };
    expect(rules).toStrictEqual(expected);
  });
});
