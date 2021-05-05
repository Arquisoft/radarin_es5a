import React from 'react';
import { render, cleanup, act } from 'react-testing-library';
import App from '../App';

import 'jest-dom/extend-expect';

afterAll(cleanup);

describe.only('App', () => {
  const { container } = render(<App/>);

  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
}); 