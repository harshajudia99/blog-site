const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    mobile: String,
    password: String,
    cpassword: String,
    isAdmin: { type: Boolean, default: false}
});

// password hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 12);
            this.cpassword = await bcrypt.hash(this.cpassword, 12);
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('users', userSchema);
