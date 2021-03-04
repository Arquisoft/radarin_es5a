import React from 'react'
import { render, fireEvent, getByText } from "@testing-library/react";
import UserList from "./UserList";

test('check that the list of users renders propertly', async () => {
    const userList = [{name: 'Pablo', email: 'gonzalezgpablo@uniovi.es' }];
    const {getByText} = render(<UserList users={userList}/>);
    expect(getByText(userList[0].name +' ('+userList[0].email+')')).toBeInTheDocument();
  });