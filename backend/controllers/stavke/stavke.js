const Stavka = require('../../models/Stavka');
const Naljepnica = require('../../models/Naljepnica');
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

   router.delete('/delete-stavku/:id',function(req,res){
        console.log(req.body);
        let id =req.body.id_broj;
        console.log(id);
        //Stavka.findByIdAndRemove(id).exec();
        Stavka.deleteOne({
            id_broj: id
        }, (err) => {
        if(err){
            res.status(422).json({
                    error: err
            });
        }
        else{
                res.status(200).json({
                    message: 'Stavka obrisana'
                });
            }
        })
   
    });

    router.post('/dodaj-naljepnicu',function(req,res){

        Naljepnica.findOne({id_broj:req.body.id_broj},(err,result)=>{
            if(result) return;
            
                let tip_naljepnice = "QRCODE";
                if(req.body.vlasnistvo=="DA") tip_naljepnice ="BARCODE";
                Naljepnica.create({
                    id_broj: req.body.id_broj,
                    tip_naljepnice: tip_naljepnice
                },(err,data)=>{
                    if(err) console.log(err);
                    else res.send(data);
                });
            
        })

    });

    router.post('/search-stavku', function (req, res){
    console.log(req.body);
    console.log(req.body.naziv);
    console.log("asda");
    Stavka.findOne({naziv:req.body.naziv},(err,result)=>{
        if(err){
            res.status(500).json({
                error: err
            });
        }
        else{
            res.status(200).json(result);
        }
   
    })
     
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