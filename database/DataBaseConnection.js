


/**
 * 如果你在嘗試使用此js檔相關function去操作DB 
 * 時出現
 * 這表示你尚未安裝MySQL環境
 * 請參考 :
 * 1. https://jerrynest.io/windows-mysql-installer/
 * 2. https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
 *    你需要在WorkBench輸入以下query
 *    //允許連線
 *    a. ALTER USER 'yourUserName'@'yourHost' IDENTIFIED WITH mysql_native_password BY 'yourPassword'
 *    //建立Database
 *    b. CREATE DATABASE MemberDataBase
 *    //建立一般會員Table  與column (流水號, 姓名 , 地址)
 *    c. create table MemberDataBase.NormalMember (sid INT AUTO_INCREMENT PRIMARY KEY,name TINYTEXT, address TINYTEXT);
 *    //建立高級會員Tabel  與column (流水號, 姓名 , 地址)
 *    d. create table MemberDataBase.VIPMember (sid INT AUTO_INCREMENT PRIMARY KEY,name TINYTEXT, address TINYTEXT);
 * 3. http://blog.e-happy.com.tw/mysql-the-mysql-encoding-latin1-switch-to-utf8/
 *    如果出現MYSQL:Unknown column '字段名' in 'field list'的error表示欄位編碼不符UTF8格式
 */


//會員db
const DB_MEMBER_DATA_BASE = "MemberDataBase";
//會員db  一般會員table
const TABLE_NORMAL_MEMBER = "NormalMember";
//會員db 高級會員table
const TABLE_VIP_MEMBER = "VIPMember";
// //名稱
const COLUMN_NAME = "name";
// //地址
const COLUMN_ADDRESS = "address";

//新增一般會員資料
// var insertDataNormalMember = "INSERT INTO " + TABLE_NORMAL_MEMBER;
//新增高級會員資料
var insertDataVIPMember = "INSERT INTO " + TABLE_VIP_MEMBER;

//查詢一般會員資料
var selectDataNormalMember = "SELECT * FROM " + TABLE_NORMAL_MEMBER;
//查詢高級會員資料
var selectDataVIPMember = "SELECT * FROM " + TABLE_VIP_MEMBER

//刪除資料
var deleteData = "";
//修改資料
var updateData = "";


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "Noel",
    password: "Gg121887782",
    database: DB_MEMBER_DATA_BASE
});

connection.connect(function (error) {
    if (error) {
        console.log("ERROR! =" + error.message);
        return
    }
    console.log("DataBase已連線")
});

//--------

/***
 *  sql 指令 並查看Log
 */
function queryAction(response, querySql, logString) {
    connection.query(querySql, function (error, result, fields) {
        if (error) {
            response.send(error.message);
            return;
        }
        console.log("logString=" + logString);
        response.send(result);
    });
}


//-------------

/***
 *  insert NormalMember table的資料
 *  使此方法為外部可引用 like java's public
 */
module.exports.addNormalMember = function (response, name, address) {
    if (dbIsExists(DB_MEMBER_DATA_BASE)) {
        // var sqlQuery = "INSERT INTO " + TABLE_NORMAL_MEMBER+ "( name, address) VALUES(${" + name + "}, ${" + address + "})"

        var sqlQuery = "insert into NormalMember(name,address) values('" + name + "','" + address + "');";
        queryAction(response, sqlQuery, "NormalMemberData Inserted");
    } else {
        response.send("資料庫不存在");
    }
}


//----------

/***
 * where NormalMember table的所有資料
 * 使此方法為外部可飲用 like java's public
 */
module.exports.getAllNormalMember = function (response) {
    if (dbIsExists(DB_MEMBER_DATA_BASE)) {
        connection.query(selectDataNormalMember, function (error, result, fields) {
            if (error) {
                response.send(error.message);
                return;
            }
            console.log("AllNormalMemberData Selected");
            response.send(JSON.stringify(result));
        });
    }
}


//----------

/***
 *  insert VIPMember table的資料
 *  使此方法為外部可引用 like java's public
 */
module.exports.addVIPMember = function (response, name, address) {
    if (dbIsExists(DB_MEMBER_DATA_BASE)) {
        insertDataVIPMember = insertDataVIPMember + " (" + COLUMN_NAME + "," + COLUMN_ADDRESS + ") VALUES (" + name + ", " + address + ")"
        queryAction(response, insertDataVIPMember, "VIPMemberData Inserted");
    }
}

//----------

/***
 * where VIPMember table的所有資料
 * 使此方法為外部可飲用 like java's public
 */
module.exports.getAllVIPMember = function (response) {
    if (dbIsExists(DB_MEMBER_DATA_BASE)) {
        connection.query(selectDataVIPMember, function (error, result, fields) {
            if (error) {
                response.send(error.message);
                return;
            }
            console.log("AllVIPMemberData Selected");
            response.send(JSON.stringify(result));
        });
    }
}


//----------

/***
 *  DB 是否存在
 */
function dbIsExists(dataBaseName) {
    var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
    var client = new XMLHttpRequest();
    client.open('HEAD', dataBaseName, false);
    client.send();
    return client.status != 404;
}