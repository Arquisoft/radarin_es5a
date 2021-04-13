import React from "react";
import Friend from "./friend";
import FriendsObjet from "./friends.styled.js";
import ldflex from "@solid/query-ldflex";
import data from "@solid/query-ldflex";

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
          <ul src={"user.friends"}>
            <p>{this.webId}</p>
            
					{(i) => (
           <li>
						<Friend
							  name={this.webId}
              /></li>
					)}
				</ul>
          
          );
    };

    addFriend(){
     return (  
     <div>
        <input type="text" name="task" value={this.state.value} onChange={this.handleChange} />
        <button id= "botonAñadir" type = "button" onClick={(c) => this.handleClick(c)}> Añade amigo</button>
     </div>

     );
    };

    handleChange(event) {
      this.setState({webIdFriend: event.target.value});
    }
  
    handleSubmit(event) {
      this.props.addNewTask(this.state.webIdFriend);
      event.preventDefault();
    }
    
    async handleClick(e){
      e.preventDefault();
      const usuario = data[this.webId];
      if(this.state.webIdFriend!=="") {
        await usuario.knows.add(ldflex[this.state.webIdFriend]);
      }
    }

   

    render() {
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

async function showPerson(person) {
  console.log(`This person is ${await person.name}`);

  console.log(`${await person.givenName} is interested in:`);
  for await (const name of person.interest.label)
    console.log(`- ${name}`);

  console.log(`${await person.givenName} is friends with:`);
  for await (const name of person.friends.givenName)
    console.log(`- ${name}`);
}

export default Friends;