const { Schema, mongoose } = require('../config/config');
var AuditItemSchema = mongoose.Schema({
    AuditItemID: Number,
    AuditItemName: String,
    Group: String,
    Subgroup: String,
    SubgroupPart: String,
});

var AuditItem = mongoose.model('AuditItem', AuditItemSchema);

module.exports = AuditItem;