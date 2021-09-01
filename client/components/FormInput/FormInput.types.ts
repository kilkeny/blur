export interface RulesOptions {
  required: boolean;
  minLength: number;
  maxLength: number;
  pattern?: { // выглядит как будто можно вынести этот интерфейс (с value и message),
              // так как его можно переиспользовать, уже как минимум в этом файле
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

export type NameInput = // для удобства чтения обычно пишут так
| 'login'
| 'password'
| 'first_name'
| 'second_name'
| 'email'
| 'phone'
| 'title'
| 'content'
| 'display_name';
//
// export type NameInput = 'login'
//   | 'password'
//   | 'first_name'
//   | 'second_name'
//   | 'email'
//   | 'phone'
//   | 'title'
//   | 'content'
//   | 'display_name';
//

export type ProfileNames = Exclude<NameInput, 'title' | 'content'>;

export type MetaInput = {
  name: NameInput;
  label: string;
  type: string;
  rules: RulesObj;
  multiline?: boolean;
};
