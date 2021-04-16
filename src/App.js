import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { dark, light } from './AppTheme';
import BaseStructure from './components/BaseStricture';
import { authMe, isAuthorized } from './features/auth/authSlice';
import { darkMode } from './features/theme/themeSlice';

function App() {
  const theme = useSelector(darkMode)
  const darkTheme = createMuiTheme(dark)
  const lightTheme = createMuiTheme(light)
  const dispatch = useDispatch()
  const auth = useSelector(isAuthorized)

  useEffect(() => {
    if (!auth) {
      dispatch(authMe())
    }
  })

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <Router>
        <BaseStructure />
      </Router>
    </ThemeProvider>

  );
}

export default App;
