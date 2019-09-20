
const _ADD_NORMAL_MEMBER = 'http://localhost:3000/addNormalMember';
const _ADD_VIP_MEMBER = 'http://localhost:3000/addVIPMember';
var XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;


/***
 * 按下 一般會員 建立
 * */
function onBuildNormalClickListener() {
    var inputNormalName = document.getElementById('normalName');
    var inputNormalAddress = document.getElementById('normalAddress');

    addMemberToServer(_ADD_NORMAL_MEMBER, inputNormalName.value, inputNormalAddress.value);
    inputNormalName.value = '';
    inputNormalAddress.value = '';
}

/***
 * 按下 高級會員 建立
 * */
function onBuildVIPClickListener() {
    var inputVipName = document.getElementById('vipName');
    var inputVipAddress = document.getElementById('vipAddress');

    addMemberToServer(_ADD_VIP_MEMBER, inputVipName.value, inputVipAddress.value);
    inputVipName.value = '';
    inputVipAddress.value = '';
}


/***
 *  call api sent to server side
 * */
function addMemberToServer(apiPath, userName, userAddress) {
    var client = new XMLHttpRequest();
    client.responseType = 'json';
    client.timeout = 20 * 1000;
    client.open('POST', apiPath);
    client.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    client.send(JSON.stringify({
        "userName": userName,
        "userAddress": userAddress
    }));
}