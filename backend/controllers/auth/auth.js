const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const User = require('../../models/User');

//LOGIN
router.post('/login',function(req,res){
   var userr = req.body.username;
   var password = req.body.password;
   var login = false;
   User.findOne({ 'username': userr }, function (err, rez) {
        if(rez.password == password) {
            console.log("Usao u if");
            login = true;
            //res.redirect('/frontend/src/components/register/index.js')
            res.send(login);
        }
        else{ 
            console.log("Usao u else");
        }
  });
  console.log("Zavrsio LOGIN");
});

//REGISTER
router.post('/register',function(req,res){
    var user = req.body.username;
    var fn = req.body.firstname;
    var ln = req.body.lastname;
    var em = req.body.email;
    var pass = req.body.password;
    var conpassword = req.body.conpassword;
    //if(pass != conpassword) res.send("Passwordi se ne podudaraju");
    //Upis u bazu
    User.create({
        username : user,
        password : pass, 
        email : em,
        firstname : fn,
        lastname : ln,
       isActive: false
        
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
//app.listen(8000);
//router.post('/logout',function(req,res){
    //res.redirect('home.html');
//});

module.exports = router;
