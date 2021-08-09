import React, { useRef, useState, useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Select,
  useToast,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { employeeApi } from '../api';
import {
  displayDepartmentsFilterOptions,
  displayLocationsFilterOptions,
  displayTitlesFilterOptions,
} from '../utils';

const FilterDrawer = ({ setEmployees }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableTitles, setAvailableTitles] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const [currentFilter, setCurrentFilter] = useState('departments');

  const btnRef = useRef();
  const toast = useToast();

  useEffect(() => {
    const getAvailableOptions = async () => {
      let fetchLocations = employeeApi.get('/locations');
      let fetchTitles = employeeApi.get('/titles');
      let fetchDepartments = employeeApi.get('/departments');
      try {
        setLoading(true);
        const response = await Promise.all([
          fetchLocations,
          fetchTitles,
          fetchDepartments,
        ]);
        const [locations, titles, departments] = response;
        setAvailableLocations(locations.data);
        setAvailableTitles(titles.data);
        setAvailableDepartments(departments.data);
      } catch (e) {
        setError(e);
        toast({
          title: 'Failure to fetch filter options',
          status: 'error',
          isClosable: 'true',
          position: 'top',
        });
      }
    };
    getAvailableOptions();
  }, [toast]);

  const applyFilterAndSearch = async e => {
    e.preventDefault();
    if (filterValue) {
      try {
        setLoading(true);
        const response = await employeeApi.get(`/search/`, {
          params: { query: filterValue },
        });
        const data = await response.data;
        setEmployees(data);
        onClose();
      } catch (e) {
        setError(e);
        toast({
          title: 'Error filtering results',
          position: 'top',
          isClosable: 'true',
          status: 'error',
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Filters
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Select Filter</DrawerHeader>

          <DrawerBody>
            <RadioGroup
              fontWeight="bold"
              onChange={setCurrentFilter}
              value={currentFilter}
            >
              <Stack direction="column">
                <Radio value="departments">Departments</Radio>
                <Radio value="locations">Locations</Radio>
                <Radio value="titles">Titles</Radio>
              </Stack>
            </RadioGroup>
            <Select
              onChange={e => setFilterValue(e.target.value)}
              onBlur={e => setFilterValue(e.target.value)}
              isDisabled={currentFilter !== 'locations'}
              placeholder="By Locations"
            >
              {displayLocationsFilterOptions(availableLocations)}
            </Select>
            <Select
              onChange={e => setFilterValue(e.target.value)}
              onBlur={e => setFilterValue(e.target.value)}
              isDisabled={currentFilter !== 'titles'}
              placeholder="By Titles"
            >
              {displayTitlesFilterOptions(availableTitles)}
            </Select>
            <Select
              onChange={e => setFilterValue(e.target.value)}
              onBlur={e => setFilterValue(e.target.value)}
              isDisabled={currentFilter !== 'departments'}
              placeholder="By Departments"
            >
              {displayDepartmentsFilterOptions(availableDepartments)}
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={applyFilterAndSearch} colorScheme="orange">
              Apply
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
