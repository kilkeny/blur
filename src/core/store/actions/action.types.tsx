export interface ActionProps<T = any> {
  type: string
  payload?: T
}

export enum TEST {
  ACTION_NAME = 'TEST',
}
