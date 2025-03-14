import React from 'react';
import { Box, Typography, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AboutPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        About I See You
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoIcon color="primary" sx={{ mr: 2 }} />
          <Typography variant="h5" component="h2">
            Project Overview
          </Typography>
        </Box>
        <Typography paragraph>
          "I See You" is an Open Source Intelligence (OSINT) web application designed for cybersecurity professionals, 
          researchers, and enthusiasts. It provides a collection of tools to gather intelligence on domains, email addresses, 
          usernames, and IP addresses.
        </Typography>
        <Typography paragraph>
          This project was created as a portfolio piece to demonstrate skills in cybersecurity, web development, 
          and API integration. It showcases the ability to build a comprehensive tool that leverages various 
          OSINT techniques and external services.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CodeIcon color="primary" sx={{ mr: 2 }} />
          <Typography variant="h5" component="h2">
            Technologies Used
          </Typography>
        </Box>
        <Typography paragraph>
          This application is built using modern web technologies and integrates with various OSINT tools and APIs:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Frontend" 
              secondary="React, Material-UI, Axios, React Router" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Backend" 
              secondary="Python, Flask, Flask-CORS" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="OSINT Tools & APIs" 
              secondary="WHOIS, DNS, Shodan, HaveIBeenPwned, IP Geolocation, Sherlock" 
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <VisibilityIcon color="primary" sx={{ mr: 2 }} />
          <Typography variant="h5" component="h2">
            Features
          </Typography>
        </Box>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Domain Intelligence" 
              secondary="WHOIS lookups, DNS record analysis, HTTP header inspection" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Email Intelligence" 
              secondary="Email validation, breach checking, domain email discovery" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Username Intelligence" 
              secondary="Social media presence detection across multiple platforms" 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="IP Intelligence" 
              secondary="Geolocation, WHOIS information, reverse DNS, Shodan integration" 
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'warning.dark' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WarningIcon sx={{ mr: 2, color: 'white' }} />
          <Typography variant="h5" component="h2" sx={{ color: 'white' }}>
            Legal Disclaimer
          </Typography>
        </Box>
        <Typography paragraph sx={{ color: 'white' }}>
          This tool is intended for educational and legitimate security research purposes only. Always ensure you have proper 
          authorization before conducting OSINT activities on any target. Unauthorized use may violate applicable laws and 
          regulations.
        </Typography>
        <Typography paragraph sx={{ color: 'white' }}>
          The creator of this tool is not responsible for any misuse or damage caused by this program. Users are responsible 
          for ensuring their use complies with all applicable laws and regulations.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SecurityIcon color="primary" sx={{ mr: 2 }} />
          <Typography variant="h5" component="h2">
            Privacy & Security
          </Typography>
        </Box>
        <Typography paragraph>
          This application does not store any search data or results. All queries are processed in real-time and are not 
          logged or saved. However, be aware that third-party APIs used by this tool may have their own data retention 
          policies.
        </Typography>
        <Typography paragraph>
          For optimal security, it is recommended to run this tool in a controlled environment and to use API keys with 
          appropriate access controls.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutPage; 