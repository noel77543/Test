var express = require('express');
var router = express.Router();

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
    subtitle: "Hello World"
  });
});


module.exports = router;
