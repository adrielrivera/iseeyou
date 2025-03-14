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

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
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