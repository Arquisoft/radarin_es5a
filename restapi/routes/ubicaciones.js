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


      app.get("/users/getByIdp2", function (req, res) {
        var user = {
          lat : 0,
          lng : 0,
          webId : "solidCommunity"
        }
          firebase.database().ref('users/').get().then(function(snapshot) {
              if (snapshot.exists()) {
                user.lat = snapshot.val().lat;
                user.lng = snapshot.val().lng;
                user.webId = snapshot.val();
                res.send(snapshot.val());
              }
              else {
                console.log("No data available");
              }
            }).catch(function(error) {
              console.error(error);
            });
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