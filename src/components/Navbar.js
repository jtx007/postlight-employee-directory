import React from 'react';
import { chakra } from '@chakra-ui/system';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react';
import { Link } from '@reach/router';

const Navbar = () => {
  return (
    <chakra.nav
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="background"
      height="5vh"
      border="1px"
      borderColor="transparent"
      borderBottomColor="secondary"
    >
      <Heading paddingLeft="10" color="headline">
        Employee Directory
      </Heading>
      <Breadcrumb
        color="primary"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        paddingRight="10"
        fontSize="2xl"
        fontWeight="bold"
        separator=">"
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/directory/1">
            Directory
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/addEmployee">
            Add
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </chakra.nav>
  );
};

export default Navbar;
