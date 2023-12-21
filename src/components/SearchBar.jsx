import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <Form.Group className=' form-text info mt-3' controlId="searchForm">
      <Form.Control
      className='searchBar  rounded-pill'
        type="text"
        placeholder="Cerca per titolo..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Form.Group>
  );
};

export default SearchBar;
