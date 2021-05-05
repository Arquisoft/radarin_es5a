import React from 'react';
import { render, cleanup } from 'react-testing-library';
import {WelcomeComponent} from './welcome.container';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('welcome', () => {
  const { container } = render(<WelcomeComponent/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 