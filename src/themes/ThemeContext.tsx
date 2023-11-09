import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext({
    darkMode: false,
    toggleMode: () => {},
});

export const ThemeProvider = ({ children } : any) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleMode = () => {
        setDarkMode(!darkMode);
    };

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
