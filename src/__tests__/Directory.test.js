import React from 'react';
import { act, screen } from '@testing-library/react';
import { render } from '../test-utils';
import Directory from '../pages/Directory';

describe('Directory', () => {
  test('should render directory', () => {
    render(<Directory />);
  });
  test('should have input for Search', () => {
    render(<Directory />);
  });
});
