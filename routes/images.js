var express = require('express');
var router = express.Router();
var search = require('../googleSearch');

let searchEngine = process.env.GOOGLE_ENGINE_ID;
let apiKey = process.env.GOOGLE_API_KEY;

router.get('/', function(req, res){
  res.render('images', {title:"image search API"})
})

router.get('/history', function(req, res){
  let limit = req.query.limit
  search.getSearchHistory(limit)
    .then(function(history){
      res.json(history)
    })
})

router.get('/:terms', function(req, res){
  //do some with googlesearch api...
  let terms = req.params.terms
  let offset = req.query.offset || 1
  let limit = req.query.limit || 10
  let searchTerms = 'q=' + req.params.terms
  let engine = 'cx=' + searchEngine;
  let key = 'key=' + apiKey;
  let num = 'num=' + limit;
  let start = 'start=' + offset
  let url = `https://www.googleapis.com/customsearch/v1?${searchTerms}&${key}&${engine}&${num}&${start}`;

  let date = new Date().toLocaleString()
  search.saveSearchHistory(terms, date);

  //async processing response
  search.getContent(url)
    .then((response) => {
      data = JSON.parse(response)
      data = search.formatImageData(data.items)
      res.send(data)
    })
    .catch((err) => {
      console.error(err);
      res.send(err.message)
    })

})

module.exports = router;
