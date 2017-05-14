var express = require('express');
var router = express.Router();
var https = require('https');


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

const formatImageData = function (data) {
    let output = []
    for (entry in data){
      item = {
        "title": data[entry].title,
        "snippet": data[entry].snippet,
        "url": data[entry].pagemap.cse_image[0].src,
        "context": data[entry].link
      }
      output.push(item);
    }
    return output;
}


module.exports = {
  getContent,
  formatImageData
}
