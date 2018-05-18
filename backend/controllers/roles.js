const
        router = require('express').Router();

const
        Role = require('../models/Role');

router.get('/', (req, res) => {
    Role.find({}, (err, data) => {
        if(err) {
            res.status(500);
            res.end();
        }
        else {
            res.send(data);
        }
    })
});

router.get('/:id', (req, res) => {
    Role.findById(req.params.id, (err, role) => {
        if(err) {
            res.status(404);
            res.end();
        }
        else {
            res.send(role);
        }
    })
});

module.exports = router;