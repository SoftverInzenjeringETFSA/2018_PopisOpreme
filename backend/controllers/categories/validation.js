const validator = require('validator');

const validate = (req, res, next) => {
    let {
        name, description, ParentCategoryId
    } = req.body;

    if(!validator.isLength(name, {min:3, max:100})){
        res.status(422).json({
            error: 'Name must be between 3 and 100 characters long.'
        });
    }

    if(!validator.isLength(description, {min:3, max:100})){
        res.status(422).json({
            error: 'Description must be between 3 and 100 characters long.'
        });
    }

    if(!validator.isNumeric(ParentCategoryId)){
        res.status(422).json({
            error: 'Parent ID must be a number.'
        });
    }

    next();
};

module.exports = validate;