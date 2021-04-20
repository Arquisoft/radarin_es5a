const express = require("express")
const router = express.Router()

const $rdf = require('rdflib');
const User = require("./models/users");
const SolidNodeClient = require('solid-node-client').SolidNodeClient;
const client = new SolidNodeClient();


// Refresh ubication
router.post("/users/update", async (req, res) => {
    firebase.database().ref('users/' + req.body.name).set({
        ubicacion: req.body.ubicacion
      });
    res.send("hola")
})

//register a new user
router.post("/users/add", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    //Check if the device is already in the db
    let user = await User.findOne({ email: email })
    if (user)
        res.send({error:"Error: This user is already registered"})
    else{
        user = new User({
            name: name,
            email: email,
        })
        await user.save()
        res.send(user)
    }
})

// Authenticates a user and sends back his WebId
// The request must include the following fields:
//      idp : identity provider (e.g. https://solidcommunity.net)
//      username 
//      password
// For this to work, The user must have added 
// https://solid-node-client as a trusted app on his pod
router.post("/users/login", async (req, res) => {
    try {
        let session = await client.login({
            idp: req.body.idp,
            username: req.body.username,
            password: req.body.password
        });
        res.status(200);
        res.send(session.webId);
    } catch (err) {
        res.status(403);
        res.send(err);
    }
    
});





module.exports = router