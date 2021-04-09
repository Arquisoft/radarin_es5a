import React from "react";
import Friend from "./friend";
import FriendsObjet from "./friends.styled.js";
import {List} from "@solid/react";
import ldflex from "@solid/query-ldflex";

class Friends extends React.Component{
  
    constructor(props,name,webId){
        super(props);
        this.name = name;
        this.webId = webId;
        this.state= {  
            webIdFriend :''
        }  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   

    //método que me muestra la información de los amigos
    ListFriends(){
        return (
            this.state.map(t => {
              return (
                <li key={t}>
                  <option value={t}>{t}</option>
                </li>
              );
            })
          );
    };

    addFriend(){
     
    };

    handleChange(event) {
      this.setState({webIdFriend: event.target.value});
    }
  
    handleSubmit(event) {
      this.props.addNewTask(this.state.webIdFriend);
      event.preventDefault();
    }
    
    async handleClick(webId, webIdFriend){
      if(webIdFriend!=="") await ldflex[webId].knows.add(ldflex[webIdFriend]);
    }
    render(){
        return (
          <form onSubmit={this.handleSubmit}>
            <h1>Amigos:</h1>
            <p>Introduce el webID del amigo que quieres tener en tu lista de amigos:</p>
          <input type="text" name="task" value={this.state.value} onChange={this.handleChange} />
          <button id= "botonAñadir" type = "button" onClick={(e,c) => this.handleClick(e,c)}> Añade amigos</button>
          <h2>Lista de amigos:</h2>
          {this.addFriend()}
        </form>
        );
     }
}

export default Friends;