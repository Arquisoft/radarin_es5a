import React from "react";
import Friend from "./friend";
//import FriendsObjet from "./friends.styled.js";
import ldflex from "@solid/query-ldflex";
//import data from "@solid/query-ldflex";

import { List } from "@solid/react";
type Props = {webId: String};
class Friends extends React.Component{
  
    constructor({webId}: Props, props){
        super(props);
     
        this.webId = webId;
        this.state= {  
            webIdFriend :'',
            ListfriendsWebId:[]
        }  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   

    //método que me muestra la información de los amigos
    getFriends(){
     
        return (
       //recorremos lodos los amidos
          <List src={"user.friends"}> 
      
					{(i) => (
           <li>
						<a href = {getWebId(`${i}`)}>
              <Friend
							  webId = {getWebId(`${i}`)}
              />
              </a>
              </li>
					)}
				</List>
          
          );
    };

    addFriend(){
      
     return (  
     <div>
        <input type="text" name="inputt" value={this.state.value} onChange={this.handleChange}  aria-label = "webId-input"/>
        <button id= "button" name = "button"type = "button" onClick={(c) => this.handleClick(c) }> Añade amigo</button>
     
     </div>

     );
    };

    reload = () => {
      window.location.reload(true);
  }

    handleChange(event) {
      this.setState({webIdFriend: event.target.value});
    }
  
    handleSubmit(event) {
      this.props.addNewTask(this.state.webIdFriend);
      event.preventDefault();
    }
    

    async handleClick(e){
      e.preventDefault();
      //const usuario = ldflex[this.webId];
      if(this.state.webIdFriend!=="") {
        await ldflex[this.webId].knows.add(ldflex[this.state.webIdFriend]);
      }
      this.reload()
    }


    render(){
        return (
          <form onSubmit={this.handleSubmit}>
            <h1>Amigos:</h1>
            <p>Introduce el webID del amigo que quieres tener en tu lista de amigos:</p>
            {this.addFriend()}
          <h2>Lista de amigos:</h2>
         {this.getFriends()}
        </form>
        );
     }
}

//para obtener el webId del amigo
export const getWebId = (webId)=>{
	return webId;
}
/* 
async function showPerson(person) {
  console.log(`This person is ${await person.name}`);

  console.log(`${await person.givenName} is interested in:`);
  for await (const name of person.interest.label)
    console.log(`- ${name}`);

  console.log(`${await person.givenName} is friends with:`);
  for await (const name of person.friends.givenName)
    console.log(`- ${name}`);
}
*/
export default Friends;