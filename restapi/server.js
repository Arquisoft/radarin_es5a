const express = require("express")
const promBundle = require("express-prom-bundle");
const cors = require('cors');
const $rdf = require('rdflib');  

const app = express()

//Firebase
var firebase = require("firebase");

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
var database = firebase.database();


//Monitoring middleware
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors());
app.options('*', cors());
app.use(express.json())

require("./routes/ubicaciones.js")(app, firebase,$rdf);


app.listen(process.env.PORT || 5000, () => {
    console.log("Server has started")
})


