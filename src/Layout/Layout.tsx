import React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../themes/ThemeContext';
import { NavBar } from '../components/NavBar';

import type { PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <NavBar />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1rem 1.0875rem 1.45rem',
        }}
      >
        <main>{children}</main>
      </div>
      <footer
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100vw',
          maxWidth: '100%',
          padding: 0,
          margin: 0,
          backgroundColor: '#26a27b',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginTop: '1em',
            color: 'white',
            textDecoration: 'none',
            marginBottom: '1em',
          }}
        >
          <a
            href="https://snappywebdesign.net/"
            style={{
              textDecoration: 'none',
              color: '#FFF',
              paddingBottom: 3,
              borderBottom: `1px solid white`,
            }}
          >
            Tomasz Wlodarczyk
          </a>
        </div>
      </footer>
    </ThemeProvider>
  );
};
