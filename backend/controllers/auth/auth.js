const
        express = require('express'),
        router = express.Router();

const 
        User = require('../../models/User');

router.post('/login',function(req,res){
    var user = req.body.username;
    var password = req.body.password;
    res.send("Uspjesno logovan user: " + user);
 });
 
router.post('/register',function(req,res){
     var user = req.body.username;
     var email = req.body.email;
     var password = req.body.password;
     var conpassword = req.body.conpassword;
     res.send("Uspjesno registrovan racun!\nUsername: " + user + "\nEmail:" + email + "\nPassword" + password);
 });
 
router.post('/logout',function(req,res){
     res.redirect('home.html');
});

router.get('/test', (req, res) => {
    User.create({
        username: 'test',
        firstname: 'test',
        lastname: 'test'
    }, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);
            res.send(data);
        }
    })
});

router.post('/novaInventura', (req, res) => {
    Inventura.create({
        naziv: req.body.naziv,
        prostorija: req.body.prostorija
    }, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);
            res.send(data);
        }
    })
});
module.exports = router;