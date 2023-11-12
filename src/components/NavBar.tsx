import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import { ThemeContext } from '../themes/ThemeContext';
import { Link } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const { darkMode, toggleMode } = useContext(ThemeContext);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Galactic Showdown
          </Link>
        </Typography>
        <Link to="/cards" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
          Cards
        </Link>
        <Switch checked={darkMode} onChange={toggleMode} color="default" />
      </Toolbar>
    </AppBar>
  );
};
