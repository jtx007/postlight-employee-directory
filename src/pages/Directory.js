import React, { useState, useEffect } from 'react';
import { SimpleGrid, Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { employeeApi } from '../api';
import SearchInput from '../components/SearchInput';
import PaginationBar from '../components/PaginationBar';
import EmployeeCard from '../components/EmployeeCard';

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
        <EmployeeCard
          key={employee.id}
          employee={employee}
          employees={employees}
          setEmployees={setEmployees}
        />
      );
    });
  };

  return (
    <Flex
      p="5"
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <SearchInput
        loading={loading}
        setLoading={setLoading}
        employees={employees}
        setEmployees={setEmployees}
      />
      {loading ? (
        <Spinner
          mt="20"
          mb="20"
          thickness="4px"
          speed="0.65s"
          emptyColor="primary"
          color="tertiary"
          size="xl"
        />
      ) : (
        <SimpleGrid
          justifyContent="center"
          mt="24"
          mb="10"
          columns={[2, null, 3]}
          spacing="40px"
        >
          {displayEmployeeCards()}
        </SimpleGrid>
      )}
      <PaginationBar currentPage={currentPage} lastPage={lastPage} />
    </Flex>
  );
};

export default Directory;
