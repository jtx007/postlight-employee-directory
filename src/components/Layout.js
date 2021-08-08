import { Box } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Box mt="10" mr="10" display="flex" justifyContent="flex-end">
        <Navbar />
      </Box>

      {children}
    </>
  );
};

export default Layout;
