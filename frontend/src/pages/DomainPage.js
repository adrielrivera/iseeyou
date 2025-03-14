import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress, Tabs, Tab } from '@mui/material';
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

    try {
      // Get WHOIS information
      const whoisResponse = await domainApi.getWhois(domainValue);
      
      // Get DNS records
      const dnsResponse = await domainApi.getDns(
        domainValue,
        selectedOptions.length > 0 ? selectedOptions : undefined
      );
      
      // Get HTTP headers
      const headersResponse = await domainApi.getHeaders(domainValue);

      setResults({
        whois: whoisResponse.data,
        dns: dnsResponse.data,
        headers: headersResponse.data,
      });
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
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && domain && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Results for {domain}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="domain lookup tabs">
              <Tab label="WHOIS" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="DNS Records" icon={<DnsIcon />} iconPosition="start" />
              <Tab label="HTTP Headers" icon={<HttpIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          {activeTab === 0 && results.whois && (
            <ResultCard
              title="WHOIS Information"
              data={results.whois}
              icon={<InfoIcon color="primary" />}
            />
          )}

          {activeTab === 1 && results.dns && (
            <ResultCard
              title="DNS Records"
              data={results.dns}
              icon={<DnsIcon color="primary" />}
            />
          )}

          {activeTab === 2 && results.headers && (
            <ResultCard
              title="HTTP Headers"
              data={results.headers}
              icon={<HttpIcon color="primary" />}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default DomainPage; 