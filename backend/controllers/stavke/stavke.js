const Stavka = require('../../models/Stavka');
const express = require('express');
const router = express.Router();

router.get('/get-stavke',(req, res, next) => {
        Stavka.find({}, (err, data) => {
            if(err){
                res.status(500).json({
                    error: err
                });
            }
            else{
                res.status(200).json(data);
            }
        });
   });

router.post('/delete-stavku:id',function(req,res,next){

    let id =req.body.id;
    Stavka.findByIdAndRemove(id).exec();
    //res.redirect('/');
});

module.exports = router;