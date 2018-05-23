const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const Audit = require('../../models/Audit');
const StavkeInventure = require('../../models/StavkeInventure');
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
    Audit.find({Completed: false}, {AuditName:1, LocationID:1}, (err, data) => {
        if(err) {
            res.status(500);
            res.end();
        }
        res.status(200).send(data);
    });
});

router.get('/getItems', (req, res) => {
    StavkeInventure.find({AuditName: null}, {naziv: 1}, (err,data) => {
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
    StavkeInventure.find({
        AuditName: name,
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
router.post('/novaStavkaInventure', function(req,res) {
    StavkeInventure.create({AuditName: null, sifra: null, 
        naziv: req.body.naziv, jmj: 'KOM', 
        prisutnost: 'DA',potvrdjenInventurniBroj : 'DA', status: 'Ispravno', napomena: ''}, function(err, data) {
            if (err) console.log(err);
            else res.send(data);
        });
});

router.post('/updateStavkaInventure', function(req,res) {
    StavkeInventure.findOneAndUpdate({naziv: req.body.naziv, AuditName: null}, {AuditName: req.body.AuditName, sifra: req.body.sifra, 
        naziv: req.body.naziv, jmj: req.body.jmj, 
        prisutnost: req.body.prisutnost, potvrdjenInventurniBroj : req.body.potvrdjenInventurniBroj, 
        status: req.body.status, napomena: req.body.napomena}, function(err, data) {
            if (err) console.log(err);
            else {
                console.log(data);
                res.send(data);
            }
        });
});

router.post('/zavrsiInventuru', function(req,res) {
    Audit.update({AuditName: req.body.AuditName}, {modifiedAt: Date.now(), User: req.body.User, Team: req.body.Team,
    LocationID: req.body.LocationID, RoomDescription: req.body.RoomDescription, OrganizationalUnit: req.body.OrganizationalUnit,
    Completed: req.body.Completed}, 
    function(err, data) {
            if (err) console.log(err);
            else {
                console.log(data);
                res.send(data);
            }
        });
});
 module.exports = router;