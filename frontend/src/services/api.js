import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Domain endpoints
export const domainApi = {
  getWhois: (domain) => api.post('/domain/whois', { domain }),
  getDns: (domain, recordTypes) => api.post('/domain/dns', { domain, record_types: recordTypes }),
  getHeaders: (domain) => api.post('/domain/headers', { domain }),
};

// Email endpoints
export const emailApi = {
  validate: (email) => api.post('/email/validate', { email }),
  checkBreaches: (email) => api.post('/email/haveibeenpwned', { email }),
  findDomainEmails: (domain) => api.post('/email/domain-emails', { domain }),
};

// Username endpoints
export const usernameApi = {
  search: (username, limit) => api.post('/username/search', { username, limit }),
  sherlockSearch: (username) => api.post('/username/sherlock', { username }),
};

// IP endpoints
export const ipApi = {
  getGeolocation: (ip) => api.post('/ip/geolocation', { ip }),
  getWhois: (ip) => api.post('/ip/whois', { ip }),
  getReverseDns: (ip) => api.post('/ip/reverse-dns', { ip }),
  getShodan: (ip) => api.post('/ip/shodan', { ip }),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api; 