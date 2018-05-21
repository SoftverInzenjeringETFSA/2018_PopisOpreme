const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const Audit = require('../../models/Audit');
const Item = require('../../models/Item');
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
    Audit.find({}, {AuditName:1, LocationID:1}, (err, data) => {
        if(err) {
            res.status(500);
            res.end();
        }
        res.status(200).send(data);
    });
});

router.get('/getItems', (req, res) => {
    Item.find({}, {ItemName:1, SubgroupPart:1}, (err, data) => {
        if(err) {
            res.status(500);
            res.end();
        }
        res.status(200).send(data);
    });
});

router.post('/novaInventura',function(req,res){
    var name = req.body.Name;
    var location = req.body.LocationID;
    Audit.create({
        AuditName: name,
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

 router.post('/otvoriInventuru',function(req,res){
    var name = req.body.Name;
    AuditItem.findAll({
        AuditName: name,
    }, function (err, data)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
        }
    });
 });

router.get('/inventura', function(req,res) {
    Item.create({AuditItemID: 16667, 
        ItemName: 'Računar HP DX7400 MT E7200 160G', Group: 'Računarska, mrežna i elektronska oprema', 
        Subgroup: 'Računarska oprema', SubgroupPart: 'Centralna jedinica'}, function(err) {
            if (err) console.log(err);
        });
})

 module.exports = router;