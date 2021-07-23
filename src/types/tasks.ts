export interface Task {
  id: number;
  name: string;
  isFinished: boolean;
}

export interface TasksState {
  tasks: Array<Task>;
  loading: boolean;
  error: null | string;
}

export enum TasksActionTypes {
  FETCH_TASKS = 'FETCH_TASKS',
  FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
}

interface FetchTasksAction {
  type: TasksActionTypes.FETCH_TASKS;
}

interface FetchTasksSuccessAction {
  type: TasksActionTypes.FETCH_TASKS_SUCCESS;
  payload: Array<Task>;
}

interface FetchTasksErrorAction {
  type: TasksActionTypes.FETCH_TASKS_ERROR;
  payload: string;
}

export type TasksAction =
  | FetchTasksAction
  | FetchTasksSuccessAction
  | FetchTasksErrorAction;
