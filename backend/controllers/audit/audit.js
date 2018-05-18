const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const Audit = require('../../models/Audit');
const Room = require ('../../models/Room');


router.get('/getRoom', (req, res) => {
    Room.find({},{roomName: 1}, (err, data) => {
        if(err) {
            res.status(500);
            res.end();
        }
        res.status(200).send(data);
    });
});
router.get('/getAudits', (req, res) => {
    Audit.find({}, {Name:1, LocationID:1}, (err, data) => {
        if(err) {
            res.status(500);
            res.end();
        }
        res.status(200).send(data);
    });
});
router.get('/novaInventura', (req, res) => {
    Audit.find({}, {Name:1, LocationID:1}, (err, data) => {
        if(err) {
            res.status(500);
            res.end();
        }
        console.log(data);
        res.status(200).send(data);
    });
});
router.post('/novaInventura',function(req,res){
    var name = req.body.Name;
    var location = req.body.LocationID;
    Audit.create({
        Name: name,
        LocationID: location,
    }, function (err, data)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(data);
        }
    });
 });


 module.exports = router;