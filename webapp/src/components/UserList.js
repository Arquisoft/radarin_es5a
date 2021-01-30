import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";


class UserList extends React.Component{
    render() {
        return (
            <div className="UserList">
                <h2>List of already registered users</h2>
                <ListGroup>
                    {this.props.users.map(function(user, i){
                        return <ListGroup.Item id={i} key={i}>{user.name + ' (' + user.email +')'}</ListGroup.Item>
                    })}
                </ListGroup>
           </div>
        )
    }
}

export default UserList