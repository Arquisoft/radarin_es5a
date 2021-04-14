import React from 'react';
import { render, cleanup, fireEvent, getByLabelText, getByText } from 'react-testing-library';
import friends from "./friends";

afterAll(cleanup);

test('add friend', () => {
    const correctValue = {webId: "https://example.inrupt.net/profile/card#me"}
    const inputWebId = getByLabelText("webId-input");
    const {getByLabelText,getByText,container} = render(<friends/>);
    fireEvent.change(inputWebId, {target:{value: correctValue.webId}});
    expect(getByText(/Submit/i).closest("button")).toHaveAtribute('disable');
  });