const express = require("express")
const router = express.Router()

const $rdf = require('rdflib');
const User = require("./models/users");
const SolidNodeClient = require('solid-node-client').SolidNodeClient;
const client = new SolidNodeClient();

const FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
const VCARD = $rdf.Namespace("http://www.w3.org/2006/vcard/ns#");


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





module.exports = router