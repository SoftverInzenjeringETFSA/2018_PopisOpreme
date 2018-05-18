const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
// var cors = require('cors');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// router.use(cors());

// WebStorm ima problem sa prepoznavanjem modula, pa sam ovo uradio da zaobidjem problem. (var Room;)
var Room;
// const Room = require('../models/User');

router.post('/addRoom', function (req, res)
{
    var roomName = req.body.roomName;
    var parentRoomName = req.body.parentRoomName;

    Room.create({
        roomName: roomName,
        parentRoomName: parentRoomName,
    }, function (err, data)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.send(data);
        }
    });
});

router.post('/deleteRoom', function (req, res)
{
    // Uklanjanje iz baze
    res.send('OK remove');
});

Room = require('../models/Room');
module.exports = router;