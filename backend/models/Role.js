const { Schema, mongoose } = require('../config/config');

var roleSchema = mongoose.Schema({
    roleName : String,
    description: String,
})

var Role = mongoose.model('Role', roleSchema);

module.exports = Role;