const Stavka = require('../../models/Stavka');
const express = require('express');
const router = express.Router();

router.get('/get-stavke',(req, res, next) => {
        Stavka.find()
          .then(function(doc){
              res.render('otpisinventurnestavke',{items:doc})
          });
   });

router.post('/delete-stavku',function(req,res,next){

    let id =req.body.id;
    Stavka.findByIdAndRemove(id).exec();
    res.redirect('/');
});

module.exports = router;