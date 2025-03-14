import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardActionArea, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DomainIcon from '@mui/icons-material/Domain';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SecurityIcon from '@mui/icons-material/Security';

const tools = [
  {
    title: 'Domain Lookup',
    description: 'Dig up the dirt on domains with WHOIS details, DNS records, and HTTP headers.',
    icon: <DomainIcon fontSize="large" color="primary" />,
    path: '/domain',
    tag: 'Popular'
  },
  {
    title: 'Email Lookup',
    description: 'Check if that email is legit, been in any data breaches, or find other emails tied to a domain.',
    icon: <EmailIcon fontSize="large" color="primary" />,
    path: '/email',
    tag: 'Essential'
  },
  {
    title: 'Username Lookup',
    description: 'Track down usernames across loads of social platforms and online services.',
    icon: <PersonIcon fontSize="large" color="primary" />,
    path: '/username',
    tag: 'Powerful'
  },
  {
    title: 'IP Lookup',
    description: 'Fancy knowing where that IP is based? Get location, WHOIS info, reverse DNS, and Shodan data.',
    icon: <PublicIcon fontSize="large" color="primary" />,
    path: '/ip',
    tag: 'Advanced'
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 5,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #2B7A78 0%, #17252A 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '100%', 
            height: '100%', 
            opacity: 0.05,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '15px 15px',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <VisibilityIcon fontSize="large" color="primary" sx={{ mr: 2, fontSize: '3rem' }} />
            <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 0, fontWeight: 700 }}>
              I See You
            </Typography>
          </Box>
          <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 3 }}>
            Your go-to OSINT toolkit for cyber sleuthing
          </Typography>
          <Typography paragraph sx={{ mb: 4, maxWidth: '800px' }}>
            Fancy yourself a bit of a digital detective? Our toolkit helps you gather intel on domains, emails, usernames, and IPs. Perfect for security pros, researchers, and the properly curious. Just remember to play nice and keep it legal!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/domain')}
              startIcon={<DomainIcon />}
              sx={{ fontWeight: 600 }}
            >
              Start Investigating
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/about')}
              startIcon={<SecurityIcon />}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 4, fontWeight: 600 }}>
        Our Toolkit
      </Typography>

      <Grid container spacing={3}>
        {tools.map((tool) => (
          <Grid item xs={12} sm={6} md={3} key={tool.title}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              {tool.tag && (
                <Chip 
                  label={tool.tag} 
                  color="secondary" 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10, 
                    zIndex: 1,
                    fontWeight: 600
                  }} 
                />
              )}
              <CardActionArea
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 1 }}
                onClick={() => navigate(tool.path)}
              >
                <CardContent sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
                    {React.cloneElement(tool.icon, { style: { fontSize: 60 } })}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {tool.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {tool.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3, mt: 6, borderRadius: 2, borderLeft: '4px solid', borderColor: 'warning.main' }}>
        <Typography variant="subtitle1" color="warning.main" gutterBottom sx={{ fontWeight: 600 }}>
          Friendly Reminder
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This tool is meant for educational purposes and legitimate security research. Always make sure you've got proper authorisation before poking around. Using this for dodgy stuff could land you in hot water with the law. Stay curious, but stay legal!
        </Typography>
      </Paper>
    </Box>
  );
};

export default HomePage; 