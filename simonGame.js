var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //use some middleware to show a redirect warning...
  res.redirect('https://simon-game-knockoff.herokuapp.com/');
});

module.exports = router;
