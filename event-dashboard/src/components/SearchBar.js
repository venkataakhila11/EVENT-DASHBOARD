import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() === "" && filterDate === "") {
      // You can provide feedback here if needed
      return; // Prevent search if both fields are empty
    }
    onSearch({ searchTerm, filterDate });
  };

  return (
    <Stack direction="row" spacing={2} mb={4} alignItems="center">
      <TextField
        label="Search by Title"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search by Title"
      />
      <TextField
        label="Filter by Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        aria-label="Filter by Date"
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
