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

export type FormInputs = {
  login: string;
  password: string;
  display_name: string;
  first_name?: string;
  second_name?: string;
  email?: string;
  phone?: string;
};

export type NameInput = keyof FormInputs;

export type MetaInput = { name: NameInput;
  label: string;
  type: string;
  rules: RulesObj;
};
