const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs');
const {Schema} = mongoose; 

const userSchema = new Schema({
    name : String,
    email : String,
    password : String
});

userSchema.methods.encryptPassword = (password) => {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
}
userSchema.methods.validatePassword = function (password) {

    return bcryptjs.compareSync(password, this.password);
}

module.exports = mongoose.model('users', userSchema);