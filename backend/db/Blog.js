const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    name:String,
    title: String,
    description: String,
    image: String,
    status:{
        type:Boolean,
        default:true
    }
}) 

module.exports = mongoose.model("blog", blogSchema);
