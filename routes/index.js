
var express = require('express');
var router = express.Router();
const _API_TEST = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
var client = new XMLHttpRequest();
client.responseType = 'json';
client.timeout = 20 * 1000;


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('連線狀態:' + res.statusCode);
  res.render('index', { title: 'Hey!', description: "Noel's World" });

});


/***
 * GET  介接網路資源
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
 * GET  local json - member address
 */
router.get('/getMemberAddress', function (req, res, next) {
  console.log('連線狀態:' + res.statusCode);

  var fs = require('fs');
  var rawdata = fs.readFileSync('files/TestJson.json');
  res.send(JSON.parse(rawdata));
});


module.exports = router;
