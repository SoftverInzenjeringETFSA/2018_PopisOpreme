const {Schema, mongoose} = require('../../config/config');

let categorySchema = mongoose.Schema({
    name: String,
    description: String,
    ParentCategoryId: [
        {
            type: Schema.Types.ObjectId, ref: 'Category'
        }
    ]
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;
