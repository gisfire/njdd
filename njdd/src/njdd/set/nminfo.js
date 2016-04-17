
var teamnameid;
var nuitnameid;
var teamjson;
var unitjson;
var ID;
var teamnameidjson;
var carjson;
var personmanagejson;


//个人信息界面
$(document).on("pageinit", "#personinfopage", function () {
   
    var param = "?token=1&id=" + sessionStorage.userid;
    $.ajax({
        type: "get",
        url: domain + url_getAlluser + param,
        async: true,
        dataType: 'json',
        success: function (data) {
            $.each(data.result.datas, function (i, item) {
                $("#personinfopage_name").val(item.name);
                $("#personinfopage_tel").val(item.phone);
                $("#personinfopage_email").val(item.email);
                $("#personinfopage_password").val(item.password);

                $("#personinfopage_teamName").append("<option >" + item.teamName + "</option>");
                $("#personinfopage_teamName").selectmenu();
                $("#personinfopage_teamName").selectmenu('refresh', true);
               
            });
         
        }
    });

   


  




});




//提交保存信息
function tijiao() {
    var tel = $("#personinfopage_tel").val();
    var name = $("#personinfopage_name").val();
    var password = $("#personinfopage_password").val();
    var email = $("#personinfopage_email").val();


    var data = new Object();
    data["token"] = "1";
    data["data"] = new Object();
    data["data"]["filter"] = new Object();
    data["data"]["items"] = [];
    data["data"]["param"] = new Object();
    data["data"]["param"]["name"] = name;
    data["data"]["param"]["phone"] = tel;
    data["data"]["param"]["email"] = email;
    data["data"]["param"]["password"] = password;
    data["data"]["param"]["unitid"] = "";
    data["data"]["param"]["teamid"] = "";
    data["data"]["param"]["id"] = sessionStorage.userid;


    $.ajax({
        url: domain + url_addUser,
        type: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        async: false,
        data: JSON.stringify(data),
        dataType: "json",
        timeout: 3000,
        success: function () {
            $("#confirm-dialog_info").html("已提交");
            window.location.href = "#confirm-dialog";
        },
        error: function () {
            alert("出错");
        }
    });
}