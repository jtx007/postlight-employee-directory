import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { Link as ReachLink } from '@reach/router';

const Navbar = () => {
  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        color="tertiary"
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
        padding="2"
      />
      <MenuList
        bg="transparent"
        borderColor="InactiveBorder"
        padding="0"
        margin="0"
        display="flex"
        flexDirection="column"
      >
        <Link
          fontWeight="bold"
          padding="2"
          margin="0"
          width="min-content"
          to="/"
          as={ReachLink}
        >
          <Button colorScheme="teal">Home</Button>
        </Link>
        <Link
          fontWeight="bold"
          padding="2"
          border="3px"
          borderColor="red"
          to="/directory/1"
          as={ReachLink}
        >
          <Button colorScheme="purple">Directory</Button>
        </Link>
        <Link
          fontWeight="bold"
          padding="2"
          margin="0"
          width="min-content"
          to="/addEmployee"
          as={ReachLink}
        >
          <Button colorScheme="pink">Add</Button>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default Navbar;
