import React from 'react'
import { render, fireEvent } from "@testing-library/react";
import EmailForm from "./EmailForm";

test('check that everything is rendering propertly', async () => {
  const { getByText } = render(<EmailForm/>);
  expect(getByText("Submit")).toBeInTheDocument();
});