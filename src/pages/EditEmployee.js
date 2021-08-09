import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  chakra,
  Select,
  Box,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { employeeApi } from '../api';
import {
  displayAvailableDepartmentsOptions,
  displayAvailableLocationsOptions,
  displayAvailableTitlesOptions,
} from '../utils/index';

const EditEmployee = ({ employeeid }) => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableTitles, setAvailableTitles] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [selectLocation, setSelectLocation] = useState('');
  const [selectDepartment, setSelectDepartment] = useState('');
  const [selectTitle, setSelectTitle] = useState('');

  useEffect(() => {
    const getEmployeeAndFormOptions = async () => {
      let fetchEmployee = employeeApi.get(`/employees/${employeeid}`);
      let fetchLocations = employeeApi.get('/locations');
      let fetchTitles = employeeApi.get('/titles');
      let fetchDepartments = employeeApi.get('/departments');
      try {
        setLoading(true);
        const response = await Promise.all([
          fetchLocations,
          fetchTitles,
          fetchDepartments,
          fetchEmployee,
        ]);
        const [locations, titles, departments, employee] = response;
        setAvailableLocations(locations.data);
        setAvailableTitles(titles.data);
        setAvailableDepartments(departments.data);
        setFullName(employee.data.name);
        setEmail(employee.data.email);
        setSelectLocation(employee.data.location.id);
        setSelectTitle(employee.data.title.id);
        setSelectDepartment(employee.data.department.id);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    getEmployeeAndFormOptions();
  }, [employeeid]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await employeeApi.patch(`/employees/${employeeid}`, {
        employee: {
          name: fullName,
          email: email,
          title_id: selectTitle,
          department_id: selectDepartment,
          location_id: selectLocation,
        },
      });
      await navigate('/directory/1', { replace: true });
    } catch (e) {
      setError(e);
      toast({
        title: `${fullName} was not updated`,
        status: 'error',
        position: 'top',
        isClosable: 'true',
      });
    }
    setLoading(false);
    toast({
      title: `${fullName} was changed`,
      status: 'success',
      position: 'top',
      isClosable: 'true',
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading color="tertiary" mt="10">
        Edit Employee
      </Heading>
      <chakra.form
        bg="buttonText"
        border="1px"
        borderRadius="10px"
        borderColor="primary"
        onSubmit={handleSubmit}
        padding="10"
        mt={10}
        w="35vw"
      >
        <Flex flexDir="column" justifyContent="space-evenly">
          <FormControl id="Name">
            <FormLabel>Full Name</FormLabel>
            <Input
              variant="filled"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              onBlur={e => setFullName(e.target.value)}
              type="text"
              name="fullName"
              isRequired
            />
          </FormControl>
          <FormControl id="Email">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              variant="filled"
              value={email}
              onBlur={e => setEmail(e.target.value)}
              onChange={e => setEmail(e.target.value)}
              type="email"
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Select Department</FormLabel>

            <Select
              variant="filled"
              value={selectDepartment}
              onChange={e => setSelectDepartment(e.target.value)}
              onBlur={e => setSelectDepartment(e.target.value)}
              isRequired
              placeholder="Select Department"
            >
              {displayAvailableDepartmentsOptions(availableDepartments)}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Select Location</FormLabel>
            <Select
              value={selectLocation}
              variant="filled"
              onChange={e => setSelectLocation(e.target.value)}
              onBlur={e => setSelectLocation(e.target.value)}
              isRequired
              placeholder="Select Location"
            >
              {displayAvailableLocationsOptions(availableLocations)}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Select Title</FormLabel>
            <Select
              value={selectTitle}
              variant="filled"
              onChange={e => setSelectTitle(e.target.value)}
              onBlur={e => setSelectTitle(e.target.value)}
              isRequired
              placeholder="Select Job Title"
            >
              {displayAvailableTitlesOptions(availableTitles)}
            </Select>
          </FormControl>
          <FormControl>
            <Button
              isLoading={loading}
              type="submit"
              color="buttonText"
              bg="primary"
              mt={5}
            >
              Save Changes
            </Button>
          </FormControl>
        </Flex>
      </chakra.form>
    </Box>
  );
};

export default EditEmployee;
