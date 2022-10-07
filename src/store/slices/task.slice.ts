import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreatedTask, ITask } from '../../types/tasks';

const LS_TASKS_KEY = 'rfk'

type TasksState = {
  tasks: ICreatedTask[];
}

const initialState: TasksState = {
  // tasks: JSON.parse(localStorage.getItem(LS_TASKS_KEY) ?? '[]'),
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask(state, action: PayloadAction<ICreatedTask>) {
      state.tasks.push(action.payload)
      // localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.tasks))
    },
    updateTask(state, action: PayloadAction<{ id: number, task: ITask }>) {
      const p = action.payload;
      const updatedTask = {
        id: p.id,
        creatorUid: p.task.creator.uid,
        isFinished: p.task.isFinished,
        text: p.task.text,
      };
      state.tasks = state.tasks.map(t => t.id === p.id ? updatedTask : t);
      // localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.tasks))
    },
    removeTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
      // localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.tasks))
    },
    setTasks: (state, { payload: tasks }: PayloadAction<ICreatedTask[]>) => {
      state.tasks = tasks;
    },
  }
});

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
