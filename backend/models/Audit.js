const { Schema, mongoose } = require('../config/config');

var AuditSchema = mongoose.Schema({

    AuditName:{type: String, unique: true},
    createdAt: { type: Date, default: Date.now },
    modifiedAd: { type: Date, default: Date.now },
    User: { type: String, default: null },
    Team: { type: String, default: null },
    LocationID: { type: String, default: null },
    RoomDescription : { type: String, default: null },
    OrganizationalUnit : { type: String, default: null },
    Completed: {type: Boolean, default: false}
});

var Audit = mongoose.model('Audit', AuditSchema);

module.exports = Audit;