var express = require('express');
var router = express.Router();
var homeServer = require('../back_end/home_server');


var buttonNormalBuild;
var inputNormalName;
var inputNormalAddress;

var buttonVipBuild;
var inputVipName;
var inputVipAddress;


//---------

/***
 * 首頁網址 
 * url : http://localhost:port/
 */
router.get('/', function (req, res, next) {
  console.log('連線狀態:' + res.statusCode);

  res.render('home.html', {
    //傳遞參數 title
    title: 'Hey!',
    //傳遞參數 subtitle
    subtitle: "Hello World！"
  });
  // initViews();
});


//---------

/***
 * 初始化
 */
function initViews() {
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
  buttonVipBuild.addEventListener('onClickedBuildVIPData', function (e) {
    console.log(inputVipName.value);
    console.log(inputVipAddress.value);
  });
}



module.exports = router;
