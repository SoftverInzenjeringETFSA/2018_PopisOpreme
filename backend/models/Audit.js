const { Schema, mongoose } = require('../config/config');

var AuditSchema = mongoose.Schema({

    AuditID: Number,
    Name: String,
    createdAt: { type: Date, default: Date.now },
    modifiedAd: { type: Date, default: Date.now },
    UserID: {type: Number, default: null},
    LocationID: {type: String, default: null},
});

var Audit = mongoose.model('Audit', AuditSchema);

module.exports = Audit;