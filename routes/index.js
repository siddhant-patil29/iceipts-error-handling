/**
 *  This module is used for defining default routes on '/'
 *  @module index routes
 *  @author Shubham.Gorde
 *  @version 1.0.0
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
