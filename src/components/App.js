import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from '@reach/router';
import theme from '../theme';
import Layout from './Layout';
import Home from '../pages/Home';
import AddEmployee from '../pages/AddEmployee';
import EditEmployee from '../pages/EditEmployee';
import Directory from '../pages/Directory';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Router>
          <Home path="/" />
          <AddEmployee path="/addEmployee" />
          <EditEmployee path="/editEmployee/:employeeid" />
          <Directory path="/directory/:pageNumber" />
        </Router>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
