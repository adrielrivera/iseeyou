import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress, Tabs, Tab, LinearProgress } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import InfoIcon from '@mui/icons-material/Info';
import DnsIcon from '@mui/icons-material/Dns';
import HttpIcon from '@mui/icons-material/Http';

import SearchForm from '../components/SearchForm';
import ResultCard from '../components/ResultCard';
import { domainApi } from '../services/api';

const dnsRecordTypes = [
  { value: 'A', label: 'A' },
  { value: 'AAAA', label: 'AAAA' },
  { value: 'MX', label: 'MX' },
  { value: 'NS', label: 'NS' },
  { value: 'TXT', label: 'TXT' },
  { value: 'SOA', label: 'SOA' },
  { value: 'CNAME', label: 'CNAME' },
];

const DomainPage = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    whois: false,
    dns: false,
    headers: false
  });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState({
    whois: null,
    dns: null,
    headers: null,
  });

  const handleSearch = async (domainValue, selectedOptions) => {
    setDomain(domainValue);
    setLoading(true);
    setError(null);
    
    // Reset results
    setResults({
      whois: null,
      dns: null,
      headers: null,
    });
    
    // Set all loading states to true
    setLoadingStates({
      whois: true,
      dns: true,
      headers: true
    });

    try {
      // Get WHOIS information (don't await here to allow parallel requests)
      const whoisPromise = domainApi.getWhois(domainValue)
        .then(response => {
          setResults(prev => ({ ...prev, whois: response.data }));
          setLoadingStates(prev => ({ ...prev, whois: false }));
        })
        .catch(err => {
          console.error('WHOIS error:', err);
          setLoadingStates(prev => ({ ...prev, whois: false }));
          // Don't set global error, just mark this result as having an error
          setResults(prev => ({ 
            ...prev, 
            whois: { 
              domain: domainValue,
              error: err.message,
              message: "Error fetching WHOIS data. This might be due to rate limiting or network issues."
            } 
          }));
        });
      
      // Get DNS records
      const dnsPromise = domainApi.getDns(
        domainValue,
        selectedOptions.length > 0 ? selectedOptions : undefined
      )
        .then(response => {
          setResults(prev => ({ ...prev, dns: response.data }));
          setLoadingStates(prev => ({ ...prev, dns: false }));
        })
        .catch(err => {
          console.error('DNS error:', err);
          setLoadingStates(prev => ({ ...prev, dns: false }));
          setResults(prev => ({ 
            ...prev, 
            dns: { 
              domain: domainValue,
              error: err.message,
              message: "Error fetching DNS records. This might be due to network issues."
            } 
          }));
        });
      
      // Get HTTP headers
      const headersPromise = domainApi.getHeaders(domainValue)
        .then(response => {
          setResults(prev => ({ ...prev, headers: response.data }));
          setLoadingStates(prev => ({ ...prev, headers: false }));
        })
        .catch(err => {
          console.error('Headers error:', err);
          setLoadingStates(prev => ({ ...prev, headers: false }));
          setResults(prev => ({ 
            ...prev, 
            headers: { 
              domain: domainValue,
              error: err.message,
              message: "Error fetching HTTP headers. The domain might be unreachable."
            } 
          }));
        });

      // Wait for all promises to settle (whether resolved or rejected)
      await Promise.allSettled([whoisPromise, dnsPromise, headersPromise]);
      
    } catch (err) {
      console.error('Error fetching domain information:', err);
      setError(
        err.response?.data?.error ||
          'An error occurred while fetching domain information. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Determine if we have any results at all
  const hasAnyResults = results.whois || results.dns || results.headers;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Domain Lookup
      </Typography>
      <Typography variant="body1" paragraph>
        Gather intelligence on domains including WHOIS information, DNS records, and HTTP headers.
      </Typography>

      <SearchForm
        title="Domain Lookup"
        inputLabel="Domain"
        inputPlaceholder="Enter a domain (e.g., example.com)"
        onSearch={handleSearch}
        isLoading={loading}
        searchOptions={dnsRecordTypes}
        icon={<DomainIcon color="primary" />}
      />

      {loading && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
            Fetching domain information... This may take up to 15 seconds.
          </Typography>
          <LinearProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4, mt: 2 }}>
          {error}
        </Alert>
      )}

      {domain && hasAnyResults && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Results for {domain}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="domain lookup tabs">
              <Tab 
                label="WHOIS" 
                icon={<InfoIcon />} 
                iconPosition="start" 
                disabled={loadingStates.whois}
              />
              <Tab 
                label="DNS Records" 
                icon={<DnsIcon />} 
                iconPosition="start" 
                disabled={loadingStates.dns}
              />
              <Tab 
                label="HTTP Headers" 
                icon={<HttpIcon />} 
                iconPosition="start" 
                disabled={loadingStates.headers}
              />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            loadingStates.whois ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : results.whois && (
              <ResultCard
                title="WHOIS Information"
                data={results.whois}
                icon={<InfoIcon color="primary" />}
              />
            )
          )}

          {activeTab === 1 && (
            loadingStates.dns ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : results.dns && (
              <ResultCard
                title="DNS Records"
                data={results.dns}
                icon={<DnsIcon color="primary" />}
              />
            )
          )}

          {activeTab === 2 && (
            loadingStates.headers ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : results.headers && (
              <ResultCard
                title="HTTP Headers"
                data={results.headers}
                icon={<HttpIcon color="primary" />}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default DomainPage; 