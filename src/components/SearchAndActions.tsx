import React from 'react';
import { IconButton, TextField, Button } from '@mui/material';
import { Sort } from '@mui/icons-material';

interface SearchAndActionsProps {
  searchTerm: string;
  sortDirection: 'ascending' | 'descending';
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSort: () => void;
  onAdd: () => void;
}

const SearchAndActions: React.FC<SearchAndActionsProps> = ({ searchTerm, sortDirection, onSearchChange, onSort, onAdd }) => (
  <div className="search-wrapper">
    <IconButton
      className="sort-button"
      onClick={onSort}
      title={`Sort by Full Name (${sortDirection === 'ascending' ? 'Ascending' : 'Descending'})`}
    >
      <Sort />
    </IconButton>
    <TextField
      className="search-field"
      label="Search"
      variant="outlined"
      size="small"
      value={searchTerm}
      onChange={onSearchChange}
    />
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={onAdd}
      style={{ marginLeft: "10px" }}
    >
      Add
    </Button>
  </div>
);

export default SearchAndActions;
