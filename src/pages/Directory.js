import React, { useState, useEffect } from 'react';
import { SimpleGrid, Box, Text, HStack, Flex } from '@chakra-ui/layout';
import { Avatar, Button, ButtonGroup, Spinner } from '@chakra-ui/react';
import { Link } from '@reach/router';
import SearchInput from '../components/SearchInput';
import DeleteModal from '../components/DeleteModal';
import { employeeApi } from '../api';
import PaginationBar from '../components/PaginationBar';

const Directory = ({ pageNumber }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('');

  useEffect(() => {
    const employeeApiWrapper = async () => {
      try {
        setLoading(true);
        const response = await employeeApi.get(
          `/employees/?page=${pageNumber}`
        );
        const data = await response.data;
        setEmployees(data);
        setCurrentPage(data[0].pagy.page);
        setLastPage(data[0].pagy.last);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    employeeApiWrapper();
  }, [pageNumber]);

  const displayEmployeeCards = () => {
    return employees.map(employee => {
      return (
        <Box borderRadius="10px" padding="2" bg="buttonText" key={employee.id}>
          <HStack spacing="10">
            <Avatar size="xl" name={employee.name} src={employee.avatar} />
            <Box>
              <Text>{employee.name}</Text>
              <Text>{employee.department.name}</Text>
              <Text>{employee.title.jobtitle}</Text>
              <Text>{employee.email}</Text>
              <Text>{employee.location.state}</Text>
            </Box>
          </HStack>
          <ButtonGroup mt="5" variant="outline">
            <Button as={Link} to={`/editEmployee/${employee.id}`} bg="primary">
              Edit
            </Button>
            <DeleteModal
              employeeId={employee.id}
              employeeName={employee.name}
              employees={employees}
              setEmployees={setEmployees}
            />
          </ButtonGroup>
        </Box>
      );
    });
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <SearchInput
        loading={loading}
        setLoading={setLoading}
        employees={employees}
        setEmployees={setEmployees}
      />
      {loading && (
        <Spinner
          mt="20"
          thickness="4px"
          speed="0.65s"
          emptyColor="primary"
          color="tertiary"
          size="xl"
        />
      )}
      <SimpleGrid
        justifyContent="center"
        mt="24"
        columns={[2, null, 3]}
        spacing="40px"
      >
        {displayEmployeeCards()}
      </SimpleGrid>
      <PaginationBar currentPage={currentPage} lastPage={lastPage} />
    </Flex>
  );
};

export default Directory;
