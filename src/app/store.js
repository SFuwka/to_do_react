import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import loginReducer from '../features/auth/loginSlice'
import signUpReducer from '../features/auth/signUpSlice'
import authReducer from '../features/auth/authSlice'
import projectReducer from '../features/project/projectSlice'
import taskReducer from '../features/task/tasksSlice'
import userReducer from '../features/users/usersSlice'
import searchReducer from '../features/search/searchSlice'
import forgotPasswordReducer from '../features/auth/forgotPasswordSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    login: loginReducer,
    signUp: signUpReducer,
    forgotPassword: forgotPasswordReducer,
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    task: taskReducer,
    search: searchReducer,
  },
});
