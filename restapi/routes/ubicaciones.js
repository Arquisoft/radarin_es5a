module.exports = function (app, firebase){
    
  // Refresh ubication
  app.post("/users/update", function (req, res) {
  firebase.database().ref('users/' + req.body.name).set({
      
      ubicacion: req.body.ubicacion
    });
  res.send("hola")
  })

  // Anadir usuarios test
  app.post("/test/update", function (req, res) {
    firebase.database().ref('test/' + req.body.name).set({
        
        ubicacion: req.body.ubicacion
      });
    res.send("hola test")
    })

  app.get("/users/getByIdp", function (req, res) {
    var lat;
    var lng;
    var webId;
      firebase.database().ref('users/uo258472-solid').get().then(function(snapshot) {
          if (snapshot.exists()) {
            lat = snapshot.val().lat;
            lng = snapshot.val().lng;
            webId = snapshot.val().webId;
            console.log(lat);
            console.log(lng);
            console.log(webId);
          }
          else {
            console.log("No data available");
          }
        }).catch(function(error) {
          console.error(error);
        });
      res.send("hola")
      })


  const SolidNodeClient = require('solid-node-client').SolidNodeClient;
  const client = new SolidNodeClient();

  app.post("/users/login", async function (req, res)  {
   let amigo = {
     webId: req.body.webId,
     username: req.body.username,
     password: req.body.password,
   }
   if(amigo.webId == null){
    res.status(500);
    res.json({
        error : "El webId que tienes que introducir no debe de ser nulo"
   })
  }
    try {
        let session = await client.login(amigo);
        res.status(200);
        res.send(session.webId);
        console.log(session.webId);
    } catch (err) {
        res.status(403);
        res.send(err);
    }
});
}
export const insertarUsuario = (usuario, funcionCallback) =>{
  this.firebase.database().ref('users').get().then(function(snapshot) {
      if (err) {
          funcionCallback(null);
      } else {
          let collection = db.collection('users');
          collection.insertOne(usuario, function(err, result) {
              if (err) {
                  funcionCallback(null);
              } else {
                  funcionCallback(result.ops[0]._id);
              }
              db.close();
          });
      }
  });
}

