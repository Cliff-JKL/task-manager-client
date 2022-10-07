import { taskActions } from './task.slice';
import { authActions } from './auth.slice';
import { userActions } from './user.slice';

export default {
  ...authActions,
  ...userActions,
  ...taskActions,
};
