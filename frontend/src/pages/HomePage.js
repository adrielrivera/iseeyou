import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardActionArea, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DomainIcon from '@mui/icons-material/Domain';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';

const tools = [
  {
    title: 'Domain Lookup',
    description: 'Gather information about domains including WHOIS, DNS records, and HTTP headers.',
    icon: <DomainIcon fontSize="large" color="primary" />,
    path: '/domain',
  },
  {
    title: 'Email Lookup',
    description: 'Validate email addresses, check for data breaches, and find emails associated with domains.',
    icon: <EmailIcon fontSize="large" color="primary" />,
    path: '/email',
  },
  {
    title: 'Username Lookup',
    description: 'Search for usernames across multiple social media platforms and online services.',
    icon: <PersonIcon fontSize="large" color="primary" />,
    path: '/username',
  },
  {
    title: 'IP Lookup',
    description: 'Get geolocation, WHOIS information, reverse DNS, and Shodan data for IP addresses.',
    icon: <PublicIcon fontSize="large" color="primary" />,
    path: '/ip',
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: 'linear-gradient(45deg, #303030 30%, #424242 90%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <VisibilityIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            I See You - OSINT Tool
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" paragraph>
          A powerful Open Source Intelligence (OSINT) platform for cybersecurity research and reconnaissance.
        </Typography>
        <Typography paragraph>
          This tool provides various capabilities to gather intelligence on domains, email addresses, usernames, and IP addresses.
          Use it responsibly and ethically for legitimate security research purposes only.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/about')}
          sx={{ mt: 2 }}
        >
          Learn More
        </Button>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
        Available Tools
      </Typography>

      <Grid container spacing={3}>
        {tools.map((tool) => (
          <Grid item xs={12} sm={6} md={3} key={tool.title}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                onClick={() => navigate(tool.path)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
                    {tool.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {tool.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tool.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 6, borderRadius: 2 }}>
        <Typography variant="subtitle1" color="warning.main" gutterBottom>
          Disclaimer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This tool is intended for educational and legitimate security research purposes only. Always ensure you have proper authorization before conducting OSINT activities on any target. Unauthorized use may violate applicable laws and regulations.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HomePage; 