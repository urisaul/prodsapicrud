const express = require('express');
const router = express.Router();
const pics_ar = require("../public/data/data")


pics_ar.map((item, i) => {
    item.id = i;
})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('animalsList', { ar: pics_ar  });
});

router.get('/single/:id', (req, res) => {
    let id = req.params.id;
    res.render('animalSingle', { item: pics_ar[id] });
  });

router.get('/search/', (req, res) => {
    let searchQ = req.query.q;
    let temp_arr = pics_ar.filter(item => {
        return (item.title.includes(searchQ) || item.article.includes(searchQ))
    })
    res.render('animalsList', { ar: temp_arr });
});

module.exports = router;
