import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetUser } from '../../types/user';

type UserState = {
  user: IGetUser | null;
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload: user }: PayloadAction<IGetUser>) => {
      state.user = user;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;