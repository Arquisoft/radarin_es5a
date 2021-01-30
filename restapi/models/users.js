const mongoose = require("mongoose")


const schema = mongoose.Schema({
    name: String,
    email: String
})

module.exports = mongoose.model("User", schema)