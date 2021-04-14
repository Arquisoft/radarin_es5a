export async function authenticate(credentials){
    const apiEndPoint= 'api'
    console.log(apiEndPoint);
    try {
      let response = await fetch(apiEndPoint + "/users/login", {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(credentials)
      });
      console.log(response.status);
      return response.status === 200? await response.json() : false;
    } catch(err) {
      console.log(err);
    }
  }