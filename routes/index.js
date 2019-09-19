
const _API_TEST = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
const _API_LINE_NOTIFY = 'https://notify-api.line.me/api/notify';
const _TOKEN_LINE_NOTIFY = 'Ym8jYSP0hv30ji5Ix72g3d1Bxt7XSNPMj3KjmcOtyZj';
//每天的 早上0秒0分9時
const _SCHEDULE_PATTERN = '00 30 09 * * *';
var dtaBaseConnection = require('../database/DataBaseConnection');
var express = require('express');
var schedule = require('node-schedule');
var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
var fs = require('fs');
var router = express.Router();

var buttonNormalBuild;
var inputNormalName;
var inputNormalAddress;

var buttonVipBuild;
var inputVipName;
var inputVipAddress;



init();


//---------

/***
 * 初始化
 */
function init() {
  inputNormalName = document.getElementById('normalName');
  inputNormalAddress = document.getElementById('normalAddress');
  buttonNormalBuild = document.getElementById('normalBuild');
  buttonNormalBuild.addEventListener('onClickedBuildNormalData', function (e) {
    console.log(inputVipName.value);
    console.log(inputNormalAddress.value);
  });

  inputVipName = document.getElementById('vipName');
  inputVipAddress = document.getElementById('vipAddress');
  buttonVipBuild = document.getElementById('vipBuild');
  buttonNormalBuild.addEventListener('onClickedBuildVIPData', function (e) {
    console.log(inputVipName.value);
    console.log(inputVipAddress.value);
  });

  /***
   *  排程 每天的 早上0秒30分9時 發起LineNotify
   */
  schedule.scheduleJob(_SCHEDULE_PATTERN, function () {
    var client = new XMLHttpRequest();
    client.responseType = 'json';
    client.timeout = 20 * 1000;
    client.open('POST', _API_LINE_NOTIFY);
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    client.setRequestHeader("Authorization", "Bearer " + _TOKEN_LINE_NOTIFY);
    client.send(encodeFormData({
      message: '各位早安，\n新的一天繼續努力，莫忘初衷莫忘訂便當。'
    }));
  });
}

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
  var client = new XMLHttpRequest();
  client.responseType = 'json';
  client.timeout = 20 * 1000;
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
  dtaBaseConnection.addNormalMember(response, requestBody.name, requestBody.address);
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

//---------

/***
 * form
 */
function encodeFormData(data) {
  if (!data) return "";    // Always return a string
  var pairs = [];          // To hold name=value pairs
  for (var name in data) {                                  // For each name
    if (!data.hasOwnProperty(name)) continue;            // Skip inherited
    if (typeof data[name] === "function") continue;      // Skip methods
    var value = data[name].toString();                   // Value as string
    name = encodeURIComponent(name.replace(" ", "+"));   // Encode name
    value = encodeURIComponent(value.replace(" ", "+")); // Encode value
    pairs.push(name + "=" + value);   // Remember name=value pair
  }
  return pairs.join('&'); // Return joined pairs separated with &
}

module.exports = router;
