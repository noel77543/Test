
const _API_TEST = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
var dtaBaseConnection = require('../database/DataBaseConnection');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
var client = new XMLHttpRequest();
client.responseType = 'json';
client.timeout = 20 * 1000;

//---------

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

//---------

/***
 * API GET  介接網路資源
 * url : http://localhost:port/getSuperheroes
 */
router.get('/getSuperheroes', function (request, response, next) {
  console.log('連線狀態:' + response.statusCode);
  client.open('GET', _API_TEST);
  client.send();

  client.onload = function () {
    var data = client.responseText;
    response.send(data)
  }
});

//---------

/***
 * API GET  load local json - member address
 * url : http://localhost:port/getMemberAddress
 */
router.get('/getMemberAddress', function (request, response, next) {
  console.log('連線狀態:' + response.statusCode);
  response.send(JSON.parse(fs.readFileSync('files/TestJson.json')));
});

//---------

/***
 * API POST  新增一般會員至DB
 * requestBody: {
 *   "name":"name1",
 *   "address":"address1"
 * }
 */
router.post('/addNormalMember', function (request, response, next) {
  console.log('連線狀態:' + response.statusCode);
  var requestBody = request.body;
  dtaBaseConnection.addNormalMember(response,requestBody.name, requestBody.address);
})

//---------

/***
 * API GET 至DB取得所有一般會員
 */
router.get('/getAllNormalMember', function (request, response, next) {
  console.log('連線狀態:' + response.statusCode);
  dtaBaseConnection.getAllNormalMember(response);
})


//---------


/***
 * API POST 新增高級會員至DB
 * requestBody: {
 *   "name":"name1",
 *   "address":"address1"
 * }
 */
router.post('/addVIPMember', function (request, response, next) {
  console.log('連線狀態:' + response.statusCode);
  var requestBody = request.body;
  dtaBaseConnection.addVIPMember(requestBody.name, requestBody.address);
})


//---------

/***
 * API GET 至DB取得所有高級會員
 */
router.get('/getAllVIPMember', function (request, response, next) {
  console.log('連線狀態:' + response.statusCode);
  dtaBaseConnection.getAllVIPMember(response);
})

module.exports = router;
