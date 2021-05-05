import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import RegisterContainer from './index';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('register', () => {
  const { container } = render(<MemoryRouter><RegisterContainer/></MemoryRouter>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 