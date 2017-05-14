var express = require('express');
var router = express.Router();
var https = require('https');

let searchEngine = process.env.GOOGLE_ENGINE_ID;
let apiKey = process.env.GOOGLE_API_KEY

const getContent = function(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err))
    })
};

const formatImageData = function (data, offset) {

  let output = []

  for (i = 0; i < offset; i++){
    item = {
      "title": data[i].title,
      "snippet": data[i].snippet,
      "url": data[i].pagemap.cse_image[0].src,
      "context": data[i].link
    }
    output.push(item);
  }

  return output;
}


router.get('/', function(req, res, next){
  res.render('images', {title:"image search API"})
})

router.get('/:terms', function(req, res, next){

//do some with googlesearch api...
let terms = req.params.terms
let offset = req.query.offset
let searchTerms = 'q=' + req.params.terms
let engine = 'cx=' + searchEngine;
let key = 'key=' + apiKey;
let url = `https://www.googleapis.com/customsearch/v1?${searchTerms}&${key}&${engine}`;
let output = []

//async processing response
getContent(url)
  .then((response) => {
    let data = JSON.parse(response).items;
    output = formatImageData(data, offset)
    res.json(output)
  })
  .catch((err) => console.error(err));


})

module.exports = router;
