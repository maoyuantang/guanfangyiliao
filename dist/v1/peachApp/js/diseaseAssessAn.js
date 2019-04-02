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

//.查看问诊计划详情
// var index=$.showLoading();
var planIdNUm;
var realizeClassName;
function jsGetAge(strBirthday){       
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    
    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    
    if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
    }
    else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
            if(nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    
    return returnAge;//返回周岁年龄
}
$.ajax({
    url: "/m/v1/api/medical/queryInfo?token="+token,
    type: "GET",
    dataType: "json",
    // beforeSend:index,
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", 'application/json');
    },
    data:{
        planId:id
    },
    success: function (data) {
        if(data.errCode==0) {
            var disaled="";
            var readonlyT="";
            if(data.body.handle==false){
                disaled='disabled';
                readonlyT='readonly'
            }else{
                disaled='';
                readonlyT='';
            }
            $(".submited").show();
            var htmlp='<h2 id="title">'+data.body.title+'</h2>'
                    +'<p class="auther">作者:'
                    +'<span id="author">'+data.body.author+'</span>'
                    +'[<span id="hospital">'+data.body.hospital+'</span>]'
                    +'</p>'
                    +'<p class="weui-ze">免责声明：早筛表可以发现危险迹象，最终诊断以专业检查结果为准</p>';
            $("#anone").html(htmlp);
            var datalist=[];
            for(var i=0;i<data.body.awss.length;i++){
                var awss={};
                awss.answerText=data.body.awss[i].answerText;
                awss.hideValue=data.body.awss[i].hideValue;
                awss.id=data.body.awss[i].id;
                awss.options=data.body.awss[i].options;
                awss.pid=data.body.awss[i].pid;
                awss.plugin=data.body.awss[i].plugin;
                awss.sequence=data.body.awss[i].sequence;
                awss.tag=data.body.awss[i].tag;
                awss.title=data.body.awss[i].title;
                awss.type=data.body.awss[i].type;
                var clid=data.body.awss[i].options;
                datalist.push(awss);
               for(var z=0; z<clid.length;z++){
                   if(clid[z].childAwss!=""&&clid[z].check==true){
                       for(var p=0; p<clid[z].childAwss.length; p++){
                           var childAwss={};
                           childAwss.answerText=clid[z].childAwss[p].answerText;
                           childAwss.hideValue=clid[z].childAwss[p].hideValue;
                           childAwss.id=clid[z].childAwss[p].id;
                           childAwss.options=clid[z].childAwss[p].options;
                           childAwss.pid=clid[z].childAwss[p].pid;
                           childAwss.plugin=clid[z].childAwss[p].plugin;
                           childAwss.sequence=clid[z].childAwss[p].sequence;
                           childAwss.tag=clid[z].childAwss[p].tag;
                           childAwss.title=clid[z].childAwss[p].title;
                           childAwss.type=clid[z].childAwss[p].type;
                           datalist.push(childAwss);
                       }

                   }
               }
            }
            planIdNUm=data.body.planId;
            realizeClassName=data.body.realizeClassName;
            var pathml = "";

            var data = datalist;
            var claArr=[];

            for (var i = 0; i < data.length; i++) {
                if (data[i].type == 3) {
                    pathml+='<div class="weui-cells weui-cells_form weui-margin-0">' +
                        '<input type="hidden" class="questionType" value="'+data[i].type+'">' +
                        '<input type="hidden" class="id nowid" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+data[i].tag+'</i>'
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
                    if(data[i].plugin=="AREA_BACKLIST_PLUGIN"||data[i].plugin=="WA_BACKLIST_PLUGIN") {//地区黑名单插件
                        pathml += '<input type="text" '+readonlyT+' class=" weui-input aninptwww"   value="'+data[i].hideValue+'" readlay/><input type="hidden" class="ageNumP">'
                    }else if(data[i].plugin=="AGE_PLUGIN"){//年龄插件

                        pathml += '<input type="text"  '+readonlyT+' class="weui-input aninptwww" value="'+jsGetAge(data[i].hideValue)+'" /><input type="hidden" class="ageNumP">'

                    }else if(data[i].plugin=="BMI_PLUGIN"){//体重指数插件
                        var heigh=data[i].hideValue.split(';')[1];
                        var weight=data[i].hideValue.split(';')[0];
                        pathml += '<input type="number"  class=" weui-input  aninptw" value="'+weight+'" '+readonlyT+'/><span class="testxm">kg</span><input type="hidden" class="ageNumP">'
                        pathml += '<input type="number"  class=" weui-input aninptw " value="'+heigh+'" '+readonlyT+' /><span class="testxm">cm</span>'

                    }else{
                        var heigh=data[i].answerText.split(';')[0];
                        pathml+="<p class='an-weu-text'>"+heigh+"</p>"
                        // pathml += '<input type="text"  readonly class="weui-input aninptwww" value="'+heigh+'" /><input type="hidden" class="ageNumP">'
                        // pathml += '<textarea class="weui-textarea" placeholder="请输入你所知道的答案" rows="2" id="text' + [i + 1] + '" form="usrform" READONLY>'
                        //     +
                        //     + '</textarea>'
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
                        var aaaa = solutionModels[j].check?"checked":solutionModels[j].check;
                        pathml+='<div class="weui-cell__hd weui-padd-right">'
                            +'<input type="checkbox" class="weui-check" value="'+solutionModels[j].id+'" name="checkbox'+j+'" id="b1'+i + j +'" '+aaaa+' '+disaled+'>'
                            +'<i class="weui-icon-checked"></i>'
                            +'</div>';
                        pathml+='</label>';
                    }
                    pathml += '</div>';
                } else if (data[i].type == 1) {
                    claArr.push("listR"+data[i].tag);
                    pathml+='<div class="weui-cells weui-cells_radio weui-margin-0 '+"listR"+data[i].tag+'"><input type="hidden" class="questionType" value="'+data[i].type+'"><input type="hidden" class="firstid" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+data[i].tag+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                    var solutionModels = data[i].options;
                    var pathmlCH="";
                    for (var j = 0; j < solutionModels.length; j++) {
                        var childId = "c_" + solutionModels[j].id;
                        if(solutionModels[j].title=="其他"){
                            var value;
                            if(solutionModels[j].text!=null){
                                value=solutionModels[j].text;
                                console.log(value);
                                // pathml+='<div class="weui-cell otherweui"><div class="weui-cell__bd"><input type="text" readonly value="'+value+'"  class="weui-input inputother" style="width: 150px;"></div></div>';
                                var htmlText="<span>("+value+")</span>"
                            }
                        }else{
                            var htmlText="<span></span>";
                        }
                        pathml +='<label class="weui-cell weui-check__label weui-tion-lef"  for="a1'+i + j +'">'
                            +'<div class="weui-cell__bd">'
                            +'<input type="hidden" class="sortNumId" value="'+ solutionModels[j].sortId+'">'
                            +'<input type="hidden" class="sortID nowid" value="'+ solutionModels[j].id+'">'
                            +'<p>'
                            + '<div class="assweuione"><span class="sortID" style="display: none">' + solutionModels[j].sortId + '</span>'
                            + '<span class="tag" >' + solutionModels[j].tag + '</span><span>、</span></div>'
                            + '<div class="assweuitwo"><span class="desc">' + solutionModels[j].title +htmlText+ '</span></div>'
                            +'</p>'
                            +'</div>';

                        var aaaa = solutionModels[j].check?"checked":solutionModels[j].check;
                        var childAwss=JSON.stringify(solutionModels[j].childAwss);
                        pathml += '<div class="weui-cell__ft">'
                            + '<input type="radio" class="weui-check weui-have" name="radio1' + i + '" aaaa data-answerText="' + solutionModels[j].title + '"  data-score="' + solutionModels[j].score + '" data-num="0" data-list='+childAwss+' value="' + solutionModels[j].id + '" id="a1' + i + j + '" ' + aaaa + ' '+disaled+'>'
                            + '<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                            + '</div>';
                        pathml += '</label>';


                    }
                    pathml += '</div>';

                }
            }
            var q = $(pathml);
            $("#questionbox").html(q);
        }
    },
    error: function (data) {

    }
});
function pluginCalc(_this,pluginTag,datas) {
    $.ajax({
        type:"POST",
        url:"/m/v1/api/medical/pluginCalc?token="+token,//
        dataType:"json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("content-Type", "application/json");
        },
        data:JSON.stringify({
            "pluginTag":pluginTag,
            "datas":datas
        }),
        success:function (data) {
            var $this = $(_this);
            if(data.errCode==0) {
                var body=data.body;
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
        // "basicInfoMap":[]
    };
    var questionbox=$(".weui-cells");
    var awsNum=questionbox.length;
    data.planId = planIdNUm;
    data.awsNum = awsNum;
    data.realizeClassName = realizeClassName;
    var html=$(".weui-cells").html();
    $.each(questionbox, function() {
        var dataList = [];
        var $this=$(this);
        var questionType=$this.find(".questionType").val();//问题类型【CHECKBOX、RADIO、TEXT】
        if(questionType==2){
            // var options={};
            // var mid=$this.find(".id").val();
            // options.id=mid;
            // options.textAnswer="";
            // options.optAndAnswer=[];
            // var desc=$this.find(".weui-tion-lef");
            // $.each(desc,function () {
            //     var optAndAnswer ={};
            //     var $desc=$(this)
            //     optAndAnswer.id=$desc.find(".weui-check").val();
            //     optAndAnswer.checked=$desc.find(".weui-check").is(":checked");
            //     options.optAndAnswer.push(optAndAnswer);
            //
            //     var daan = $this.find("input[type=checkbox]:checked");
            //     var chk_value =[];
            //     daan.each(function(){
            //         chk_value.push($(this).val());
            //     });
            //     if(chk_value==""){
            //         $("#ajaxradio").val("false");
            //     }else{
            //         $("#ajaxradio").val("true");
            //     };
            //
            // })
        }
        else if(questionType==1){
            var dataList={};
            var mid=$this.find(".id").val();
            var tag=$this.find(".weui-detail-icon").text()
            var daan = $this.find("input[type=radio]:checked");
            var score=daan.data("score");
            var answertext=daan.data("answertext");
            dataList.tag=tag;
            dataList.answer=[];
            dataList.answerText=[answertext];
            dataList.score=score;
            dataList.hideValue="false";
            var chk_value =[];
            daan.each(function(){
                dataList.answer.push($(this).val());
                chk_value.push($(this).val());
            });
            if(chk_value==""){
                $("#ajaxradio").val("false");
            }else{
                $("#ajaxradio").val("true");
            };

        }else if(questionType==3){
            var dataList={};
            var mid=$this.find(".id").val()
            var tag=$this.find(".weui-detail-icon").text();
            var hideValue=$this.find(".ageNumP").val();
            dataList.tag=tag;
            dataList.answer=[];
            dataList.answerText= [];
            dataList.score="";
            dataList.hideValue=hideValue;
            var daan3 = $this.find(".ageNum");
            daan3.each(function(){
                dataList.answerText.push($(this).val());

            });

        }
        data.dataList.push(dataList);
    });

    $('form').on('submit', function() {
        var title = $('inpur[name=title]').val(),
            content = $('textarea').val();
    })
    var ajaxradio=$("#ajaxradio").val();
    var ajaxcheck=$("#ajaxcheck").val();
    var ajaxtext=$("#ajaxtext").val();
    if(ajaxradio=="false"||ajaxcheck=="false"||ajaxtext=="false"){
        $.alert("请将题做完在提交！");
    }else{
        ajaxsuit();
    }
    function ajaxsuit() {
        $.ajax({
            type:"POST",
            url:"/m/v1/api/medical/commitAssessData?token="+token,
            dataType:"json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("content-Type", "application/json");
            },
            data:JSON.stringify(data),
            success:function (data) {
                if(data.errCode==0) {
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
                        window.webkit.messageHandlers.submit.postMessage(data.body);
                    } else if (navigator.userAgent.match(/android/i)) {
                        window.android.jsMethodFollowSubmit(true,planIdNUm);
                        window.android.jsMethodSubmit(true);
                    }
                }else{
                    window.android.jsMethodFollowSubmit(false,"");
                    window.android.jsMethodSubmit(false);
                }
            },
            error:function (error) {
                // $.alert(data.message);
                $.alert("操作失败");
                window.android.jsMethodSubmit(false);

            }
        });
    }

}
$('.submited').on('click', function() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        window.webkit.messageHandlers.submit.postMessage(planIdNUm);
    } else if (navigator.userAgent.match(/android/i)) {
        window.android.jsLookResult();
    }
})