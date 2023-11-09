import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext({
    darkMode: false,
    toggleMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);
