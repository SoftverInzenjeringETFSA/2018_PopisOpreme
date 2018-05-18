const Stavka = require('../../models/Stavka');
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
router.post('/dodajstavku', function (req, res)
{
    var datum = new Date(); // za idBroj
    datum = req.body._datum.valueAsDate;
    var dan = datum.getDay();
    var mjesec = datum.getMonth();
    var godina = datum.getFullYear();
    const min = 1;
    const max = 99999;
    const rand = min + Math.random() * (max - min); // za idBroj

    var naziv = req.body._naziv;
    var kolicina = req.body._kolicina;
    var kategorija = req.body._kategorija;
    var ispravnost = req.body._ispravnost;
    var prisutnost = req.body._prisutnost;
    var idBroj = parseInt(dan.toString() + mjesec.toString() + godina.toString() + req.body._kategorija.value.toString() + rand.toString())

    Stavka.create({
        id_broj : idBroj,
        ispravnost : ispravnost,
        kategorija : kategorija,
        kolicina : kolicina,
        naziv : naziv,
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