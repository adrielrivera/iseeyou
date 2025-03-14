import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Box,
  Divider,
  Paper,
  Alert,
  Tooltip,
  Chip,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const ResultCard = ({ title, data, icon }) => {
  const [expanded, setExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if there are any error messages
  const hasError = data && (data.error || (data.message && data.message.includes("error")));
  
  // Check if data is empty (all values are None or empty)
  const isEmpty = data && Object.values(data).every(value => 
    value === null || 
    value === undefined || 
    value === 'None' || 
    value === '' || 
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && value !== null && Object.keys(value).length === 0)
  );

  // Check if data contains mock data
  const isMockData = data && (
    (data.note && data.note.toLowerCase().includes('mock')) || 
    (data.source && data.source.toLowerCase().includes('mock')) ||
    (data.whois_data && data.whois_data.source && data.whois_data.source.toLowerCase().includes('mock'))
  );

  // Function to render different data types
  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return <Typography color="text.secondary" variant="body2">None</Typography>;
    }

    if (typeof value === 'boolean') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {value ? 
            <CheckCircleIcon color="success" fontSize="small" /> : 
            <ErrorIcon color="error" fontSize="small" />
          }
          <Typography color={value ? 'success.main' : 'error.main'} fontWeight={500}>
            {value ? 'Yes' : 'No'}
          </Typography>
        </Box>
      );
    }

    if (typeof value === 'string' || typeof value === 'number') {
      // Check if the value is an error message
      if (typeof value === 'string' && value.toLowerCase().includes('error')) {
        return <Typography color="error.main" variant="body2">{value}</Typography>;
      }
      
      // Check if it's a date
      const datePattern = /^\d{4}-\d{2}-\d{2}/;
      if (typeof value === 'string' && datePattern.test(value)) {
        try {
          const date = new Date(value);
          if (!isNaN(date)) {
            return (
              <Typography variant="body2">
                {date.toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            );
          }
        } catch (e) {
          // If date parsing fails, just render as string
        }
      }
      
      return <Typography variant="body2">{value}</Typography>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <Typography color="text.secondary" variant="body2">Empty array</Typography>;
      }
      return (
        <Box 
          component={Paper} 
          variant="outlined" 
          sx={{ 
            p: 1.5, 
            mt: 1, 
            maxHeight: 200, 
            overflow: 'auto',
            borderRadius: 2,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderColor: 'divider'
          }}
        >
          {value.map((item, index) => (
            <Typography 
              key={index} 
              sx={{ 
                mb: 0.5,
                fontSize: '0.875rem',
                fontFamily: item && typeof item === 'string' && item.includes(':') ? 
                  'monospace' : 'inherit'
              }} 
              color={
                typeof item === 'string' && item.toLowerCase().includes('error') ? 
                'error.main' : 'inherit'
              }
            >
              {typeof item === 'object' ? JSON.stringify(item) : item}
            </Typography>
          ))}
        </Box>
      );
    }

    if (typeof value === 'object') {
      // Check if it's an empty object
      if (Object.keys(value).length === 0) {
        return <Typography color="text.secondary" variant="body2">Empty object</Typography>;
      }
      
      return (
        <Box sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'primary.main', mt: 1, mb: 1 }}>
          {Object.entries(value).map(([key, val]) => (
            <Box key={key} sx={{ mb: 1.5 }}>
              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
                {key}:
              </Typography>
              {renderValue(val)}
            </Box>
          ))}
        </Box>
      );
    }

    return <Typography variant="body2">{String(value)}</Typography>;
  };

  return (
    <Card 
      sx={{ 
        mb: 3,
        overflow: 'visible',
        boxShadow: expanded ? 
          '0 10px 30px rgba(0, 0, 0, 0.15)' : 
          '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <CardHeader
        avatar={icon}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {title}
            {isMockData && (
              <Tooltip title="Using mock data for demonstration">
                <Chip 
                  label="Demo Data" 
                  size="small" 
                  color="secondary" 
                  sx={{ height: 20, fontSize: '0.7rem' }} 
                />
              </Tooltip>
            )}
          </Box>
        }
        action={
          <Box sx={{ display: 'flex' }}>
            <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
              <IconButton aria-label="copy" onClick={handleCopyClick} size="small">
                <ContentCopyIcon fontSize="small" color={copied ? "primary" : "inherit"} />
              </IconButton>
            </Tooltip>
            <Tooltip title={expanded ? "Collapse" : "Expand"}>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                size="small"
                sx={{
                  transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.3s',
                  ml: 1
                }}
              >
                <ExpandMoreIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        }
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: expanded ? `1px solid ${theme.palette.divider}` : 'none',
        }}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 2 }}>
          {hasError && (
            <Alert 
              severity="warning" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  alignItems: 'center'
                }
              }}
              icon={<ErrorIcon fontSize="inherit" />}
            >
              {data.message || "Oops! We hit a snag while fetching this data. Some bits might be missing."}
            </Alert>
          )}
          
          {isEmpty && !hasError && (
            <Alert 
              severity="info" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  alignItems: 'center'
                }
              }}
              icon={<InfoIcon fontSize="inherit" />}
            >
              No data returned. This could be due to privacy protection or rate limiting.
            </Alert>
          )}
          
          {isMockData && !hasError && !isEmpty && (
            <Alert 
              severity="info" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  alignItems: 'center'
                }
              }}
              icon={<InfoIcon fontSize="inherit" />}
            >
              You're viewing demo data. For real results, you'd need to configure API keys.
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Object.entries(data).map(([key, value]) => (
              <Box key={key} sx={{ mb: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  color="primary" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    '&:after': {
                      content: '""',
                      display: 'block',
                      height: '1px',
                      backgroundColor: 'rgba(58, 175, 169, 0.3)',
                      flexGrow: 1,
                      ml: 1
                    }
                  }}
                >
                  {key}
                </Typography>
                {renderValue(value)}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ResultCard; 