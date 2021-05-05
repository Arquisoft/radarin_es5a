import React from 'react';
import { render, cleanup } from 'react-testing-library';
import EmailForm from './EmailForm';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('Email form', () => {
  const { container } = render(<EmailForm/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 