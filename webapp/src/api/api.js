
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production
export function addUbicacion(username,ubicacion){
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = fetch(apiEndPoint+'/users/update', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':username, 'ubicacion':ubicacion})
      })
    return response.json()
}

export async function getUsers(){
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    console.log(apiEndPoint)
    let response = await fetch(apiEndPoint+'/users/getByIdp2')
    var promise1 = Promise.resolve(await response.json());
    var userList = [];
    promise1.then((usuarios) => {
      userList.push(usuarios);
    });
    return userList;
}