module.exports = function (app, firebase,$rdf){
    
  // Refresh ubication
  app.post("/users/update", function (req, res) {
  firebase.database().ref('users/' + req.body.name).set({
      
    lat: req.body.lat,
    lng: req.body.lng
    });
  res.send("ok")
  })
  //Change webId
  app.post("/users/updateWebId", function (req, res) {
    firebase.database().ref('users/' + req.body.name).set({
        
      webId: req.body.webId
      });
    res.send("ok")
    })

  //Añade a la base de datos 
  app.post("/users/add", function (req, res) {
    firebase.database().ref('users/' + req.body.name).get().then(function(snapshot) {
      if (snapshot.exists()) {
        console.log("Already Exisits");
      }
      else {
        firebase.database().ref('users/' + req.body.name).set({
      
          lat: req.body.lat,
          lng: req.body.lng,
          webId: req.body.webId
          });
      }
    });
    res.send("ok")
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


  // const SolidNodeClient = require('solid-node-client').SolidNodeClient;
  // const client = new SolidNodeClient();


  const { SolidNodeClient } = require( 'solid-node-client');
  const client = new SolidNodeClient();


  app.post("/users/login", async function (req, res)  {
        try {
            let session = await client.login({
                idp: "https://solidcommunity.net",
                username: "uo269728",
                password: "Pascu+Pascu42",
            });
            res.status(200);
            res.send(session.webId);
            console.log(session.webId);
            console.log(session);
        } catch (err) {
            res.status(403);
            res.send(err);
        }
    });
    





}