const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    mobile:String,
    password:String
});

module.exports = mongoose.model('adminusers', adminUserSchema);