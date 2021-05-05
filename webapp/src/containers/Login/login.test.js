import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import LoginComponent from './login.component';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('Login', () => {
  const { container } = render(<MemoryRouter>
    <LoginComponent/>
  </MemoryRouter>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 