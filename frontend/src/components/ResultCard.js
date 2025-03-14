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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ResultCard = ({ title, data, icon }) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
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

  // Function to render different data types
  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return <Typography color="text.secondary">None</Typography>;
    }

    if (typeof value === 'boolean') {
      return (
        <Typography color={value ? 'success.main' : 'error.main'}>
          {value ? 'Yes' : 'No'}
        </Typography>
      );
    }

    if (typeof value === 'string' || typeof value === 'number') {
      // Check if the value is an error message
      if (typeof value === 'string' && value.toLowerCase().includes('error')) {
        return <Typography color="error.main">{value}</Typography>;
      }
      return <Typography>{value}</Typography>;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <Typography color="text.secondary">Empty array</Typography>;
      }
      return (
        <Box component={Paper} variant="outlined" sx={{ p: 1, mt: 1, maxHeight: 200, overflow: 'auto' }}>
          {value.map((item, index) => (
            <Typography key={index} sx={{ mb: 0.5 }} color={
              typeof item === 'string' && item.toLowerCase().includes('error') ? 'error.main' : 'inherit'
            }>
              {typeof item === 'object' ? JSON.stringify(item) : item}
            </Typography>
          ))}
        </Box>
      );
    }

    if (typeof value === 'object') {
      // Check if it's an empty object
      if (Object.keys(value).length === 0) {
        return <Typography color="text.secondary">Empty object</Typography>;
      }
      
      return (
        <Box sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'divider', mt: 1 }}>
          {Object.entries(value).map(([key, val]) => (
            <Box key={key} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" color="primary">
                {key}:
              </Typography>
              {renderValue(val)}
            </Box>
          ))}
        </Box>
      );
    }

    return <Typography>{String(value)}</Typography>;
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={icon}
        title={title}
        action={
          <Box>
            <IconButton aria-label="copy" onClick={handleCopyClick} title="Copy to clipboard">
              <ContentCopyIcon />
            </IconButton>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{
                transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          {hasError && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {data.message || "An error occurred while retrieving this data. Some information may be incomplete."}
            </Alert>
          )}
          
          {isEmpty && !hasError && (
            <Alert severity="info" sx={{ mb: 2 }}>
              No data was returned. This could be due to privacy protection or rate limiting.
            </Alert>
          )}
          
          {Object.entries(data).map(([key, value]) => (
            <Box key={key} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                {key}:
              </Typography>
              {renderValue(value)}
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ResultCard; 