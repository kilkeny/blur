export interface ActionProps<T = any> {
  type: string;
  payload?: T;
}

export enum USER {
  SET_AUTH = 'SET_AUTH',
  FETCH = 'FETCH',
  UPDATE = 'UPDATE',
  LOAD_AVATAR = 'LOAD_AVATAR',
}
