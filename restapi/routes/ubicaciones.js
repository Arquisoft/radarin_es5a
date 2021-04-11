module.exports = function (app, firebase){
    
    // Refresh ubication
    app.post("/users/update", function (req, res) {
    firebase.database().ref('users/' + req.body.name).set({
        
        ubicacion: req.body.ubicacion
      });
    res.send("hola")
    })

    const SolidNodeClient = require('solid-node-client').SolidNodeClient;
    const client = new SolidNodeClient();

    app.post("/users/login", async function (req, res)  {
      try {
          let session = await client.login({
              idp: req.body.idp,
              username: req.body.username,
              password: req.body.password
          });
          res.status(200);
          res.send(session.webId);
          console.log(session.webId);
      } catch (err) {
          res.status(403);
          res.send(err);
      }
  });
  
}


