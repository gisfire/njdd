function njinfo_btn_click(userid) {
    $.getJSON("../../src/njdd/xiunj/repair_depot.json", function (data) {

        $.each(data, function (i, item) {
            if (item.id == userid) {
                $(document).on("pageinit", "#detailinfopage", function () {
                    $("#weixiu_name").val(item.repairdepot);
                    $("#weixiu_address").val(item.address);
                    $("#weixiu_diatance").val(item.distance);
                    $("#weixiu_userName").val(item.linkman);
                    $("#weixiu_tel").val(item.phone);
                    $("#weixiu_comment").val(item.credit);
                });
                return;
            }
        });
    });

   
}

function getphone() {

    window.location.href = "tel:" + $("#weixiu_tel").val();
   
}