
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'colorgame' });
});

router.get('/color-game.js', function(req, res, next){
  res.sendFile(__dirname + '/color-game.js')
})


module.exports = router;
