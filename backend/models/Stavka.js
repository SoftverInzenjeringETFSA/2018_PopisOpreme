const 
        { Schema, mongoose } = require('../config/config');

var StavkaShema = mongoose.Schema({
    id_broj : String,
    ispravnost : String,
    kategorija : String,
    kolicina : String,
    naziv : String,
    vlasnistvo: String,
    prisutnost : String
});

var Stavka = mongoose.model('Stavka', StavkaShema);

module.exports = Stavka;