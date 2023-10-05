const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    mobile:String,
    password:String
});

module.exports = mongoose.model('users', userSchema);