import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress, Tabs, Tab } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import DnsIcon from '@mui/icons-material/Dns';
import SecurityIcon from '@mui/icons-material/Security';

import SearchForm from '../components/SearchForm';
import ResultCard from '../components/ResultCard';
import { ipApi } from '../services/api';

const IpPage = () => {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState({
    geolocation: null,
    whois: null,
    reverseDns: null,
    shodan: null,
  });

  const handleSearch = async (ipValue) => {
    setIp(ipValue);
    setLoading(true);
    setError(null);

    try {
      // Get geolocation information
      const geoResponse = await ipApi.getGeolocation(ipValue);
      
      // Get WHOIS information
      const whoisResponse = await ipApi.getWhois(ipValue);
      
      // Get reverse DNS information
      const dnsResponse = await ipApi.getReverseDns(ipValue);
      
      // Get Shodan information (note: this is a placeholder in our backend)
      const shodanResponse = await ipApi.getShodan(ipValue);

      setResults({
        geolocation: geoResponse.data,
        whois: whoisResponse.data,
        reverseDns: dnsResponse.data,
        shodan: shodanResponse.data,
      });
    } catch (err) {
      console.error('Error fetching IP information:', err);
      setError(
        err.response?.data?.error ||
          'An error occurred while fetching IP information. Please try again.'
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
        IP Lookup
      </Typography>
      <Typography variant="body1" paragraph>
        Get geolocation, WHOIS information, reverse DNS, and Shodan data for IP addresses.
      </Typography>

      <SearchForm
        title="IP Lookup"
        inputLabel="IP Address"
        inputPlaceholder="Enter an IP address (e.g., 8.8.8.8)"
        onSearch={handleSearch}
        isLoading={loading}
        icon={<PublicIcon color="primary" />}
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

      {!loading && !error && ip && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Results for IP: {ip}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="ip lookup tabs">
              <Tab label="Geolocation" icon={<LocationOnIcon />} iconPosition="start" />
              <Tab label="WHOIS" icon={<InfoIcon />} iconPosition="start" />
              <Tab label="Reverse DNS" icon={<DnsIcon />} iconPosition="start" />
              <Tab label="Shodan" icon={<SecurityIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          {activeTab === 0 && results.geolocation && (
            <ResultCard
              title="Geolocation Information"
              data={results.geolocation}
              icon={<LocationOnIcon color="primary" />}
            />
          )}

          {activeTab === 1 && results.whois && (
            <ResultCard
              title="WHOIS Information"
              data={results.whois}
              icon={<InfoIcon color="primary" />}
            />
          )}

          {activeTab === 2 && results.reverseDns && (
            <ResultCard
              title="Reverse DNS Information"
              data={results.reverseDns}
              icon={<DnsIcon color="primary" />}
            />
          )}

          {activeTab === 3 && results.shodan && (
            <ResultCard
              title="Shodan Information"
              data={results.shodan}
              icon={<SecurityIcon color="primary" />}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default IpPage; 