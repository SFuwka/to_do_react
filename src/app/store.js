import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import loginReducer from '../features/auth/loginSlice'
import signUpReducer from '../features/auth/signUpSlice'
import authReducer from '../features/auth/authSlice'
import projectReducer from '../features/project/projectSlice'
import taskReducer from '../features/task/tasksSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    login: loginReducer,
    signUp: signUpReducer,
    auth: authReducer,
    project: projectReducer,
    task: taskReducer
  },
});
