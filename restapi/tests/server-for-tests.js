/*
This server file allow to start the restapi using an in-memory database
This will be handy for testing
*/

const express = require("express")
const cors = require('cors');
const api = require("../api")
var firebase = require("firebase");


module.exports.startdb = async () => {
    var firebaseConfig = {
        apiKey: "AIzaSyAq2HShQb--f_SyBYJ6k8RzbKEaJtCvRqM",
        authDomain: "radarines5a-3b110.firebaseapp.com",
        databaseURL: "https://radarines5a-3b110-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "radarines5a-3b110",
        storageBucket: "radarines5a-3b110.appspot.com",
        messagingSenderId: "176384766915",
        appId: "1:176384766915:web:0fe6ccda05cb18c9384376"
    };

    firebase.initializeApp(firebaseConfig);
    console.log(firebase.database());
}

module.exports.startserver = async () => {

    app = express()

    app.use(cors());
    app.options('*', cors());
    app.use(express.json())

    require("./../routes/ubicaciones.js")(app, firebase);

    server = await app.listen(5000)
    console.log("Server has started!")
    return app
}

module.exports.closeServer = async () => {
    await server.close()
}

module.exports.closeDB = async () => {
    await firebase.database().off();
}

