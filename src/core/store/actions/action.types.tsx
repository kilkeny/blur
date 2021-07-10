export interface ActionProps<T = any> {
  type: string;
  payload?: T;
}

export enum AUTH {
  SET = 'AUTH/SET',
  CLEAR = 'AUTH/CLEAR',
}

export enum PROFILE {
  SET = 'PROFILE/SET',
  CLEAR = 'PROFILE/CLEAR',
}
