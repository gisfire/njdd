
(function (window) {
    $(document).ready(function () {

        (function () {
            var screen = $.mobile.getScreenHeight(),
            header = $("#main-header").hasClass("ui-header-fixed") ? $("#main-header").outerHeight() - 1 : $("#main-header").outerHeight(),
            footer = $("#main-footer").hasClass("ui-footer-fixed") ? $("#main-footer").outerHeight() - 1 : $("#main-footer").outerHeight(),
            contentCurrent = $("#main-content").outerHeight() - $("#main-content").height(),
            content = screen - header - footer - contentCurrent;
            $("#main-content").height(content);
            $("#taskDraw-content").height(content);
            $("#essenDraw-content").height(content);
            $("#editTask-content").height(content);
            $("#editEssence-content").height(content);
            $("#convert-content").height(content);
        })();

      
    });
})(window);


$(document).on("pageinit", function () {
    // 填充省下拉列表  
    var provincesOptionHtml = "";
    var provinces = [];
    for (var el in provinceAndCityArray) {
        provinces.push(provinceAndCityArray[el].name);
        provincesOptionHtml += "<option value=" + el + ">" + provinceAndCityArray[el].name + "</option>";
    }
    $("#selectProvince").append(provincesOptionHtml);

    // 填充城市下拉列表  
    $("#selectProvince").bind("change", function () {
        var selectedProvince = $("#selectProvince :selected").val();
        if (selectedProvince != -1) {
            var citiesOptionHtml = "";
            var cities = [];
            cities = provinceAndCityArray[selectedProvince].cities;
            for (var elCity in cities) {
                citiesOptionHtml += "<option value=" + elCity + ">" + cities[elCity] + "</option>";
            }
            // 清空之前的城市列表  
            $("#selectCity option[value!=-1]").remove();
            $("#selectCity option[value=-1]").attr("selected", true);
            $("#selectCity").append(citiesOptionHtml);
          
            $("#selectCity").selectmenu("refresh");
        }
    });
});

var checkText;
var status1;
var savedate_life;
var temperature1;
var temperature2;
var sta = status1;
var tem1=temperature1;
var tem2 = temperature2;
var sav = savedate_life;
var direction1;
var power1;

function address() {
    checkText = $("#selectCity").find("option:selected").text(); //获取Select选择的Text 
   
    $.getScript("http://php.weather.sina.com.cn/js.php?" + $.param({
        city: checkText, //城市
        day: 0,
        password: "DJOYnieT8234jlsK"
    }), function (json) {
       
        //$("#main-content").html('地址：' + city + '\n天气：' + status1 + '\n温度' + temperature1 + '°' + '\n晚间温度' + temperature2 + '°');
        sta = status1;
        tem1 = temperature1;
        tem2 = temperature2;
      
        //document.getElementById("tianqi").innerText = "hello world";
        $("#city").html(checkText);
        $("#sav").html(savedate_life);
        $("#sta").html(sta);
        $("#tem1").html(tem1+'°');
        $("#tem2").html(tem2 + '°');
        $("#dir1").html(direction1);
        $("#pow1").html(power1);
      
    });
   
    
}
//$.getscript("http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js &day=2&city="+city+"&dfc=3",function(){
function logmanagepagecar(item) {
    //模板渲染
    var html = tmpl("tmpl_logmanagepage_detailinfo", item);
    $(html).appendTo("#logmanagepage_listview").trigger('create');
};