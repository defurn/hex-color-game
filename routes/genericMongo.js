
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('https://genericmongnode.herokuapp.com/');
  // res.redirect('http://localhost:3030');
});


module.exports = router;
