var carjson;

$(document).on("pageinit", "#mainpage", function () {

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
            if (carjson.result.datas.length > 0) {
                var selObj = $("#mainpage_selectcar");
                $.each(carjson.result.datas, function (i, item) {
                    if (sessionStorage.userid == item.car_ownerid) {//问题在这里，checkbox
                        sessionStorage.carid = item.id;
                        sessionStorage.userunit = item.car_userunit;
                        sessionStorage.groupname = item.car_userteam;
                    }
                });
                if (sessionStorage.carid == null) {
                    selObj.append("<option value='" + "-1" + "'>" + "请选择" + "</option>");
                }
                $.each(carjson.result.datas, function (i, item) {
                    if (sessionStorage.carid == item.id) {
                        selObj.append("<option value='" + item.id + "'>" + item.car_code + "</option>");
                    }
                });

                $.each(carjson.result.datas, function (i, item) {
                    if (typeof (sessionStorage.carid) != "undefined") {
                        if (sessionStorage.carid != item.id) {
                            selObj.append("<option value='" + item.id + "'>" + item.car_code + "</option>");
                        }

                    } else {
                        selObj.append("<option value='" + item.id + "'>" + item.car_code + "</option>");
                    }
                });
                var option = $($("option", selObj).get(0));
                option.attr('selected', 'selected');
                selObj.selectmenu();
                selObj.selectmenu('refresh', true);

            }
        },
        error: function (errorMsg) {
            alert(errorMsg);
        }
    });

});

function mainpage_selectcar_change() {
    sessionStorage.carid = $("#mainpage_selectcar").val();
    alert(sessionStorage.carid);
}