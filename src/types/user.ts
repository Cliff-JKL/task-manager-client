export interface User {
  username: string;
  password: string;
}

export interface LoginUserDto {
  user: User | null;
  token: string | null;
}

export interface UserState extends LoginUserDto {
  loading: boolean;
  error: null | string;
}

export enum UserActionTypes {
  FETCH_USER = 'FETCH_TASKS',
  FETCH_USER_SUCCESS = 'FETCH_TASKS_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_TASKS_ERROR',
  SET_AUTH = 'SET_AUTH',
  LOGIN = 'LOGIN',
  GET_USER = 'GET_USER',
  GET_USER_ERROR = 'GET_USER_ERROR'
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS;
  payload: User;
}

interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR;
  payload: string;
}

interface SetAuthAction {
  type: UserActionTypes.SET_AUTH;
  payload: string;
}

interface LoginAction {
  type: UserActionTypes.LOGIN;
  payload: LoginUserDto;
}

interface GetUserAction {
  type: UserActionTypes.GET_USER;
  payload: User;
}

interface GetUserErrorAction {
  type: UserActionTypes.GET_USER_ERROR;
  payload: string;
}

export type UserAction =
  | FetchUserAction
  | FetchUserSuccessAction
  | FetchUserErrorAction
  | SetAuthAction
  | LoginAction
  | GetUserAction
  | GetUserErrorAction;
