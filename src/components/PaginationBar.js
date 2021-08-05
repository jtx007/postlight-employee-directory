import React, { useState } from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { navigate } from '@reach/router';

const PaginationBar = ({ currentPage, lastPage }) => {
  const displayPageTabs = () => {
    const tabData = [];
    for (let i = 1; i <= lastPage; i++) {
      tabData.push(i);
    }
    return tabData.map(page => {
      return (
        <Tab onClick={() => navigate(`/directory/${page}`)} key={page}>
          {page}
        </Tab>
      );
    });
  };

  return (
    <Tabs variant="soft-rounded" colorScheme="orange">
      <TabList>{displayPageTabs()}</TabList>
    </Tabs>
  );
};

export default PaginationBar;
