var express = require('express');
var router = express.Router();
var db = require('../db/connection')

/* GET home page. */
router.get('/', function(req, res, next) {
  db('snacks').select('*').then(snacks => {
      res.render('snacks/index', {
        snacks
      });
  })
});

router.post('/', function(req, res, next) {
  let snack = {
    name: req.body.name,
    my_rating: req.body.my_rating,
    expiration_date: req.body.expiration_date,
    creator_company: req.body.creator_company,
    img_url: req.body.img_url
  }
  db('snacks').insert(snack).then( () => {
    res.redirect('/snacks')
  })
})

router.get('/new', function(req, res, next) {
      res.render('snacks/new');
  })

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  db('snacks').select('*').where({ id: req.params.id}).first().then(snack => {
    console.log(snack);
    res.render('snacks/show', {
      snack
    });
  })
});



module.exports = router;
