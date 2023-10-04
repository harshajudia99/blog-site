const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    authorName: String,
    comment: String,
  });

const blogSchema = new mongoose.Schema({
    authorId:String,
    name:String,
    title: String,
    description: String,
    image: String,
    status:{
        type:Boolean,
        default:true
    },
    likes:Number,
    comments: [commentSchema],
}) 

module.exports = mongoose.model("blog", blogSchema);
