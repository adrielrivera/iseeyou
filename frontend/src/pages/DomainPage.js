import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress, Tabs, Tab, LinearProgress, Paper, Fade } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import InfoIcon from '@mui/icons-material/Info';
import DnsIcon from '@mui/icons-material/Dns';
import HttpIcon from '@mui/icons-material/Http';
import SearchIcon from '@mui/icons-material/Search';

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
              message: "Oops! We couldn't fetch the WHOIS data. Might be rate limiting or network gremlins."
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
              message: "Hmm, couldn't grab those DNS records. The internet's being a bit dodgy."
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
              message: "Couldn't fetch the HTTP headers. The domain might be playing hard to get."
            } 
          }));
        });

      // Wait for all promises to settle (whether resolved or rejected)
      await Promise.allSettled([whoisPromise, dnsPromise, headersPromise]);
      
    } catch (err) {
      console.error('Error fetching domain information:', err);
      setError(
        err.response?.data?.error ||
          'Something went wrong while digging up info on this domain. Give it another go?'
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
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(43, 122, 120, 0.1) 0%, rgba(23, 37, 42, 0.1) 100%)',
          border: '1px solid rgba(58, 175, 169, 0.2)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DomainIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Domain Detective
          </Typography>
        </Box>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          Fancy a snoop around a domain? We'll dig up all the juicy details - from who owns it to how it's set up. Perfect for security checks or just satisfying your curiosity.
        </Typography>

        <SearchForm
          title="Domain Lookup"
          inputLabel="Domain"
          inputPlaceholder="Pop in a domain (e.g., google.com)"
          onSearch={handleSearch}
          isLoading={loading}
          searchOptions={dnsRecordTypes}
          icon={<SearchIcon color="primary" />}
        />
      </Paper>

      {loading && (
        <Fade in={loading} style={{ transitionDelay: loading ? '300ms' : '0ms' }}>
          <Box sx={{ width: '100%', mt: 2, mb: 4 }}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
              Digging up the dirt... Might take up to 15 seconds for all the juicy details.
            </Typography>
            <LinearProgress sx={{ height: 6, borderRadius: 3 }} />
          </Box>
        </Fade>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4, mt: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {domain && hasAnyResults && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Results for <span style={{ color: '#3AAFA9' }}>{domain}</span>
          </Typography>

          <Paper sx={{ borderRadius: 2, mb: 3 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="domain lookup tabs"
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  py: 2,
                  fontWeight: 500
                },
                '& .Mui-selected': {
                  fontWeight: 600
                }
              }}
            >
              <Tab 
                label="WHOIS Info" 
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
          </Paper>

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