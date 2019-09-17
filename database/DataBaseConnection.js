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

//新增一般會員資料
var insertDataNormalMember = "INSERT INTO" + TABLE_NORMAL_MEMBER;
//新增高級會員資料
var insertDataVIPMember = "INSERT INTO" + TABLE_VIP_MEMBER;

//查詢一般會員資料
var selectDataNormalMember = "SELECT * FROM" + TABLE_NORMAL_MEMBER;
//查詢高級會員資料
var selectDataVIPMember = "SELECT * FROM" + TABLE_VIP_MEMBER

//刪除資料
var deleteData = "";
//修改資料
var updateData = "";


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "noel",
    password: "1234567",
    //這句要DB建立好後才加 表示指向該DB
    database: DB_MEMBER_DATA_BASE
});

connection.connect(function (error) {
    //如果不存在則創建
    if (!dbIsExists(DB_MEMBER_DATA_BASE)) {
        queryAction(queryCreateDatabase, "DataBase Created")
        queryAction(queryCreateTable, "Table Created")
    }
});

//--------

/***
 *  sql 指令 並查看Log
 */
function queryAction(querySql, logString) {
    connection.query(querySql, function (error, result) {
        // if (error) {
        //     console.log("queryAction exception =" + error)
        //     return;
        // }
        console.log(logString);
    });
}


//-------------

/***
 *  insert NormalMember table的資料
 *  使此方法為外部可引用 like java's public
 */
module.exports.addNormalMember = function (name, address) {
    if (dbIsExists(DB_MEMBER_DATA_BASE)) {
        insertDataNormalMember = insertDataNormalMember + "(" + name + "," + address + ")VALUES('Learn how to insert a new row',true)"
        queryAction(insertDataNormalMember, "NormalMemberData Inserted");
    }

}


//----------

/***
 * where NormalMember table的所有資料
 * 使此方法為外部可飲用 like java's public
 */
module.exports.getAllNormalMember = function () {
    if (dbIsExists(DB_MEMBER_DATA_BASE)) {
        return connection.query(selectDataNormalMember, function (error, result) {
            console.log("AllNormalMemberData Selected");
            console.log(result);
            return result
        });
    }

}


//----------

/***
 *  insert VIPMember table的資料
 *  使此方法為外部可引用 like java's public
 */
module.exports.addVIPMember = function (name, address) {
    if (dbIsExists(DB_MEMBER_DATA_BASE)) {
        insertDataVIPMember = insertDataVIPMember + "(" + name + "," + address + ")VALUES('Learn how to insert a new row',true)"
        queryAction(insertDataVIPMember, "VIPMemberData Inserted");
    }

}

//----------

/***
 * where VIPMember table的所有資料
 * 使此方法為外部可飲用 like java's public
 */
module.exports.getAllVIPMember = function () {
    if (dbIsExists(DB_MEMBER_DATA_BASE)) {
        connection.query(selectDataVIPMember, function (error, result) {
            console.log("AllVIPMemberData Selected");
            console.log(result);
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