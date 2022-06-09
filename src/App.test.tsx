import React from 'react';
import { render, screen } from '@testing-library/react';
import { chrome } from 'jest-chrome';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Themes/);
  expect(linkElement).toBeInTheDocument();
});
