app.post('/login',function(req,res){
    var user = req.body.username;
    var password = req.body.password;
    res.send("Uspjesno logovan user: " + user);
});