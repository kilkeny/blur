export interface RulesOptions {
  required: boolean;
  minLength: number;
  maxLength: number;
  pattern?: {
    value: string;
    message: string;
  };
  valueAsNumber?: boolean;
}

export interface RulesObj {
  required?: string;
  minLength: {
    value: number;
    message: string;
  };
  maxLength: {
    value: number;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  valueAsNumber?: boolean;
}

export enum DefaultInputsNamesEnum {
  Login = 'login',
  FirstName = 'first_name',
  LastName = 'second_name',
  Email = 'email',
  Phone = 'phone',
  Password = 'password',
}

export type FormData = {
  login: string;
  password: string;
  first_name?: string;
  second_name?: string;
  email?: string;
  phone?: string;
};

export type NameInput = keyof FormData;

export type MetaInput = {
  name: NameInput;
  label: string;
  type: string;
  rules: RulesObj;
};

export type MetaInputs = {
  [key in NameInput]: MetaInput;
};