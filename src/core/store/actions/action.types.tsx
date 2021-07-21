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

export enum SNACKBAR {
  SHOW_SNACKBAR = 'SHOW_SNACKBAR',
  HIDE_SNACKBAR = 'HIDE_SNACKBAR',
}

export enum LEADERBOARD {
  SET = 'LEADERBOARD/SET',
  CLEAR = 'LEADERBOARD/CLEAR',
}
