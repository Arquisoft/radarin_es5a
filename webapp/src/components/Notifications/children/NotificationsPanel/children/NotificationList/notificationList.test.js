import React from 'react';
import { render, cleanup } from 'react-testing-library';
import NotificationList from './index';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('notificationList', () => {
  const { container } = render(<NotificationList/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 