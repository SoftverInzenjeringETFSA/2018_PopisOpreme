const
    {Schema, mongoose} = require('../config/config');

var neljepnicaSchema = mongoose.Schema({
    id_broj: String,
    tip_naljepnice: String
});

var Naljepnica = mongoose.model('Naljepnica', neljepnicaSchema);

module.exports = Naljepnica;