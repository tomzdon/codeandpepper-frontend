import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import { ThemeContext } from '../themes/ThemeContext';

export const NavBar: React.FC = () => {
  const { darkMode, toggleMode } = useContext(ThemeContext);
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
          Galactic Showdown
        </Typography>
        <Switch checked={darkMode} onChange={toggleMode} color="default" />
      </Toolbar>
    </AppBar>
  );
};
