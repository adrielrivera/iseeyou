import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress, Tabs, Tab } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';

import SearchForm from '../components/SearchForm';
import ResultCard from '../components/ResultCard';
import { emailApi } from '../services/api';

const EmailPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState({
    validation: null,
    breaches: null,
    domainEmails: null,
  });

  const handleSearch = async (emailValue) => {
    setEmail(emailValue);
    setLoading(true);
    setError(null);

    try {
      // Validate email
      const validationResponse = await emailApi.validate(emailValue);
      
      // Check for breaches (note: this is a placeholder in our backend)
      const breachesResponse = await emailApi.checkBreaches(emailValue);
      
      // If it's a domain, try to find associated emails
      let domainEmailsResponse = null;
      if (emailValue.includes('@')) {
        const domain = emailValue.split('@')[1];
        domainEmailsResponse = await emailApi.findDomainEmails(domain);
      }

      setResults({
        validation: validationResponse.data,
        breaches: breachesResponse.data,
        domainEmails: domainEmailsResponse?.data || null,
      });
    } catch (err) {
      console.error('Error fetching email information:', err);
      setError(
        err.response?.data?.error ||
          'An error occurred while fetching email information. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Email Lookup
      </Typography>
      <Typography variant="body1" paragraph>
        Validate email addresses, check for data breaches, and find emails associated with domains.
      </Typography>

      <SearchForm
        title="Email Lookup"
        inputLabel="Email"
        inputPlaceholder="Enter an email address (e.g., user@example.com)"
        onSearch={handleSearch}
        isLoading={loading}
        icon={<EmailIcon color="primary" />}
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

      {!loading && !error && email && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Results for {email}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="email lookup tabs">
              <Tab label="Validation" icon={<VerifiedUserIcon />} iconPosition="start" />
              <Tab label="Data Breaches" icon={<SecurityIcon />} iconPosition="start" />
              {results.domainEmails && (
                <Tab label="Domain Emails" icon={<SearchIcon />} iconPosition="start" />
              )}
            </Tabs>
          </Box>

          {activeTab === 0 && results.validation && (
            <ResultCard
              title="Email Validation"
              data={results.validation}
              icon={<VerifiedUserIcon color="primary" />}
            />
          )}

          {activeTab === 1 && results.breaches && (
            <ResultCard
              title="Data Breaches"
              data={results.breaches}
              icon={<SecurityIcon color="primary" />}
            />
          )}

          {activeTab === 2 && results.domainEmails && (
            <ResultCard
              title="Domain Emails"
              data={results.domainEmails}
              icon={<SearchIcon color="primary" />}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default EmailPage; 