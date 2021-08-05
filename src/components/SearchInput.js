import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  useToast,
} from '@chakra-ui/react';
import { employeeApi } from '../api';

const SearchInput = ({ setEmployees, setLoading, loading }) => {
  const toast = useToast();

  const [searchParams, setSearchParams] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await employeeApi.get(
        `/employees/?filter=${searchParams}`
      );
      setEmployees(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  return (
    <>
      <InputGroup mt="10" w="30vw">
        <Input
          onBlur={e => setSearchParams(e.target.value)}
          onChange={e => setSearchParams(e.target.value)}
          value={searchParams}
          color="paragraph"
          variant="outline"
        />
        <InputRightAddon
          as={Button}
          isLoading={loading}
          onClick={handleSearch}
          color="headline"
          bg="secondary"
          variant="outlined"
          _hover={{
            background: 'darkRed',
          }}
        >
          Search
        </InputRightAddon>
      </InputGroup>
    </>
  );
};

export default SearchInput;
