
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import AuthNavBar from './index';

afterAll(cleanup);

describe.only('auth nav bar', () => {
  const { container } = render(
    <MemoryRouter>
      <AuthNavBar/>
      </MemoryRouter>
  );

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
