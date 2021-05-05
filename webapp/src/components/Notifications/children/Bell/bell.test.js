import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Bell from './index';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('bell', () => {
  const { container } = render(<Bell/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 