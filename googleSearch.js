var express = require('express');
var router = express.Router();
var https = require('https');
var fs = require('fs');


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

const saveSearchHistory = function (terms, date) {
  let newEntry = {
    "term": terms,
    "date": date
  }
  let history = []

  fs.readFile(__dirname + '/imageSearchHistory', 'utf-8', function (err, data) {
    if (err) console.log(err)
    history = (data)? JSON.parse(data) : []
    history.push(newEntry);
    history = JSON.stringify(history)
// need to set a limit... and does fs.writeFile work on heroku server?
    fs.writeFile(__dirname + '/imageSearchHistory', history, function (err) {
      if (err) throw err;
      console.log('search history updated')
    })
  })
}

const getSearchHistory = function (limit) {
  //TODO get onlly the limit's worth of history
  return new Promise(function(resolve, reject){
    let history;
    fs.readFile(__dirname + '/imageSearchHistory', 'utf-8', function (err, data) {
      if (err) console.log(err)
      history = (data) ? JSON.parse(data) : "no history"
      resolve(history)
    });
  })
}


module.exports = {
  getContent,
  formatImageData,
  saveSearchHistory,
  getSearchHistory
}
