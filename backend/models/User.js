const 
        { Schema, mongoose } = require('../config/config');

const 
        Role = require('./Role');
        
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        min: 3,
        max: 30
    },
    lastname: {
        type: String,
        min: 3,
        max: 30
    },
    isActive: {
        type: Boolean,
        default: false
    },
    role : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        },
        roleName : String
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;