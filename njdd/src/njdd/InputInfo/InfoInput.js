$(document).on("pageinit", "#infoinputpage", function () {
    (function () {
        var screen = $.mobile.getScreenHeight(),
                    header = $("#main-header").hasClass("ui-header-fixed") ? $("#main-header").outerHeight() - 1 : $("#main-header").outerHeight(),
                    footer = $("#main-footer").hasClass("ui-footer-fixed") ? $("#main-footer").outerHeight() - 1 : $("#main-footer").outerHeight(),
                    contentCurrent = $("#main-content").outerHeight() - $("#main-content").height(),
                    content = screen - header - footer - contentCurrent;
        $("#main-content").height(content);
    })();
    //显示所有农机车牌  
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
            if (carjson.result.datas.length > 0) {
                var selObj = $("#number");
                selObj.append("<option>" + "请选择" + "</option>");
                $.each(carjson.result.datas, function (i, item) {
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
                if (sessionStorage.jobroleid == 1) {
                    var option = $($("option", selObj).get(1));
                    option.attr('selected', 'selected');
                    selObj.selectmenu();
                    selObj.selectmenu('refresh', true);
                }
                else {
                    if (sessionStorage.carid == "" || sessionStorage.carid == null) {
                        var option = $($("option", selObj).get(b));
                        option.attr('selected', 'selected');
                        selObj.selectmenu();
                        selObj.selectmenu('refresh', true);
                    } else {
                        var teamNames = document.getElementById("number");
                        for (var b = 0, lenteamNames = teamNames.length; b < lenteamNames; b++) {
                            if (teamNames.options[b].value == sessionStorage.carid) {
                                var option = $($("option", selObj).get(b));
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

function infoinputpage_selectcar_change() {
    sessionStorage.carid = $("#number").val();
}
