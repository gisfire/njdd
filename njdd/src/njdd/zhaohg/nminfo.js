function zhhg_btn_click(userid) {
    $.getJSON("../../src/njdd/zhaohg/find_nh.json", function (data) {

        $.each(data, function (i, item) {
            if (item.id == userid) {
                $(document).on("pageinit", "#nmdetailinfopage", function () {
                    $("#zhg_name").val(item.man);
                    $("#zhg_tel").val(item.phone);
                    $("#zhg_address").val(item.area);
                    $("#zhg_area").val(item.address);
                });
                return;
            }
        });
    });

   
}

function getphone() {

    window.location.href = "tel:" + $("#zhg_tel").val();
   
}