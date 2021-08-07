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

export type NameInput = 'login' | 'password' | 'first_name' | 'second_name' | 'email' | 'phone' | 'title' | 'text';
export type ProfileNames = Exclude<NameInput, 'title' | 'text'>;

export type MetaInput = { name: NameInput;
  label: string;
  type: string;
  rules: RulesObj;
};
