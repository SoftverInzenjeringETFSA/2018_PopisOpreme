const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login',function(req,res){
   var user = req.body.username;
   var password = req.body.password;
   res.send("Uspjesno logovan user: " + user);
});

app.post('/register',function(req,res){
    var user = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var conpassword = req.body.conpassword;
    res.send("Uspjesno registrovan racun!\nUsername: " + user + "\nEmail:" + email + "\nPassword" + password);
});

app.post('/logout',function(req,res){
    res.redirect('home.html');
});


app.listen(8085);