
var express = require('express');
var router = express.Router();
var apps = require('./apps')

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'projects', apps, path: req.path });
});


module.exports = router;
