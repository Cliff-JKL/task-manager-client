import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../index'

export interface TokenResponse {
  token: string;
  expire: number;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest extends SignInRequest {
  username: string;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      headers.set('Content-type', 'application/json');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, SignInRequest>({
      query: (userData) => ({
        url: '/signin',
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),
    register: builder.mutation<TokenResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    refresh: builder.mutation<TokenResponse, void>({
      query: () => ({
        url: '/refresh',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    logout: builder.mutation<TokenResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } = authApi
