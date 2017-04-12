var express = require('express');
var router = express.Router();
var db = require('../db/connection')

/* GET home page. */
router.get('/', function(req, res, next) {
      res.redirect('/snacks');
  })

module.exports = router;
