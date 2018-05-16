const 
        mongoose    = require('mongoose'), 
        Schema      = mongoose.Schema; 

mongoose.connect("mongodb://localhost/PopisOpreme");

module.exports = { Schema, mongoose };