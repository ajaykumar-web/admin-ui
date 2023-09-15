import React from "react";
import "./SearchBar.css"
import { TextField, Box } from "@mui/material";

/**
 * Functional component for rendering a search input field.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.searchUser - The value of the search input field.
 * @param {Function} props.handleSearchChange - Callback function for handling search input changes.
 *
 * @returns {JSX.Element} The rendered search input component.
 */
const SearchInput = ({ searchUser, handleSearchChange }) => {
  return (
    <Box>
      <TextField
        label="Search by name, email, or role..."
        variant="outlined"
        placeholder="Search by name, email, or role..."
        fullWidth
        value={searchUser}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

/**
 * Functional component for rendering a search bar.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.searchUser - The value of the search input field.
 * @param {Function} props.handleSearchChange - Callback function for handling search input changes.
 *
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar = ({ searchUser, handleSearchChange }) => {
  return (
    <form role="search">
      <div>
        <SearchInput searchUser={searchUser} handleSearchChange={handleSearchChange} />
      </div>
    </form>
  );
};

export default SearchBar;
