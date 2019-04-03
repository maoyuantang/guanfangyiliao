var getParam = function(name){
    var search = document.location.search;
    var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if(null != matcher){
        try{
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        }catch(e){
            try{
                items = decodeURIComponent(matcher[1]);
            }catch(e){
                items = matcher[1];
            }
        }
    }
    return items;
};
var id=getParam('id');
var token=getParam('token');
//设置问诊模板是否开放
function updateInquiryState(textL,state) {
    $.ajax({
        url: "/api/v1s1/inquiry/doctor/updateInquiryState",//不要
        type: "POST",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("token", token);
            xhr.setRequestHeader("Content-Type", 'application/json');
        },
        data:JSON.stringify({
            id:id
        }),
        success: function (data) {
            $.toast(textL, state);
        },
        error: function (data) {
            $.alert(data.message);
        }
    })
}

    var map;
    var gpsPoint;
    var baiduPoint;
    var gpsAddress;
    var baiduAddress;

    function getLocation() {
        //根据IP获取城市
        var myCity = new BMap.LocalCity();
        myCity.get(getCityByIP);

        //获取GPS坐标
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showMap, handleError, { enableHighAccuracy: true, maximumAge: 1000 });
        } else {
            alert("您的浏览器不支持使用HTML 5来获取地理位置服务");
        }
    }

    function showMap(value) {
        var longitude = value.coords.longitude;
        var latitude = value.coords.latitude;
        map = new BMap.Map("map");
        //alert("坐标经度为：" + latitude + "， 纬度为：" + longitude );
        gpsPoint = new BMap.Point(longitude, latitude);    // 创建点坐标
        map.centerAndZoom(gpsPoint, 15);

        //根据坐标逆解析地址
        var geoc = new BMap.Geocoder();
        geoc.getLocation(gpsPoint, getCityByCoordinate);

        BMap.Convertor.translate(gpsPoint, 0, translateCallback);
    }

    translateCallback = function (point) {
        baiduPoint = point;
        var geoc = new BMap.Geocoder();
        geoc.getLocation(baiduPoint, getCityByBaiduCoordinate);
    }

    function getCityByCoordinate(rs) {
        gpsAddress = rs.addressComponents;
        var address = "GPS标注：" + gpsAddress.province + "," + gpsAddress.city + "," + gpsAddress.district + "," + gpsAddress.street + "," + gpsAddress.streetNumber;
        var marker = new BMap.Marker(gpsPoint);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        var labelgps = new BMap.Label(address, { offset: new BMap.Size(20, -10) });
        marker.setLabel(labelgps); //添加GPS标注
    }

    function getCityByBaiduCoordinate(rs) {
        baiduAddress = rs.addressComponents;
        var address = "百度标注：" + baiduAddress.province + "," + baiduAddress.city + "," + baiduAddress.district + "," + baiduAddress.street + "," + baiduAddress.streetNumber;
        var marker = new BMap.Marker(baiduPoint);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        var labelbaidu = new BMap.Label(address, { offset: new BMap.Size(20, -10) });
        marker.setLabel(labelbaidu); //添加百度标注
    }

    //根据IP获取城市
    function getCityByIP(rs) {
        var cityName = rs.name;
        localStorage.lastname=cityName;
        var addr = $(".address");
        if(cityName=="null"||cityName==""){
            cityName="";
        }
        addr.val(cityName);
        var NumbId=addr.parent().find("#textarea").val();
        console.log(lastname);
        if (addr !==undefined && addr.val() !==undefined) {
            pluginCalc(addr,"WA_BACKLIST_PLUGIN",[addr.val()], NumbId);
            console.log(lastname);
        }
    }
var localstroage = window.localStorage;
var lastname = localstroage.getItem('lastname');
if(lastname=="null"){
    lastname="";
}else{

    // pluginCalc(input,pluginTag,datalist,qid);
}
function handleError(value) {
        switch (value.code) {
            case 11:
                alert("位置服务被拒绝");
                break;
            case 2:
                alert("暂时获取不到位置信息");
                break;
            case 3:
                alert("获取信息超时");
                break;
            case 4:
                alert("未知错误");
                break;
        }
    }

    function init() {
    console.log("dddddddddddddddddd");
        getLocation();
    }
