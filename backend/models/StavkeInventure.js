const 
        { Schema, mongoose } = require('../config/config');
const 
        Audit = require('./Audit');    

var StavkeInventureShema = mongoose.Schema({
    AuditName: {type: String, ref: 'Audit', default: null},
    sifra: {type:String, unique: true, sparse: true},
    naziv : String,
    jmj : String,
    prisutnost : String,
    potvrdjenInventurniBroj : String,
    status : String,
    napomena: String
});

var StavkeInventure = mongoose.model('StavkeInventure', StavkeInventureShema);

module.exports = StavkeInventure;