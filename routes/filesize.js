var express = require('express');
var router = express.Router();
//i don't htink i need this here, will go in app.js... nevermid, this should only run if they are at the filesize route
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var sizer = require('../sizer')

router.use('/', upload.single('fileToSize'), function(req, res, next){
  next()
})

router.get('/', function(req, res) {
  res.render('filesize', { title: 'file metadata microservice' })
})

//submit file from form
router.post('/', function(req, res) {
  let data = sizer.getSizeInBytes(req.file)
  res.json(data)
})

module.exports = router;
