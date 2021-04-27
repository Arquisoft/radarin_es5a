import React, { Component } from 'react';
import Map from './map';
import { getUsers } from './../../api/api'

class Pintar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { usersList: null }
        this.promise1 = Promise.resolve(getUsers());

    }
    render() {
        this.promise1.then((usuarios) => {
            this.state.usersList = usuarios;
        });
        return (<Map usuarios={this.state.usersList} ></Map >)
    }

}

export default Pintar;
