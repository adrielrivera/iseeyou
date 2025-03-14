import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Stack,
  Divider,
  InputAdornment,
  Tooltip,
  Zoom,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

const SearchForm = ({
  title,
  inputLabel,
  inputPlaceholder,
  onSearch,
  isLoading,
  searchOptions = [],
  icon,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue, selectedOptions);
    }
  };

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
      // Show tooltip briefly when first option is selected
      if (selectedOptions.length === 0) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={2}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon && (
          <Box 
            sx={{ 
              mr: 1.5, 
              display: 'flex', 
              alignItems: 'center',
              color: 'primary.main',
            }}
          >
            {icon}
          </Box>
        )}
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>

      <TextField
        fullWidth
        label={inputLabel}
        placeholder={inputPlaceholder}
        variant="outlined"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ 
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.light',
            },
          },
        }}
        InputProps={{
          endAdornment: searchOptions.length > 0 && (
            <InputAdornment position="end">
              <Tooltip 
                title="Filter options available" 
                placement="top"
                arrow
              >
                <TuneIcon color="action" fontSize="small" />
              </Tooltip>
            </InputAdornment>
          ),
        }}
        required
      />

      {searchOptions.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip
              title="Select specific record types to query"
              placement="top"
              arrow
            >
              <span>Filter Options:</span>
            </Tooltip>
            {selectedOptions.length > 0 && (
              <Chip 
                label={`${selectedOptions.length} selected`} 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
              />
            )}
          </Typography>
          <Tooltip
            open={showTooltip}
            title="Great! We'll only fetch these specific record types."
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {searchOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  onClick={() => handleOptionToggle(option.value)}
                  color={selectedOptions.includes(option.value) ? 'primary' : 'default'}
                  variant={selectedOptions.includes(option.value) ? 'filled' : 'outlined'}
                  sx={{ 
                    mb: 1,
                    fontWeight: selectedOptions.includes(option.value) ? 500 : 400,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    }
                  }}
                />
              ))}
            </Stack>
          </Tooltip>
        </Box>
      )}

      <Divider sx={{ my: 2, opacity: 0.6 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          disabled={isLoading || !searchValue.trim()}
          sx={{ 
            px: 3,
            py: 1,
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          {isLoading ? 'Searching...' : 'Search Now'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchForm; 