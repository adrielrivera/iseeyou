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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
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
        sx={{ mb: 2 }}
        required
      />

      {searchOptions.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Options:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {searchOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                onClick={() => handleOptionToggle(option.value)}
                color={selectedOptions.includes(option.value) ? 'primary' : 'default'}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          disabled={isLoading || !searchValue.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchForm; 