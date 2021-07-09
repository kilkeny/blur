export interface ActionProps<T = any> {
  type: string
  payload?: T
}

export enum USER {
  FETCH = 'FETCH',
  UPDATE = 'UPDATE',
  LOAD_AVATAR = 'LOAD_AVATAR',
}
