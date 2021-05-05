import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Tabs from './index';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('tabs', () => {
  const { container } = render(<Tabs/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 