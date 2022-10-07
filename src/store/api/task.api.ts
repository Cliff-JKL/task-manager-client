import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { ITask, IUpdateTask, CreateTaskDto, ICreatedTask } from '../../types/tasks';
import { RootState } from '../index';

export const taskApi = createApi({
  reducerPath: 'task/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/tasks',
    prepareHeaders: (headers, { getState }) => {
      // TODO create auth verification middleware
      const token = (getState() as RootState).auth.token;
      headers.set('Content-type', 'application/json');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // refetchOnFocus: true,
  endpoints: build => ({
    createTaskAsync: build.mutation<ICreatedTask, CreateTaskDto>({
      query: (taskDto: CreateTaskDto) => ({
        url: ``,
        method: 'POST',
        body: taskDto,
        // credentials: 'include',
      }),
    }),
    getTaskAsync: build.query<ITask, number>({
      query: (id: number) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    updateTaskAsync: build.mutation<ITask, IUpdateTask>({
      query: (updatedTaskData: IUpdateTask) => ({
        url: `/${updatedTaskData.id}`,
        method: 'PUT',
        body: updatedTaskData.task,
      }),
    }),
    deleteTaskAsync: build.mutation<ITask, number>({
      query: (id: number) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateTaskAsyncMutation, useUpdateTaskAsyncMutation, useDeleteTaskAsyncMutation } = taskApi;
