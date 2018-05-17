const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const User = require('./models/User.js');
//DB
/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
let userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

var User = mongoose.model('User', userSchema);
User.exports = User;*/

//LOGIN
app.post('/login',function(req,res){
   var userr = req.body.username;
   var password = req.body.password;
   User.findOne({ 'username': userr }, function (err, user) {
        if(user.password == password) res.send("Uspjesno logovan user: " + userr);
        else res.send("Netacna password");
  });
});

//REGISTER
app.post('/register',function(req,res){
    var user = req.body.username;
    var fn = req.body.firstname;
    var ln = req.body.lastname;
    var pass = req.body.password;
    //var conpassword = req.body.conpassword;
    //if(pass != conpassword) res.send("Passwordi se ne podudaraju");
    //Upis u bazu
    var newUser = new User({ username: user, firstname:fn, lastname:ln, password: pass });
    newUser.save(function (err) {
        if (err) return handleError(err);
        res.send("Uspjesno registrovan racun!\nUsername: " + user + "\nFirstname:" + fn + "\nLastname:" + ln + "\nPassword" + pass);
    });
    
});

app.post('/logout',function(req,res){
    res.redirect('home.html');
});
app.listen(8000);