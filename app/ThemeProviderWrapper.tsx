'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeToggleContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

// Ethan Schoonover's Solarized color palette
// Dark Mode:
// background.default: #002b36 (Base03)
// background.paper: #073642 (Base02)
// text.primary: #93a1a1 (Base1)
// text.secondary: #839496 (Base0)
// Light Mode:
// background.default: #fdf6e3 (Base3)
// background.paper: #eee8d5 (Base2)
// text.primary: #586e75 (Base01)
// text.secondary: #657b83 (Base00)

const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: {
            main: '#2aa198', // Cyan
            contrastText: '#002b36',
          },
          secondary: {
            main: '#6c71c4', // Violet
            contrastText: '#eee8d5',
          },
          background: {
            default: '#002b36',
            paper: '#073642',
          },
          text: {
            primary: '#93a1a1', // Base1
            secondary: '#839496', // Base0
            disabled: '#586e75', // Base01
          },
          divider: 'rgba(88, 110, 117, 0.25)',
        }
      : {
          primary: {
            main: '#2aa198', // Cyan
            contrastText: '#fdf6e3',
          },
          secondary: {
            main: '#6c71c4', // Violet
            contrastText: '#073642',
          },
          background: {
            default: '#fdf6e3',
            paper: '#eee8d5',
          },
          text: {
            primary: '#586e75', // Base01
            secondary: '#657b83', // Base00
            disabled: '#93a1a1', // Base1
          },
          divider: 'rgba(7, 54, 66, 0.15)',
        }),
    success: {
      main: '#859900', // Green
    },
    warning: {
      main: '#b58900', // Yellow
    },
    error: {
      main: '#dc322f', // Red
    },
    info: {
      main: '#268bd2', // Blue
    },
  },
  typography: {
    fontFamily: 'var(--font-outfit), var(--font-sans), sans-serif',
    h1: { fontFamily: 'var(--font-outfit), var(--font-sans), sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'var(--font-outfit), var(--font-sans), sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'var(--font-outfit), var(--font-sans), sans-serif', fontWeight: 650 },
    h4: { fontFamily: 'var(--font-outfit), var(--font-sans), sans-serif', fontWeight: 650 },
    h5: { fontFamily: 'var(--font-outfit), var(--font-sans), sans-serif', fontWeight: 600 },
    h6: { fontFamily: 'var(--font-outfit), var(--font-sans), sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 550 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24, // M3 pill style
          padding: '8px 24px',
          transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#35b5a7',
          },
        },
        outlined: {
          borderWidth: 1,
          borderColor: mode === 'dark' ? 'rgba(42, 161, 152, 0.4)' : 'rgba(42, 161, 152, 0.6)',
          '&:hover': {
            borderWidth: 1,
            borderColor: '#2aa198',
            backgroundColor: 'rgba(42, 161, 152, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundColor: mode === 'dark' ? '#073642' : '#eee8d5',
          border: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.2)' : '1px solid rgba(7, 54, 66, 0.12)',
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(0, 43, 54, 0.8)' : 'rgba(253, 246, 227, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.2)' : '1px solid rgba(7, 54, 66, 0.1)',
          boxShadow: 'none',
        },
      },
    },
  },
});

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme preference on mount to prevent SSR mismatch
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setMode(savedTheme);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme-mode', next);
      return next;
    });
  };

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // Render a transparent shell on server to prevent flash of unstyled content
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
