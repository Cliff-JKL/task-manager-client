import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IGetUser, UpdateUserDto } from '../../types/user';
import { RootState } from '../index';
import { ICreatedTask } from '../../types/tasks';

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/users',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      headers.set('Content-type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // refetchOnFocus: true,
  endpoints: build => ({
    getUser: build.query<IGetUser, void>({
      query: () => ({
        url: ``,
        method: 'GET',
      }),
    }),
    updateUser: build.mutation<IGetUser, UpdateUserDto>({
      query: (userDto) => ({
        url: ``,
        method: 'PUT',
        body: userDto,
      }),
    }),
    getCreatedTasks: build.query<ICreatedTask[], void>({
      query: () => ({
        url: `/tasks/my`,
        method: 'GET',
      }),
      transformResponse: (response: { tasks: ICreatedTask[] }) => response?.tasks,
    }),
  })
})

export const { useLazyGetUserQuery, useGetCreatedTasksQuery, useLazyGetCreatedTasksQuery } = userApi
