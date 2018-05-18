const 
        { Schema, mongoose } = require('../config/config');

var inventuraSchema = mongoose.Schema({
    naziv: String,
    prostorija: String
});

var Inventura = mongoose.model('Inventura', inventuraSchema);

module.exports = Inventura;