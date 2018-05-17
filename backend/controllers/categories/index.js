const express = require('express');
const router = express.Router();

const Category = require('../../models/category');
const validate = require('./validation');

router.post('/', validate, (req, res) => {
    let values = req.body;
    Category.create(values, (err, data) => {
        if(err){
            res.status(422).json({
                error: err
            });
        }
        else{
            res.status(201).json({
                message: 'Category successfully created.',
                data: data
            });
        }
    })
});

router.get('/:id?', (req, res) => {
    let categoryId = req.values.id;
    if(categoryId){
        Category.findById(categoryId, (err, data) => {
            if(err){
                res.status(404).json({
                    error: 'Category not found.'
                });
            }
            else{
                res.status(200).json(data);
            }
        });
    }
    else{
        Category.find({}, (err, data) => {
            if(err){
                res.status(500).json({
                    error: err
                });
            }
            else{
                res.status(200).json(data);
            }
        });
    }
});

router.patch('/:id', validate, (req, res) => {
    let categoryId = req.values.id;
    let values = req.body;
    Category.updateOne({
        _id: categoryId
    }, values, (err, data) => {
        if(err){
            res.status(422).json({
                error: err
            });
        }
        else{
            res.status(200).json({
                message: 'Category successfully updated.',
                data: data
            });
        }
    });
});

router.delete('/id', (req, res) => {
    let categoryId = req.values.id;
    Category.deleteOne({
        _id: categoryId
    }, (err) => {
      if(err){
          res.status(422).json({
                  error: err
          });
      }
      else{
          res.status(200).json({
              message: 'Category deleted successfully.'
          });
      }
    })
});

module.exports = router;