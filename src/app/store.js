import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice'
import loginReducer from '../features/auth/loginSlice'


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    login: loginReducer,
  },
});
