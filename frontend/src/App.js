import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout components
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import DomainPage from './pages/DomainPage';
import EmailPage from './pages/EmailPage';
import UsernamePage from './pages/UsernamePage';
import IpPage from './pages/IpPage';
import AboutPage from './pages/AboutPage';

// Create a professional dark theme with a modern touch
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3AAFA9', // Teal-like color for a more professional look
      light: '#5FCFCA',
      dark: '#2A7A78',
    },
    secondary: {
      main: '#FF6B6B', // Coral accent for important actions
      light: '#FF9E9E',
      dark: '#D14545',
    },
    background: {
      default: '#17252A', // Deep blue-green for background
      paper: '#2B7A78', // Slightly lighter for cards and papers
    },
    text: {
      primary: '#DEF2F1',
      secondary: '#AADAD7',
    },
    error: {
      main: '#FF6B6B',
    },
    warning: {
      main: '#FFD166',
    },
    info: {
      main: '#73D2DE',
    },
    success: {
      main: '#06D6A0',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none', // More modern approach without all caps
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#5FCFCA',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#2B7A78',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#17252A',
          borderRight: '1px solid rgba(222, 242, 241, 0.1)',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.1)',
    '0px 6px 12px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 10px 20px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.1)',
    '0px 14px 28px rgba(0, 0, 0, 0.1)',
    '0px 16px 32px rgba(0, 0, 0, 0.1)',
    '0px 18px 36px rgba(0, 0, 0, 0.1)',
    '0px 20px 40px rgba(0, 0, 0, 0.1)',
    '0px 22px 44px rgba(0, 0, 0, 0.1)',
    '0px 24px 48px rgba(0, 0, 0, 0.1)',
    '0px 26px 52px rgba(0, 0, 0, 0.1)',
    '0px 28px 56px rgba(0, 0, 0, 0.1)',
    '0px 30px 60px rgba(0, 0, 0, 0.1)',
    '0px 32px 64px rgba(0, 0, 0, 0.1)',
    '0px 34px 68px rgba(0, 0, 0, 0.1)',
    '0px 36px 72px rgba(0, 0, 0, 0.1)',
    '0px 38px 76px rgba(0, 0, 0, 0.1)',
    '0px 40px 80px rgba(0, 0, 0, 0.1)',
    '0px 42px 84px rgba(0, 0, 0, 0.1)',
    '0px 44px 88px rgba(0, 0, 0, 0.1)',
    '0px 46px 92px rgba(0, 0, 0, 0.1)',
    '0px 48px 96px rgba(0, 0, 0, 0.1)',
  ],
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/domain" element={<DomainPage />} />
          <Route path="/email" element={<EmailPage />} />
          <Route path="/username" element={<UsernamePage />} />
          <Route path="/ip" element={<IpPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App; 