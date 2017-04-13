var express = require('express');
var router = express.Router();
var db = require('../db/connection')

/* GET home page. */
router.get('/', function(req, res, next) {
  db('snacks').select('*').then(snacks => {
      snacks.forEach( snack => {
        snack.expiration_date = new Date(snack.expiration_date).toISOString().slice(0,10)
      })
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

router.get('/edit/:id', function(req, res, next) {
    db('snacks').select('*').where({id: req.params.id}).first().then( snack => {
      snack.expiration_date = new Date(snack.expiration_date).toISOString().slice(0,10)
      res.render('snacks/edit', {
        snack
      });
    })
  })

  router.delete('/:id', function(req, res, next) {
      db('snacks').select('*').where({id: req.params.id}).del().then( () => {
        res.redirect('/snacks')
      })
    })

  router.put('/:id', function(req, res, next) {
    let snack = {
      name: req.body.name,
      my_rating: req.body.my_rating,
      expiration_date: req.body.expiration_date,
      creator_company: req.body.creator_company,
      img_url: req.body.img_url
    }
    if (snack.my_rating > 10 || snack.my_rating < 0) {
      snack.id = req.params.id
      console.log(snack.id);
      console.log(req.params.id);
      res.render('snacks/edit', { error: 'Rating is not valid. Please provide a number between 0 and 10',
      snack
      })
    } else {

        db('snacks').update(snack).where({id: req.params.id}).then( () => {
          res.redirect('/snacks');
        })
      }
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
