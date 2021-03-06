import { Flex, Container, Text } from '@chakra-ui/react';
import React from 'react';

const Home = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      color="paragraph"
      h="95vh"
    >
      <Container padding="5" border="1px" borderColor="secondary">
        <Text fontWeight="bold" fontSize="2xl">
          This is the employee directory. Here you can add, remove, and edit
          employees that work at the company. You can also look up employees by
          department, location, job title, name, or email. You can also filter
          by specfic departments, locations, or titles.
        </Text>
      </Container>
    </Flex>
  );
};

export default Home;
