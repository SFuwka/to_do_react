import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import BaseStructure from './components/BaseStricture';
import { darkMode } from './features/theme/themeSlice';

function App() {
  const theme = useSelector(darkMode)
  const dark = createMuiTheme({
    palette: {
      type: 'dark',
      text: {
        primary: '#ffffff'
      }
    },
    background: '#424242'
  })

  const light = createMuiTheme({
    palette: {
      type: 'light',
      text: {
        primary: '#000000'
      }
    },
    background: '#ffffff'
  })
  return (
    <ThemeProvider theme={theme ? dark : light}>
      <Router>
        <BaseStructure />
      </Router>
    </ThemeProvider>

  );
}

export default App;
