import { Dispatch } from 'redux';

import { TasksAction, TasksActionTypes, Task } from '../../types/tasks';

export const fetchTasks = (auth: string) => async (dispatch: Dispatch<TasksAction>) => {
  try {
    dispatch({ type: TasksActionTypes.FETCH_TASKS });

    const result = await fetch('http://localhost:3000/api/tasks', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth}`,
        'Content-type': 'application/json',
      },
    })
      .then((res: Response) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }
        const error = new Error(res.statusText);
        throw error;
      })
      .then((res: Response) => res.json())
      .then((data: Array<Task>) => data);

    setTimeout(() => {
      dispatch({
        type: TasksActionTypes.FETCH_TASKS_SUCCESS,
        payload: result,
      });
    }, 500);
  } catch (e) {
    dispatch({
      type: TasksActionTypes.FETCH_TASKS_ERROR,
      payload: e.message,
    });
  }
};
