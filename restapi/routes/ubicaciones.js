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
}