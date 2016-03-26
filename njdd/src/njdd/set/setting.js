var carjson;
var personmanagejson;

function setpage_selectcar_change() {
    sessionStorage.carid = $("#setpage_selectcar").val();
    alert(sessionStorage.carid);
}

$(document).on("pageinit", "#setpage", function () {
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
                var selObj = $("#setpage_selectcar");
                $.each(carjson.result.datas, function (i, item) {
                    if (sessionStorage.userid == item.car_ownerid) {
                        sessionStorage.carid = item.id;
                    }
                });

                $.each(carjson.result.datas, function (i, item) {
                    if (typeof (sessionStorage.carid) != "undefined") {
                        if (sessionStorage.carid != item.id) {
                            selObj.append("<option value='" + item.id + "'>" + item.car_code + "</option>");
                        }
                        else {
                            selObj.append("<option value='" + item.id + "'>" + item.car_code + "</option>");
                        }
                    } else {
                        selObj.append("<option value='" + "-1" + "'>" + "请选择" + "</option>");
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



function managepage_btn_click(id) {
    if (datajson != null && datajson.result.datas.length > 0) {
        $.each(datajson.result.datas, function (i, item) {
            if (item.id == id) {
                $(document).on("pageinit", "#informationpage", function () {
                    $("#informationpage_name").val(item.name);
                    $("#informationpage_tel").val(item.phone);
                    $("#informationpage_email").val(item.email);
                });
                return;
            }

        });
    }
}