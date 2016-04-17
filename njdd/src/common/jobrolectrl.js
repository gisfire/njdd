//1是农机手，2是农场主
$(document).ready(function () {
    var jobroleid = sessionStorage.jobroleid;
    if (jobroleid == 1) {
        $("#carinfoinput").hide();
        $("#unitinput").hide();
        $("#fleetinfoinput").hide();
        $("#header_manager").hide();
        $("#header_personadd").hide();
    }
    if (jobroleid == 3) {
        $("#nczpersoncar").hide();
    }
});