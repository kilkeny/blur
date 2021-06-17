export type InputNameType = 'firstName' | 'lastName' | 'login' | 'email' | 'phone' | 'password';

export interface RulesOptions {
  required: boolean,
  minLength: number,
  maxLength: number,
  pattern?: {
    value: RegExp,
    message: string
  },
  valueAsNumber?: boolean,
}

export interface RulesObj {
  required?: string,
  minLength: {
    value: number,
    message: string
  },
  maxLength: {
    value: number,
    message: string
  },
  pattern?: {
    value: RegExp,
    message: string
  },
  valueAsNumber?: boolean,
}
