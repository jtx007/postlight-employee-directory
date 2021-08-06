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
          colorScheme={currentPage === page ? 'orange' : 'pink'}
          variant={currentPage === page ? 'solid' : 'outline'}
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
        variant={currentPage === 1 ? 'outline' : 'solid'}
        onClick={() => navigate(`/directory/${currentPage - 1}`)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
      {displayPageButtons()}
      <Button
        colorScheme="cyan"
        variant={currentPage === lastPage ? 'outline' : 'solid'}
        onClick={() => navigate(`/directory/${currentPage + 1}`)}
        isDisabled={currentPage === lastPage}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default PaginationBar;
