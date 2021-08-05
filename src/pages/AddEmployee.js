import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
  chakra,
  Select,
  Box,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { employeeApi } from '../api';

const AddEmployee = () => {
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
    const getLocationsTitlesAndDepartments = async () => {
      let locations = employeeApi.get('/locations');
      let titles = employeeApi.get('/titles');
      let departments = employeeApi.get('/departments');
      try {
        const response = await Promise.all([locations, titles, departments]);
        setAvailableLocations(response[0].data);
        setAvailableTitles(response[1].data);
        setAvailableDepartments(response[2].data);
      } catch (e) {
        setError(e);
      }
    };
    getLocationsTitlesAndDepartments();
  }, []);

  const displayAvailableDepartments = () => {
    return availableDepartments.map(department => {
      return (
        <option key={department.id} value={department.id}>
          {department.name}
        </option>
      );
    });
  };

  const displayAvailableLocations = () => {
    return availableLocations.map(location => {
      return (
        <option key={location.id} value={location.id}>
          {location.state}
        </option>
      );
    });
  };

  const displayAvailableTitles = () => {
    return availableTitles.map(title => {
      return (
        <option key={title.id} value={title.id}>
          {title.jobtitle}
        </option>
      );
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      setLoading(true);
      employeeApi.post('/employees', {
        employee: {
          name: fullName,
          email: email,
          title_id: selectTitle,
          department_id: selectDepartment,
          location_id: selectLocation,
        },
      });
      navigate('/directory/1');
    } catch (e) {
      setError(e);
      toast({
        title: `${fullName} was not added`,
        status: 'error',
        position: 'top',
        isClosable: 'true',
      });
    }
    setLoading(false);
    toast({
      title: `${fullName} added to the directory`,
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
        Add Employee
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
              {displayAvailableDepartments()}
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
              {displayAvailableLocations()}
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
              {displayAvailableTitles()}
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
              Submit
            </Button>
          </FormControl>
        </Flex>
      </chakra.form>
    </Box>
  );
};

export default AddEmployee;
