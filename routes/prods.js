const express = require('express');
const router = express.Router();
const { prodsModel, validProd } = require("../models/prods_model");




/* GET all products. */
router.get('/', (req, res) => {

  prodsModel.find({}, (err, data) => {
        if (err) {return console.log(err)}   
    })
    .then(data => {
      res.json(data);
    });

});

/* add products */
router.post('/add', (req, res) => {
  let validData = validProd(req.body);

  if (validData.error) {
    return res.status(400).json(validData.errors.details);
  }

  prodsModel.insertMany([req.body])
    .then(data => {
      res.status(201).json(data[0]);
    })
    .catch(err => {
      res.status(400).json(err);
    })
    
});

 // update
 router.put("/edit", (req, res) => {

  let validData = validProd(req.body)

  if (validData.error) {
    return res.status(400).json(validData.error.details)
  }

  prodsModel.updateOne({_id:req.body._id}, req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(400).json(err)
  })

})


 // delete
 router.delete("/del", (req, res) => {

  prodsModel.deleteOne({_id:req.body._id})
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    res.status(400).json(err)
  });
  
 });


/* search products */
router.get('/search', (req, res) => {
  let searchQ = new RegExp(req.query.q);

  prodsModel.find({$or:[{name: searchQ},{cat:searchQ}]})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })
    
});

module.exports = router;