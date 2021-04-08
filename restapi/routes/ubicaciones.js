module.exports = function (app, firebase){
    
    // Refresh ubication
    app.post("/users/update", function (req, res) {
    firebase.database().ref('users/' + req.body.name).set({
        
        ubicacion: req.body.ubicacion
      });
    res.send("hola")
    })
}