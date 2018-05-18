const
        router = require('express').Router();

const
        User = require('../models/User');

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if(err) {
            res.status(500);
            res.end();
        }
        res.status(200).send(data);
    });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            res.end(err);
        }
        else {
            console.log('POOOOOOODSADASDAS');
            res.status(200)
                .end('User deleted');
        }
    });
});

module.exports = router;