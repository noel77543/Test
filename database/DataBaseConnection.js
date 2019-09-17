//會員db
const DB_MEMBER_DATA_BASE = "MemberDataBase";
//會員db  一般會員table
const TABLE_NORMAL_MEMBER = "NormalMember";
//會員db 高級會員table
const TABLE_VIP_MEMBER = "VIPMember";
//名稱
const COLUMN_NAME = "name VARCHAR(255)";
//地址
const COLUMN_ADDRESS = "address VARCHAR(255)";

//建立DB
var queryCreateDatabase = "CREATE DATABASE " + DB_MEMBER_DATA_BASE;
//建立table 與其 columns
var queryCreateTable = "CREATE TABLE " +
    TABLE_NORMAL_MEMBER + "(" + COLUMN_NAME + "," + COLUMN_ADDRESS + ")" + ","
    + TABLE_VIP_MEMBER + "(" + COLUMN_NAME + "," + COLUMN_ADDRESS + ")";
//新增資料
var insertData ="";
//刪除資料
var deleteData = "";
//修改資料
var updateData = "";
//查詢資料
var searchData = "";

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "noel77543",
    password: "g121887782",
    //這句要DB建立好後才加 表示指向該DB
    database: DB_MEMBER_DATA_BASE
});

connection.connect(function (err) {

    // if (err) throw err;
    console.log("Connected!");
    queryAction(queryCreateTable,"Table Created");
});


//--------

/***
 *  sql 指令 並查看Log
 */
function queryAction(querySql, logString) {
    connection.query(querySql, function (error, result) {
        console.log(logString);
    });
}