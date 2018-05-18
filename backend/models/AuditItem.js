const { Schema, mongoose } = require('../config/config');
const Status = require('./Status');
var AuditItemSchema = mongoose.Schema({

    AuditItemID: Number,
    AuditID: Number,
    ItemID: Number,
    StatusID: { type: Number, ref: 'Status'},
    Note: String,
    createdAt: { type: Date, default: Date.now },
    modifiedAd: { type: Date, default: Date.now },
});

var AuditItem = mongoose.model('AuditItem', AuditItemSchema);

module.exports = AuditItem;