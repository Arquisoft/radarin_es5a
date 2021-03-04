var express = require('express')
var app = express()
var port = process.env.PORT || 3000
app.get('/hola', function (req, res) {
    res.send('Hello World')
})
app.use(express.static('build'))
app.listen(port)