const Stavka = require('../../models/Stavka');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/get-stavke',(req, res) => {
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

router.post('/delete-stavku:id',function(req,res){

    let id =req.body.id;
    Stavka.findByIdAndRemove(id).exec();
    //res.redirect('/');
});
router.post('/modifikujstavku', function(req, res)
{
    let itemId = req.body.id_broj;
 
    Stavka.update(
        {"id_broj": itemId},
        { $set: {
            'naziv': req.body.naziv,
            'kolicina': req.body.kolicina,
            'kategorija': req.body.kategorija,
            'ispravnost': req.body.ispravnost,
            'prisutnost' : req.body.prisutnost,
            'vlasnistvo': req.body.vlasnistvo,
            'id_broj': req.body.id_broj,
            }
        },  (err, data) => {
        if(err){
            res.status(422).json({
                error: err
            });
        }
        else{
            res.status(200).json({
                message: 'Item successfully updated.',
                data: data
            });
        }
    });
});
router.post('/dodajstavku', function (req, res)
{
    
  
    var naziv = req.body.naziv;
    var kolicina = req.body.kolicina;
    var kategorija = req.body.kategorija;
    var ispravnost = req.body.ispravnost;
    var prisutnost = req.body.prisutnost;
    var idBroj = req.body.idBroj;
    var vlasnistvo = req.body.vlasnistvo;

    Stavka.create({
        id_broj : idBroj,
        ispravnost : ispravnost,
        kategorija : kategorija,
        kolicina : kolicina,
        naziv : naziv,
        vlasnistvo: vlasnistvo,
        prisutnost : prisutnost
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

module.exports = router;