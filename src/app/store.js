import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import loginReducer from '../features/auth/loginSlice'
import signUpReducer from '../features/auth/signUpSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    login: loginReducer,
    signUp: signUpReducer,
    auth: authReducer,
  },
});
