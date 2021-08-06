import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { navigate } from '@reach/router';

const PaginationBar = ({ currentPage, lastPage }) => {
  const displayPageButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= lastPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map(page => {
      return (
        <Button
          onClick={() => navigate(`/directory/${page}`)}
          colorScheme={currentPage === page ? 'orange' : null}
          key={page}
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <ButtonGroup>
      <Button
        colorScheme="pink"
        onClick={() => navigate(`/directory/${currentPage - 1}`)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
      {displayPageButtons()}
      <Button
        colorScheme="cyan"
        onClick={() => navigate(`/directory/${currentPage + 1}`)}
        isDisabled={currentPage === lastPage}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default PaginationBar;
