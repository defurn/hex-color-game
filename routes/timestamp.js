
var express = require('express');
var router = express.Router();

var timestampDecode = (uri) => {
  let unixDate = null;
  let naturalDate = null;
  let date = null;
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August', 'September', 'October', 'November', 'December']

//does not validate improper formatted dates or seconds...
  if ((uri) && (uri.match(/[^0-9]/) === null)){
    _date = new Date(uri * 1000)
    unixDate = uri
    let date = _date.getDate();
    let month = months[_date.getMonth()];
    let year = _date.getFullYear();
    naturalDate = month + " " + date + ", " + year

  } else {
    naturalDate = uri
    let date = uri.split(' ');
    let month = date[0];
    let day = date[1].slice(0, -1)
    let year = date[2]
    unixDate = (new Date(month + " " + day + " " + year  ).getTime() / 1000)

  }
  return {"unix": unixDate, "natural": naturalDate}
}

router.get('/', function(req, res) {
  res.render('timestamp', { title: 'timestampAPI' });
});

router.get('/:string', function(req, res) {
  let dateString = req.params.string
  let response = timestampDecode(dateString)
  res.json(response)
})


module.exports = router;
