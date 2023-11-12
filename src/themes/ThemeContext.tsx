import React, { createContext, useState, useMemo, useEffect, useCallback } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import type { PropsWithChildren } from 'react';

export const ThemeContext = createContext({
  darkMode: false,
  toggleMode: () => {},
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === null ? true : savedMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleMode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
