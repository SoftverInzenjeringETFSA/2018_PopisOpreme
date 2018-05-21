const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const Room = require('../../models/Room');

router.post('/addRoom', function (req, res)
{
    var roomName = req.body.roomName;
    var parentRoomName = req.body.parentRoomName;

    Room.findOne({
        roomName: roomName
    }, function (err, room)
    {
        if (err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            if (room)
            {
                console.log('Postoji prostorija sa tim imenom!');
                res.send('Postoji prostorija sa tim imenom!');
            }
            else
            {
                Room.findOne({
                    roomName: parentRoomName
                }, function (err, room)
                {
                    if (err)
                    {
                        console.log(err);
                        res.send(err);
                    }
                    else
                    {
                        if (room)
                        {
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
                                    console.log('Uspjesno dodana prostorija');
                                    res.send(data);
                                }
                            });
                        }
                        else
                        {
                            console.log('Ne postoji parent prostorija');
                            res.send('Ne postoji parent prostorija');
                        }
                    }
                });
            }
        }
    });
});

router.get('/getRooms', function (req, res)
{
    Room.find(function (err, rooms)
    {
        if (err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            // res.setHeader('Content-Type', 'application/json');
            res.send(rooms);
        }
    })
});

router.post('/getRoom', function (req, res)
{
    Room.findOne({
        roomName: req.body.roomName,
    }, function (err, room)
    {
        if (err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            if (room)
                res.status(200);
            else res.status(204);
            res.send(room);
        }
    })
});

router.delete('/deleteRoom', function (req, res)
{
    const roomName = req.body.roomName;
    console.log(roomName);
    var parent = null;
    Room.findOne({
        roomName: roomName
    }, function (err, room)
    {
        if (err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(room);
            if (!room)
            {
                console.log('Ne postoji ta prostorija');
                res.send('Ne postoji prostorija');
            }
            else
            {
                parent = room.parentRoomName;
                Room.deleteOne({
                    roomName: roomName
                }, function (err)
                {
                    if (err)
                    {
                        console.log(err);
                        res.send(err);
                    }
                    console.log('Uspjesno obrisana prostorija');
                    res.send('Uspjesno obrisana prostorija ' +  roomName + '. Parent prostorija je ' + parent + '.');
                });
            }
        }
    });
});

module.exports = router;