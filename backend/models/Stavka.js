const 
        { stavkaSchema, mongoose } = require('../config/config');

var stavkaSchema = mongoose.Schema({
    id_broj : String,
    ispravnost : String,
    kategorija : String,
    kolicina : String,
    naziv : String,
    prisutnost : String
});

var Stavka = mongoose.model('Stavka', stavkaSchema);

module.exports = Stavka;