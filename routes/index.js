
const _API_TEST = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
var express = require('express');
var router = express.Router();
var fs = require('fs');
var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
var client = new XMLHttpRequest();
client.responseType = 'json';
client.timeout = 20 * 1000;


/***
 * 首頁網址 
 * url : http://localhost:port/
 */
router.get('/', function (req, res, next) {
  console.log('連線狀態:' + res.statusCode);
  res.render('index.html', {
    //傳遞參數 title
    title: 'Hey!',
    //傳遞參數 subtitle
    subtitle: "Hello World！"
  });
});


/***
 * API GET  介接網路資源
 * url : http://localhost:port/getSuperheroes
 */
router.get('/getSuperheroes', function (req, res, next) {
  console.log('連線狀態:' + res.statusCode);
  client.open('GET', _API_TEST);
  client.send();

  client.onload = function () {
    var data = client.responseText;
    res.send(data)
  }
});

/***
 * API GET  load local json - member address
 * url : http://localhost:port/getMemberAddress
 */
router.get('/getMemberAddress', function (req, res, next) {
  console.log('連線狀態:' + res.statusCode);
  res.send(JSON.parse(fs.readFileSync('files/TestJson.json')));
});


module.exports = router;
