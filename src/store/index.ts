import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './slices/user.slice';
import { taskReducer } from './slices/task.slice';
import { authReducer } from './slices/auth.slice';
import { authApi } from './api/auth.api';
import { taskApi } from './api/task.api';
import { userApi } from './api/user.api';

const rootReducer = {
  user: userReducer,
  task: taskReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, taskApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
