const { Schema, mongoose } = require('../config/config');

var StatusSchema = mongoose.Schema({

    StatusID: Number,
    Name: String,
    Description: String,
});

var Status = mongoose.model('Status', StatusSchema);

module.exports = Status;