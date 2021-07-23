import {
  UserAction, UserActionTypes, UserState, User,
} from '../../types/user';

const initialUserState: UserState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: null,
  token: null,
};

export const userReducer = (
  state = initialUserState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { ...state, loading: true };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UserActionTypes.FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UserActionTypes.SET_AUTH:
      return { ...state, loading: false, token: action.payload };
    case UserActionTypes.LOGIN:
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
    case UserActionTypes.GET_USER:
      return { ...state, user: action.payload };
    case UserActionTypes.GET_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
