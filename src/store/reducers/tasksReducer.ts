import {
  TasksAction,
  TasksActionTypes,
  TasksState,
  Task,
} from '../../types/tasks';

const initialTasksState: TasksState = {
  tasks: [],
  loading: true,
  error: null,
};

export const tasksReducer = (
  state = initialTasksState,
  action: TasksAction,
): TasksState => {
  switch (action.type) {
    case TasksActionTypes.FETCH_TASKS:
      return { ...state, loading: true };
    case TasksActionTypes.FETCH_TASKS_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case TasksActionTypes.FETCH_TASKS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
