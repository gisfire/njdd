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
    (function () {
        var screen = $.mobile.getScreenHeight(),
                    header = $("#main-header").hasClass("ui-header-fixed") ? $("#main-header").outerHeight() - 1 : $("#main-header").outerHeight(),
                    footer = $("#main-footer").hasClass("ui-footer-fixed") ? $("#main-footer").outerHeight() - 1 : $("#main-footer").outerHeight(),
                    contentCurrent = $("#main-content").outerHeight() - $("#main-content").height(),
                    content = screen - header - footer - contentCurrent;
        $("#main-content").height(content);
    })();
    if (sessionStorage.jobroleid == 2) {
        document.getElementById("good").value = "十年工龄";
    }
    else {
        document.getElementById("good").value = "四年驾龄";
    }
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
                nuitnameid = item.unitid;
                teamnameid = item.teamid;
                ID = item.id;
            });
            liebiao1(); //显示所有单位的列表
            //显示所有车队的列表
        }
    });

    function liebiao1() {
        var selObj = $("#personinfopage_unitName");
        var jobroleid = sessionStorage.jobroleid;
        if (jobroleid == 1 || jobroleid == 2) {
            selObj.append("<option value='" + "-1" + "'>" + "独立" + "</option>");
            var option = $($("option", selObj).get(0));
            option.attr('selected', 'selected');
            selObj.selectmenu();
            selObj.selectmenu('refresh', true);
            judgeunit("");
        }
        else {
            //显示所有单位的列表
            $.ajax({
                type: "get",
                url: domain + url_getUnit + "?token=1",
                async: true,
                dataType: 'json',
                success: function (json) {
                    if (typeof (json) == "object") {
                        //为对象
                        unitjson = json;
                    }
                    else {
                        //将字符串转换为对象
                        unitjson = JSON.parse(json);
                    }

                    $.each(unitjson.result.datas, function (i, item) {
                        if (typeof (nuitnameid) != "undefined") {
                            if (nuitnameid == item.id) {

                                selObj.append("<option value='" + item.id + "'>" + item.name + "</option>");
                            }

                            else {

                                selObj.append("<option value='" + item.id + "'>" + item.name + "</option>");
                            }
                        } else {
                            selObj.append("<option value='" + "-1" + "'>" + "请选择" + "</option>");
                        }

                    });
                    judgeunit(nuitnameid);
                    var unitNames = document.getElementById("personinfopage_unitName");
                    for (var a = 0, lenunitNames = unitNames.length; a < lenunitNames; a++) {
                        if (unitNames.options[a].value == nuitnameid) {

                            var option = $($("option", selObj).get(a));
                            option.attr('selected', 'selected');
                            selObj.selectmenu();
                            selObj.selectmenu('refresh', true);
                            break;
                        }
                    }
                    ////
                }

            });
        }

    }
});



//显示所选农场的所有车队的列表
function judgeunit(unitNameid) {
    var selObj = $("#personinfopage_teamName");
    $("#personinfopage_teamName").empty();
    var jobroleid = sessionStorage.jobroleid;
    if (unitNameid == "") {
        selObj.append("<option value='" + "-1" + "'>" + "独立" + "</option>");
        var option = $($("option", selObj).get(0));
        option.attr('selected', 'selected');
        selObj.selectmenu();
        selObj.selectmenu('refresh', true);
    }
    else {
        $.ajax({
            type: "get",
            url: domain + url_getTeam + "?token=1",
            async: true,
            dataType: 'json',
            success: function (json) {
                if (typeof (json) == "object") {
                    //为对象
                    teamjson = json;
                }
                else {
                    //将字符串转换为对象
                    teamjson = JSON.parse(json);
                }

                $.each(teamjson.result.datas, function (i, item) {
                    if (item.teamUnitid == unitNameid) {
                        $("#personinfopage_teamName").append("<option value='" + item.id + "'>" + item.name + "</option>");
                    }

                });
                var teamNames = document.getElementById("personinfopage_teamName");
                for (var b = 0, lenteamNames = teamNames.length; b < lenteamNames; b++) {
                    if (teamNames.options[b].value == teamnameid) {
                        var option = $($("option", $("#personinfopage_teamName")).get(b));
                        option.attr('selected', 'selected');
                        $("#personinfopage_teamName").selectmenu();
                        $("#personinfopage_teamName").selectmenu('refresh', true);
                        break;
                    }

                }


            }

        });
    }
}






//提交保存信息
function tijiao() {
    var tel = $("#personinfopage_tel").val();
    var name = $("#personinfopage_name").val();
    var password = $("#personinfopage_password").val();
    var email = $("#personinfopage_email").val();

    var unitNameid = $("#personinfopage_unitName").val();
    var teamNameid = $("#personinfopage_teamName").val();

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
    data["data"]["param"]["unitid"] = unitNameid;
    data["data"]["param"]["teamid"] = teamNameid;
    data["data"]["param"]["id"] = ID;

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

