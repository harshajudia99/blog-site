const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
    fname:String,
    lname: String,
    email: String,
    mobile: Number
    // image: String
}) 

module.exports = mongoose.model("author", authorSchema);
