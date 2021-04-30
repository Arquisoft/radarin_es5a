
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production
export async function updateUbicacion(username,lat,lng){
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({"name":username, "lat":lat, "lng":lng})
      })
    return await response.json();
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