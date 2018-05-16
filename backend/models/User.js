const 
        { Schema, mongoose } = require('../config/config');

var userSchema = mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String
});

var User = mongoose.model('User', userSchema);

module.exports = User;