const 
        mongoose    = require('mongoose'), 
        Schema      = mongoose.Schema; 

//mongoose.connect("mongodb://localhost/PopisOpreme");
mongoose.connect("mongodb://admin:password@ds125680.mlab.com:25680/popisopreme");

module.exports = { Schema, mongoose };