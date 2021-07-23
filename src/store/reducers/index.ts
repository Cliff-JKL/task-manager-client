import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
