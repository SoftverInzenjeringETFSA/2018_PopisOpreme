const
    {Schema, mongoose} = require('../config/config');

var roomSchema = mongoose.Schema({
    roomName: String,
    parentRoomName: String
});

var Room = mongoose.model('Room', roomSchema);

module.exports = Room;