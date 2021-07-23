import { Dispatch } from 'redux';
import Cookies from 'js-cookie';

import { UserAction, UserActionTypes, User } from '../../types/user';

export const login = (username: string, password: string) => async (dispatch: Dispatch<UserAction>) => {
  try {
    dispatch({ type: UserActionTypes.FETCH_USER });

    const loginData = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res: Response) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        }
        const error = new Error(res.statusText);
        throw error;
      })
      .then((res: Response) => res.json())
      .then((data: any) => {
        const user: User = {
          username: username,
          password: password
        };
        Cookies.set('Access_token', data.access_token, { expires: 7 });
        localStorage.setItem('user', JSON.stringify(user));
        return {
          token: data.access_token,
          user: user
        };
      });

    setTimeout(() => {
      dispatch({ type: UserActionTypes.LOGIN, payload: loginData });
    }, 500);
  } catch (e) {
    dispatch({ type: UserActionTypes.FETCH_USER_ERROR, payload: e.message });
  }
};

export const getUser = () => async (dispatch: Dispatch<UserAction>) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch({ type: UserActionTypes.GET_USER, payload: user });
  } catch (e) {
    dispatch({ type: UserActionTypes.GET_USER_ERROR, payload: e.message });
  }
};