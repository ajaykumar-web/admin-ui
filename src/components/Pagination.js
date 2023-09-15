import React from "react";
import "./Pagination.css";
import { Button, ButtonGroup } from '@mui/material';

/**
 * Represents a pagination button.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.label - The label displayed on the button.
 * @param {boolean} props.isActive - Indicates if the button is active.
 * @param {boolean} props.isDisabled - Indicates if the button is disabled.
 * @param {Function} props.onClick - Callback function for button click.
 * @returns {JSX.Element} The rendered pagination button.
 */
const PaginationButton = ({ label, isActive, isDisabled, onClick }) => {
  return (
    <Button
      variant={isActive ? "contained" : "outlined"}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </Button>
  );
};

/**
 * Represents a pagination component.
 *
 * @param {Object} props - The component's props.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.numberOfPages - The total number of pages.
 * @param {Function} props.handlePageChange - Callback function for page change.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = ({ currentPage, numberOfPages, handlePageChange }) => {
  const numbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);

  return (
    <div>
      <ButtonGroup size="small">
        <PaginationButton
          label="&laquo;"
          isDisabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        />
        <PaginationButton
          label="&lt;"
          isDisabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {numbers.map((num) => (
          <PaginationButton
            key={num}
            label={num.toString()}
            isActive={currentPage === num}
            onClick={() => handlePageChange(num)}
          />
        ))}
        <PaginationButton
          label="&gt;"
          isDisabled={currentPage === numberOfPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
        <PaginationButton
          label="&raquo;"
          isDisabled={currentPage === numberOfPages}
          onClick={() => handlePageChange(numberOfPages)}
        />
      </ButtonGroup>
    </div>
  );
};

export default Pagination;
