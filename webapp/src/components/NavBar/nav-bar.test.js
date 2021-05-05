import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './nav-bar.component';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('nav-bar', () => {
  const { container } = render(<MemoryRouter><NavBar/></MemoryRouter>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 