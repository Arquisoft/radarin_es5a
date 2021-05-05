import React from 'react';
import { render, cleanup } from 'react-testing-library';
import RegistrationSuccess from './index';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('registration-success', () => {
  const { container } = render(<RegistrationSuccess/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 