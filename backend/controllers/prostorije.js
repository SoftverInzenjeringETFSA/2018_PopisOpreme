const
    express = require('express'),
    router = express.Router();

router.post('/dodajProstoriju', function (req, res)
{
    var name = req.body.name;
    var parentRoom = req.body.parentRoom;
    // Dodavanje u bazu
    res.send('OK add');
});

router.post('/obrisiProstoriju', function (req, res)
{
    var roomId = req.body.roomId;

    // Uklanjanje iz baze
    res.send('OK remove');
});

module.exports = router;