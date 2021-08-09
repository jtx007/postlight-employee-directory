import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import App from '../components/App';
import { ChakraProviderWrapper } from '../testUtils/chakraProviderWrapper';

describe('App', () => {
  test('should render App component', () => {
    render(<App />);
  });

  test('should render three buttons, Home, Directory, and Add', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Directory')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
  test('smoke test with ChakraProviderWrapper ', () => {
    render(<App />, { wrapper: ChakraProviderWrapper });
  });
  test('should ', () => {
    render(<App />);
  });
});
