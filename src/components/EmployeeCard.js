import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/layout';
import { Avatar, Button, ButtonGroup } from '@chakra-ui/react';

import DeleteModal from './DeleteModal';
import { Link } from '@reach/router';

const EmployeeCard = ({ employee, employees, setEmployees }) => {
  return (
    <Box borderRadius="10px" padding="2" bg="buttonText">
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
};

export default EmployeeCard;
