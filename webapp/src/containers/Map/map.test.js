import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Map from './map';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('Map', () => {
  const { container } = render(<Map/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});