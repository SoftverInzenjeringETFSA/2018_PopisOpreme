const { Schema, mongoose } = require('../config/config');
var ItemSchema = mongoose.Schema({
    ItemID: Number,
    ItemName: String,
    Group: String,
    Subgroup: String,
    SubgroupPart: String,
});

var Item = mongoose.model('AuditItem', ItemSchema);

module.exports = Item;