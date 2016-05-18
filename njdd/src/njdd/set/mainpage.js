var carjson;

$(document).on("pageinit", "#mainpage", function () {

    if (sessionStorage.jobroleid == 1) {
        $("#mainpage_name").val("农机手");
    }
    else if (sessionStorage.jobroleid == 2) {
        $("#mainpage_name").val("农民");
    }
    else if (sessionStorage.jobroleid == 3) {
        $("#mainpage_name").val("农场主");
    }

    $("#mainpage_setbtn").html(sessionStorage.name);
    $("#mainpage_setbtn").html(sessionStorage.name);
   
    $.ajax({
        url: domain + url_getCarInfo + "?token=1",
        type: 'get',
        async: false,
        success: function (json) {

            if (typeof (json) == "object") {
                //为对象
                carjson = json;
            }
            else {
                //将字符串转换为对象
                carjson = JSON.parse(json);
            }
            var selObj = $("#mainpage_selectcar");
            selObj.append("<option value='" + "-1" + "'>" + "请选择" + "</option>");
            if (carjson.result.datas.length > 0) {
                
                $.each(carjson.result.datas, function (i, item) {
                    if (sessionStorage.userid == item.car_ownerid) {//问题在这里，checkbox
                        if (sessionStorage.carid == "") {
                            sessionStorage.carid = item.id;
                        }
                        sessionStorage.userunit = item.car_userunit;
                        sessionStorage.groupname = item.car_userteam;
                    }
                    if (sessionStorage.jobroleid == 1) {
                        if (sessionStorage.userid == item.car_ownerid) {
                            selObj.append("<option value='" + item.id + "'>" + item.car_code + "</option>");
                        }
                    }
                    else {
                        if (sessionStorage.unitid == item.car_unitid) {
                            selObj.append("<option value='" + item.id + "'>" + item.car_code + "</option>");
                        }
                    }
                });
                if (sessionStorage.jobroleid != 2) {
                    var opList = document.getElementById("mainpage_selectcar");

                    if (sessionStorage.carid == "" || sessionStorage.carid == null) {
                        var option = $($("option", selObj).get(1));
                        option.attr('selected', 'selected');
                        selObj.selectmenu();
                        selObj.selectmenu('refresh', true);
                    }
                    else {
                        for (var j = 0, len = opList.length; j < len; j++) {
                            if (opList.options[j].value == sessionStorage.carid) {
                                var option = $($("option", selObj).get(j));
                                option.attr('selected', 'selected');
                                selObj.selectmenu();
                                selObj.selectmenu('refresh', true);
                                break;
                            }
                        }
                    }
                }
            }
        },
        error: function (errorMsg) {
            alert(errorMsg);
        }
    });

});

