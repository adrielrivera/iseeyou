import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress, Grid, Chip, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import SearchForm from '../components/SearchForm';
import ResultCard from '../components/ResultCard';
import { usernameApi } from '../services/api';

const UsernamePage = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [sherlockResults, setSherlockResults] = useState(null);

  const handleSearch = async (usernameValue) => {
    setUsername(usernameValue);
    setLoading(true);
    setError(null);

    try {
      // Search for username across platforms
      const searchResponse = await usernameApi.search(usernameValue);
      
      // Get Sherlock results (note: this is a placeholder in our backend)
      const sherlockResponse = await usernameApi.sherlockSearch(usernameValue);
      
      setResults(searchResponse.data);
      setSherlockResults(sherlockResponse.data);
    } catch (err) {
      console.error('Error fetching username information:', err);
      setError(
        err.response?.data?.error ||
          'An error occurred while fetching username information. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Username Lookup
      </Typography>
      <Typography variant="body1" paragraph>
        Search for usernames across multiple social media platforms and online services.
      </Typography>

      <SearchForm
        title="Username Lookup"
        inputLabel="Username"
        inputPlaceholder="Enter a username to search"
        onSearch={handleSearch}
        isLoading={loading}
        icon={<PersonIcon color="primary" />}
      />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && results && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Results for username: {username}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Platform Search Results
            </Typography>
            <Grid container spacing={2}>
              {results.results.map((result) => (
                <Grid item xs={12} sm={6} md={4} key={result.site}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: 1,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: result.exists ? 'success.main' : 'error.main' }}>
                        {result.exists ? <CheckCircleIcon /> : <CancelIcon />}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">{result.site}</Typography>
                        <Typography
                          variant="body2"
                          component="a"
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: 'text.secondary', textDecoration: 'none' }}
                        >
                          {result.url}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={result.exists ? 'Found' : 'Not Found'}
                      color={result.exists ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {sherlockResults && (
            <ResultCard
              title="Sherlock Results (Placeholder)"
              data={sherlockResults}
              icon={<PersonIcon color="primary" />}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default UsernamePage; 