// init()
    window.onload = init;
var cityName1=$("#cityName").val();
setTimeout(function () {
    console.log(cityName1);
},2500)

//.查看问诊计划详情
var planIdNUm;
var realizeClassName;
var now = new Date();
var timess = now.getFullYear() + "-" +((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate()+" ";
$.ajax({
    url: "/m/v1/api/medical/generateAssessPlan?token="+token,
    type: "POST",
    dataType: "json",
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", 'application/json');
    },
    data:JSON.stringify({
        assessId:id
    }),
    success: function (data) {
        console.log(lastname);
        if(data.errCode==0) {
            $(".submited").show();
            var htmlp='<h2 id="title">'+data.body.title+'</h2>'

                +'<p class="auther">作者:'
                +'<span id="author">'+data.body.author+'</span>'
                +'[<span id="hospital">'+data.body.hospital+'</span>]'
                +'</p>'
                +'<p class="weui-ze">免责声明：早筛表可以发现危险迹象，最终诊断以专业检查结果为准</p>';
            $("#anone").html(htmlp);
            planIdNUm=data.body.planId;
            realizeClassName=data.body.realizeClassName;
            var pathml = "";
            var data = data.body.awss;
            var claArr=[];
            var addressId;
            for (var i = 0; i < data.length; i++) {
                if(data[i].plugin=="AREA_BACKLIST_PLUGIN"){
                    addressId=data[i].id;
                }
                if (data[i].type == 3) {
                    pathml+='<div class="weui-cells weui-cells_form weui-margin-0">' +
                        '<input type="hidden" class="questionType" value="'+data[i].type+'">' +
                        '<input type="hidden" class="id nowid" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                        +'<div class="weui-cell">'
                        +'<div class="weui-cell__bd"><input type="hidden" id="textarea" value="'+data[i].id+'">';
                    //插件标签：AGE_PLUGIN   年龄插件    年龄插件
                    // BMI_PLUGIN  体重指数插件  体重指数插件
                    // BACKLIST_PLUGIN 黑名单插件   黑名单插件
                    // ILLNESS_BACKLIST_PLUGIN 疾病黑名单插件 疾病黑名单插件
                    // AREA_BACKLIST_PLUGIN    地区黑名单插件 地区黑名单插件
                    // NATION_BACKLIST_PLUGIN  民族黑名单插件 民族黑名单插件
                    console.log(cityName1);
                    if(data[i].plugin=="AREA_BACKLIST_PLUGIN"||data[i].plugin=="WA_BACKLIST_PLUGIN") {//地区黑名单插件
                        // localStorage.lastname=cityName;
                        var cityT=lastname?lastname:"";
                        pathml += '<span class="weui-shur">请选择：</span><input type="text" readonly class="ageNum address weui-input weuiINput" value="'+cityT+'" /><input type="hidden" class="ageNumP" >'
                    }else if(data[i].plugin=="AGE_PLUGIN"){//年龄插件

                        pathml += '<span class="weui-shur">选择出生日期：</span><input  type="text" readonly unselectable="on" onfocus="this.blur()" class="ageNum weui-input appDate ageNumClick weuiINput" /><input type="hidden" class="ageNumP">'

                    }else if(data[i].plugin=="BMI_PLUGIN"){//体重指数插件
                        pathml += '<span class="weui-shur">输入体重：</span><input type="number"  class="height weui-input  Theightkg ageNum weuiINput" /><span class="testxm">kg</span><input type="hidden" class="ageNumP">'
                        pathml += '<span class="weui-shur" style="padding-left: 0;">输入身高：</span><input type="number"  class="height weui-input  TheightCM ageNum weuiINput" /><span class="testxm">cm</span>'

                    }else if(data[i].plugin=="DAYS_PLUGIN"){
                            htmlP += '<span class="weui-shur">请输入：</span><input type="text"  class="weui-input weui-plugin weuiINput ageNum dayp" />'
                    }else{
                        pathml += '<span class="weui-shur">请输入：</span><input type="text" class="weui-input weuiINput ageNum" id="text' + [i + 1] + '" form="usrform">'

                    }
                    pathml+='</div>'
                        +'</div>'
                        +'</div>';
                } else if (data[i].type == 2) {
                    pathml+='<div class="weui-cells weui-cells_checkbox weui-margin-0"><input type="hidden" class="questionType" value="'+data[i].type+'"><input type="hidden" class="id" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                    var solutionModels = data[i].options;
                    for (var j = 0; j < solutionModels.length; j++) {
                        pathml+='<label class="weui-cell weui-check__label weui-tion-lef" for="b1'+i + j +'">'
                            +'<div class="weui-cell__bd">'
                            +'<input type="hidden" class="sortNumId" value="'+ solutionModels[j].sortId+'">'
                            +'<input type="hidden" class="sortID nowid" value="'+ solutionModels[j].id+'">'
                            +'<p>'
                            + '<span class="sortID" style="display: none">' + solutionModels[j].sortId + '</span>'
                            + '<span class="tag" >' + solutionModels[j].tag + '</span><span>、</span>'
                            + '<span class="desc">' + solutionModels[j].title + '</span>'
                            +'</p>'
                            +'</div>';
                        var aaaa = solutionModels[j].checked?"checked":solutionModels[j].checked;
                        pathml+='<div class="weui-cell__hd weui-padd-right">'
                            +'<input type="checkbox" class="weui-check" value="'+solutionModels[j].id+'" name="checkbox'+j+'" id="b1'+i + j +'" '+aaaa+'>'
                            +'<i class="weui-icon-checked"></i>'
                            +'</div>';
                        pathml+='</label>';
                    }
                    pathml += '</div>';
                } else if (data[i].type == 1) {
                    claArr.push("listR"+data[i].tag);
                    pathml+='<div class="weui-cells weui-cells_radio weui-margin-0 '+"listR"+data[i].tag+'"><input type="hidden" class="questionType" value="'+data[i].type+'"><input type="hidden" class="firstid" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                    var solutionModels = data[i].options;
                    for (var j = 0; j < solutionModels.length; j++) {
                        var childId = "c_" + solutionModels[j].id;
                        pathml +='<label class="weui-cell weui-check__label weui-tion-lef"  for="a1'+i + j +'">'
                            +'<div class="weui-cell__bd">'
                            +'<input type="hidden" class="sortNumId" value="'+ solutionModels[j].sortId+'">'
                            +'<input type="hidden" class="sortID nowid" value="'+ solutionModels[j].id+'">'
                            +'<p>'
                            + '<div class="assweuione"><span class="sortID" style="display: none">' + solutionModels[j].sortId + '</span>'
                            + '<span class="tag" >' + solutionModels[j].tag + '</span><span>、</span></div>'
                            + '<div class="assweuitwo"><span class="desc">' + solutionModels[j].title + '</span></div>'
                            +'</p>'
                            +'</div>';
                            var aaaa = solutionModels[j].checked?"checked":solutionModels[j].checked;
                        if(solutionModels[j].childAwss!="") {
                            var childAwss=JSON.stringify(solutionModels[j].childAwss).replace(/\s/g,"&nbsp;");
                            pathml += '<div class="weui-cell__ft">'
                                + '<input type="radio" class="weui-check weui-have" name="radio1' + i + '" data-answerText="' + solutionModels[j].title + '"  data-score="' + solutionModels[j].score + '" data-num="0" data-list='+childAwss+' value="' + solutionModels[j].id + '" id="a1' + i + j + '" ' + aaaa + '>'
                                + '<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                                + '</div>';
                            pathml += '</label>';
                        }else if(solutionModels[j].childAwss==""){
                            if(solutionModels[j].title=="其他"){
                                pathml += '<div class="weui-cell__ft">'
                                    + '<input type="radio" class="weui-check weui-other" data-numb="' + data[i].tag + '" data-answerText="' + solutionModels[j].title + '" data-score="' + solutionModels[j].score + '" name="radio1' + i + '" value="' + solutionModels[j].id + '" id="a1' + i + j + '" ' + aaaa + '>'
                                    + '<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                                    + '</div>'
                                pathml += '</label>';
                            }else{
                                pathml += '<div class="weui-cell__ft">'
                                    + '<input type="radio" class="weui-check weui-noChild" data-numb="' +data[i].tag + '" data-answerText="' + solutionModels[j].title + '" data-score="' + solutionModels[j].score + '" name="radio1' + i + '" value="' + solutionModels[j].id + '" id="a1' + i + j + '" ' + aaaa + '>'
                                    + '<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                                    + '</div>'
                                pathml += '</label>';
                            }
                        }
                    }
                    pathml += '</div>';
                }
            }
            var q = $(pathml);
            $("#questionbox").html(q);
            // var addr = $(".address");
            // var NumbId=addr.parent().find("#textarea").val();
            // console.log(lastname);
            // if (addr !==undefined && addr.val() !==undefined) {
            //     pluginCalc(addr,"WA_BACKLIST_PLUGIN",[addr.val()], NumbId);
            //     console.log(lastname);
            // }
            var listNum=0;

            $(".weui-have").click(function () {
                if ( $('input[type=radio]').checked = true) {
                        var id=$(this).val();
                        var titleP=$(this).data("answertext");
                        var childAwssA=$(this).data("list");
                    console.log(childAwssA);
                        $(this).parent().parent().parent().find(".c_"+id+"").show();
                        var htmlP="";
                        var chLenght=childAwssA.length;
                        var tegN;
                        for(var i=0;i<childAwssA.length;i++){
                            if(childAwssA[i].title=="其他"){
                            }
                            htmlP+='<div class="weui-cells weui-cells_radio weui-margin-0 c_'+id+'" id="c_'+id+'"><input type="hidden" class="questionType" value="'+childAwssA[i].type+'"><input type="hidden" class="firstid" value="'+childAwssA[i].id+'">'
                                +'<div class="weui-cells__title"><i class="weui-detail-icon">'+childAwssA[i].tag+'</i>'
                                +'<span class="titleNmu">'+$.trim(childAwssA[i].title)+'</span>'
                                +'</div>';
                            if(childAwssA[i].plugin=="AREA_BACKLIST_PLUGIN"||childAwssA[i].plugin=="WA_BACKLIST_PLUGIN") {//地区黑名单插件
                                htmlP += '<span class="weui-shur weuip">请选择：</span><input type="text" readonly class="address weui-input weuiINput" value="'+cityName+'" /><input type="hidden" class="ageNumP">'
                            }else if(childAwssA[i].plugin=="AGE_PLUGIN"){//年龄插件
                                tegN=childAwssA[i].tag.replace(/\./g,"_");
                                htmlP += '<span class="weui-shur weuip">选择出生日期：</span><input type="text" readonly  unselectable="on" onfocus="this.blur()" class="ageNumT ageNum weui-input  weui-plugin ageNumClick weuiINput appDateone'+tegN+'" /><input type="hidden" class="ageNumP">'
                            }else if(childAwssA[i].plugin=="BMI_PLUGIN"){//体重指数插件
                                htmlP += '<span class="weui-shur">输入体重：</span><input type="number"  class="height weui-input weuiINput" /><span class="testxm">kg</span>'
                                htmlP += '<span class="weui-shur">输入身高：</span><input type="number"  class="height weui-input weuiINput" /><span class="testxm">cm</span>'
                            }else if(childAwssA[i].type=="3"){
                                if(childAwssA[i].plugin=="DAYS_PLUGIN"){
                                    htmlP += '<span class="weui-shur weuip">请输入：</span><input type="text"  class="weui-input weui-plugin weuiINput ageNum dayp" />'

                                }else{
                                    htmlP += '<span class="weui-shur weuip">请输入：</span><input type="text" class="weui-input weui-plugin weuiINput ageNum" style="width: 45% !important;" placeholder="" rows="3" form="">'
                                }
                            }

                            for(var z=0;z<childAwssA[i].options.length;z++){

                                htmlP +='<label class="weui-cell weui-check__label weui-tion-lef"  for="a12'+i+id+z+'">'
                                    +'<div class="weui-cell__bd">'
                                    +'<p>'

                                    + '<span class="tag" >' + childAwssA[i].options[z].tag + '</span><span>、</span>'
                                    + '<span class="desc">' + (childAwssA[i].options[z].title) + '</span>'
                                    +'</p>'
                                    +'</div>';
                                if(childAwssA[i].options[z].title=="其他"){
                                    htmlP += '<div class="weui-cell__ft">'
                                        + '<input type="radio" class="weui-check weui-other" data-numb="' +childAwssA[i].tag + '" name="radio1'+i+id+'" data-answerText="' + childAwssA[i].options[z].title + '" value="'+childAwssA[i].options[z].id+'" id="a12'+i+id+z+'" data-score="' + childAwssA[i].options[z].score + '" >'
                                        + '<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                                        + '</div>'
                                    htmlP += '</label>';
                                }else{
                                    htmlP += '<div class="weui-cell__ft">'
                                        + '<input type="radio" class="weui-check weui-noChild" data-numb="' +childAwssA[i].tag + '" name="radio1'+i+id+'" data-answerText="' + childAwssA[i].options[z].title + '" value="'+childAwssA[i].options[z].id+'" id="a12'+i+id+z+'" data-score="' + childAwssA[i].options[z].score + '" >'
                                        + '<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                                        + '</div>'
                                    htmlP += '</label>';
                                }
                            }
                            htmlP+='</label>';
                            htmlP += '</div>';
                        }
                        if ($(".c_"+id+"").length<chLenght) {
                            $(this).parent().parent().parent().after(htmlP);
                            $(".dayp").picker({
                                title: "请选择时间",
                                cols: [
                                    {
                                        textAlign: 'center',
                                        values: ['1', '2', '3', '4', '5','6', '7', '8', '9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
                                    },
                                    {
                                        textAlign: 'center',
                                        values: ['天', '周', '月', '年']
                                    }
                                ]
                            });
                        }
                        var appDateone="appDateone"+tegN;
                        ageOne(appDateone);
                        return;
                }
            });

            $("body").on("click", ".weui-other",function () {
                if ( $('input[type=radio]').checked = true) {
                    var titleP=$(this).data("answertext");
                    var numT=$(this).data("numb").toString();
                    var numB=numT.replace(/\./g,"_");
                    if("其他"==titleP){
                        var htmlp='<div class="weui-cell otherweui'+numB+'"><div class="weui-cell__bd"><span class="weui-shur">请输入：</span><input type="text"  class="weui-input inputother weuiINput" style="width: 150px;"></div></div>';
                        var chLenght=1;
                        if ($(".otherweui"+numB+"").length<chLenght) {
                            $(this).parent().parent().parent().append(htmlp);
                        }

                    }
                }
            });
            $("body").on("click", ".weui-noChild",function () {
                if ( $('input[type=radio]').checked = true) {
                    var numT=$(this).data("numb").toString();
                    var numB=numT.replace(/\./g,"_");
                    $(this).parent().parent().parent().find(".otherweui"+numB).remove();
                    var id=$(this).parent().parent().parent().find(".firstid").val();
                    $(".c_"+id+"").remove();
                    listNum=0;
                }
            });
            $(".ageNumT").datetimePicker({
                times: function () {

                },
                min: "1900-12-12",
                value: timess+" ",
                onChange: function (picker, values, displayValues) {
                    console.log(values);
                }
            });
            $(".address").picker({
                title: "请选择您的长住地址",
                cols: [
                    {
                        textAlign: 'center',
                        values: ['北京市','天津市','上海市','重庆市','湖北省','河北省','河南省','福建省',
                            '广东省','海南省','台湾省','四川省','湖南省','安徽省','江苏省','云南省',
                            '新疆维吾尔自治区','内蒙古自治区','甘肃省','广西壮族自治区','宁夏回族自治区',
                            '香港特别行政区','澳门特别行政区','浙江省','辽宁省','黑龙江省','山东省','江西省','山西省','陕西省','吉林省','贵州省','青海省','西藏自治区']
                    }
                ],
                onChange: function(p, v, dv) {
                    document.activeElement.blur();
                    console.log(p);
                    console.log(v);
                    console.log(dv);
                    var datalist=dv;
                    var pluginTag="AREA_BACKLIST_PLUGIN";
                    var input=this.input;
                    console.log(input.className)
                    var qid=$(input).parent().find("#textarea").val();
                    console.log(qid);
                    pluginCalc(input,pluginTag,datalist,qid);
                },
                onClose: function(p, v, d) {
                    console.log("close");
                }
            });
            ageL();
            function ageOne(appDateone) {
                var currYear = (new Date()).getFullYear();
                var opt={};
                opt.date = {preset : 'date'};
                opt.datetime = {preset : 'datetime'};
                opt.time = {preset : 'time'};
                opt.default = {
                    theme: 'android-ics light', //皮肤样式
                    display: 'modal', //显示方式
                    mode: 'scroller', //日期选择模式
                    lang:'zh',
                    startYear:currYear - 100, //开始年份
                    endYear:currYear//结束年份
                };
                $(".appDateone").datetimePicker({
                    times: function () {

                    },
                    min: "1900-12-12",
                    value: timess+" ",
                    onChange: function (picker, values, displayValues) {
                        console.log(values);
                    }
                });
                // $("."+appDateone).val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
            }
            function ageL() {
                var currYear = (new Date()).getFullYear();
                var opt={};
                opt.date = {preset : 'date'};
                opt.datetime = {preset : 'datetime'};
                opt.time = {preset : 'time'};
                opt.default = {
                    theme: 'android-ics light', //皮肤样式
                    display: 'modal', //显示方式
                    mode: 'scroller', //日期选择模式
                    lang:'zh',
                    startYear:currYear - 100, //开始年份
                    endYear:currYear //结束年份
                };
               
                $(".appDate").datetimePicker({
                    times: function () {

                    },
                    min: "1900-12-12",
                    value: timess+" ",
                    onChange: function (picker, values, displayValues) {
                        console.log(values);
                    }
                });
                // $(".appDate").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
            }
            $("body").on("change", ".ageNumClick",function () {
                var datalist=[$(this).val()];
                var pluginTag="AGE_PLUGIN";
                var qid=$(this).parent().find("#textarea").val();
                var $this=this;
                pluginCalc($this,pluginTag,datalist,qid);
            });
            var TheightCM="";
            var Theightkg="";
            $(".TheightCM").change(function () {
                TheightCM=$(this).val();
                var $this=this;
                TheightkgO($this);
                console.log("a");
            })
            $(".Theightkg").change(function () {
                Theightkg=$(this).val();
                var $this=this;
                TheightkgO($this);
            })
            function TheightkgO($this) {
                console.log($this);
                if(TheightCM!=""&&Theightkg!=""){
                    var pluginTag="BMI_PLUGIN";
                    var datalist=[Theightkg,TheightCM];
                    var qid=$($this).parent().find("#textarea").val();
                    console.log(qid);
                    pluginCalc($this,pluginTag,datalist,qid);
                }
            }
        }
    },
    error: function (data) {

    }
});

function pluginCalc(_this,pluginTag,datas,qid) {
    $.ajax({
        type:"POST",
        url:"/m/v1/api/medical/pluginCalc?token="+token,
        dataType:"json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("content-Type", "application/json");
        },
        data:JSON.stringify({
            "pluginTag":pluginTag,
            "qId":qid,
            "datas":datas
        }),
        success:function (data) {
            var  $this= $(_this);
            if(data.errCode==0) {
                var body=data.body;
                console.log(body);
                console.log($this.parent());
                // $this.next(".ageNumP").val(body);
                $this.parent().find(".ageNumP").val(body);
            }
        },
        error:function (error) {
        }
    });
}
function  submit() {
    var textarea=$(".weui-textarea").val();
    var planId=id;
    data={
        "planId":planIdNUm,
        "dataList":[]
    };
    var questionbox=$(".weui-cells");
    var awsNum=questionbox.length;
    data.planId = planIdNUm;
    data.awsNum = awsNum;
    data.realizeClassName = realizeClassName;
    var html=$(".weui-cells").html();
    var textV=[];
    var chk_value =[];
    var classList;
    $.each(questionbox, function() {
        var dataList = [];
        var $this=$(this);
        var questionType=$this.find(".questionType").val();//问题类型【CHECKBOX、RADIO、TEXT】
        if(questionType==2){
            var dataList={};
            var mid=$this.find(".id").val();
            var tag=$this.find(".weui-detail-icon").text()
            var daan = $this.find("input[type=checkbox]:checked");
            var score=daan.data("score");
            var answertext=$this.find(".inputother").val();

            dataList.tag=tag;
            dataList.answer=[];
            dataList.answerText=[answertext];
            dataList.score=score;
            dataList.hideValue="";
            var chk_value1 =[];
            daan.each(function(){
                dataList.answer.push($(this).val());
                chk_value1.push($(this).val());

            });
            if(chk_value1==""){
                $("#ajaxcheck").val("false");
            }else{
                $("#ajaxcheck").val("true");
            };
        }
        else if(questionType==1){
            var dataList={};
            var mid=$this.find(".id").val();
            var tag=$this.find(".weui-detail-icon").text()
            var daan = $this.find("input[type=radio]:checked");
            var oterText=daan.data("answertext")
            var score=daan.data("score");
            var answertext=$this.find(".inputother").val();
            if(answertext==null){
                answertext="";
            }
            if(oterText=="其他"){
                textV.push(answertext);
            }

            dataList.tag=tag;
            dataList.answer=[];
            dataList.answerText=[answertext];
            dataList.score=score;
            dataList.hideValue="";
            console.log(daan.context.classList[3]);
            classList=daan.context.classList[3]

            daan.each(function(){
                dataList.answer.push($(this).val());
                chk_value.push(daan);


            });
            if (daan.length == 0) {

                $("#ajaxradio").val("false");
                return false;
            }else{
                $("#ajaxradio").val("true");
            }

        }else if(questionType==3){
            var dataList={};
            var mid=$this.find(".id").val()
            var tag=$this.find(".weui-detail-icon").text();
            var hideValue=$this.find(".ageNumP").val();
            var answertext=$this.find(".weuiINput").val();
            answertext   =   answertext.replace(/\s+/g,"");
            console.log(answertext+'o');
            dataList.tag=tag;
            dataList.answer=[];
            dataList.answerText= [];
            dataList.score="";
            dataList.hideValue=hideValue;
            var daan = $this.find(".weuiINput");

            daan.each(function () {
                var oDaan=$(this).val()
                oDaan   =   oDaan.replace(/\s+/g,"");
                textV.push(oDaan);
            })
            var daan3 = $this.find(".ageNum");
            daan3.each(function(){
                var odaan3=$(this).val()
                odaan3   =   odaan3.replace(/\s+/g,"");
                dataList.answerText.push(odaan3);
            });
        }
        data.dataList.push(dataList);
    });
    console.log(chk_value);
    $("html,body").animate({scrollTop: $("."+classList+"").offset().top}, 1000);
    if($.inArray("", textV)!=-1){
        $("#ajaxtext").val("false");
    }else{
        $("#ajaxtext").val("true");
    }
    $('form').on('submit', function() {
        var title = $('inpur[name=title]').val(),
            content = $('textarea').val();
    })
    var ajaxradio=$("#ajaxradio").val();
    var ajaxcheck=$("#ajaxcheck").val();
    var ajaxtext=$("#ajaxtext").val();

    if(ajaxradio=="false"||ajaxcheck=="false"||ajaxtext=="false"){
        $.alert("请将题做完在查看结果！");
    }else{
        ajaxsuit();
    }
    // ajaxsuit();
    function ajaxsuit() {
        $.ajax({
            type:"POST",
            url:"/m/v1/api/medical/commitAssessData?token="+token,
            dataType:"json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("token", token);
                xhr.setRequestHeader("content-Type", "application/json");
            },
            data:JSON.stringify(data),
            success:function (data) {
                if(data.errCode==0) {
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
                        window.webkit.messageHandlers.submit.postMessage(planIdNUm);
                    } else if (navigator.userAgent.match(/android/i)) {
                        window.android.jsMethodFollowSubmit(true,planIdNUm);
                        window.android.jsMethodSubmit(true);
                    }
                }else{
                    window.android.jsMethodFollowSubmit(false,"");
                    window.android.jsMethodSubmit(false);
                    $.alert(data.errMsg);
                }
            },
            error:function (error) {
                $.alert(data.errMsg);
                window.android.jsMethodSubmit(false);

            }
        });
    }
}
$('.submited').on('click', function() {
    // $.alert(planIdNUm);
    submit();
    // if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    //     window.webkit.messageHandlers.submit.postMessage(planIdNUm);
    // } else if (navigator.userAgent.match(/android/i)) {
    //
    //     window.androidShare.jsLookResult(planIdNUm);
    // }

})