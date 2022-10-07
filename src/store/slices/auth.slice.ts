import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

type AuthState = {
  token: string | null;
  expire: number;
}

const initialState: AuthState = {
  token: null,
  expire: 0,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token, expire } }: PayloadAction<{ token: string, expire: number }>
    ) => {
      state.token = token;
      state.expire = expire;
    },
    clearAuth: (state) => {
      state.token = null;
      state.expire = 0;
    }
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

// export const GetCurrentUser = (state: RootState) => state.auth.token;
