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
} from '@chakra-ui/react';
import { employeeApi } from '../api';
import {
  displayAvailableDepartmentsOptions,
  displayAvailableLocationsOptions,
  displayAvailableTitlesOptions,
} from '../utils';

const FilterDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableTitles, setAvailableTitles] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
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
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            <Select>
              {displayAvailableLocationsOptions(availableLocations)}
            </Select>
            <Select>{displayAvailableTitlesOptions(availableTitles)}</Select>
            <Select>
              {displayAvailableDepartmentsOptions(availableDepartments)}
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
