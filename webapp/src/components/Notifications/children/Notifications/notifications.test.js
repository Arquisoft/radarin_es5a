import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Notifications from './index';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('notifications', () => {
  const { container } = render(<Notifications/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 