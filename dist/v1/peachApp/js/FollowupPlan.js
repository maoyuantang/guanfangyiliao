/**
 * Created by tangyu on 2017/11/13.
 */
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
var oUserId=getParam('userId');
var target;
function alerts() {
    $.alert("a");
}
function callJs(title) {
    if (target) {
    }
    document.getElementById('titletwo').innerHTML = title;
    $(".titletwo").val(title);
    var obj = JSON.parse(title);
    var followUpType;
    if(obj.followType=="ESSAY"){
        followUpType="<span class='trueB'><i></i>健康知识</span>";
    }else if(obj.followType=="INQUIRY"){
        followUpType="<span class='trueB'><i></i>问诊表</span>";
    }
    var append="";
    append+='<div class="weui-cell weyu_list_one">'
        +'<div class="weui-cell__hd">'
        +'<img src="" />'
        +'</div>'
        +'<div class="weui-cell__bd">'
        +'<p class="weui-list-text">'
        +'<span class="trueB"><i></i>'
        +followUpType
        +'</span>：<span class="weui-back-f60">'
        +obj.title
        +'</span><span class="weui-back-f60">'
        +'<input type="hidden" class="followUpType" value="'+obj.followType+'" />'
        +'<input type="hidden" class="contentId" value="'+obj.id+'" /></span></p>'
        +'</div>'
        +'<div class="weui-cell__ft weuidelete">'
        +'<i class="weui-icon-cancel weui-icon-backcole"></i>'
        +'</div>'
        +'</div>';
    target.append(append);
    $(".weuidelete").click(function () {
        e = window.event || e;
        e.preventDefault();
        var weuilost=$(this).parent();
        weuilost.remove();
    });
    window.webkit.messageHandlers.callJs.postMessage("callJs");
}
$("#click").click(function () {
    jsMethod();
})
function jsMethod() {
    window.webkit.messageHandlers.jsMethod.postMessage("followupPlanIos");
}
//查询随访列表
$.ajax({
    url: "/m/v1/api/followup/followupModel/get?token="+token,
    type: "GET",
    dataType: "json",
    // beforeSend:index,
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", 'application/json');
    },
    data:{
        "followupId":id
    },
    success: function (data) {
        if(data.errCode==0) {
            $("#titleName").text(data.body.title);
            $("#date").val(data.body.firstTreatmentTime);
            var pathml="";
            if(data.body.remindHe==true){
                $("#remindHe").text("开");
            }else {
               $("#remindHe").text("关");
             }
           if(data.body.remindHe==true){
               $(".remindMe").prop("checked",true);
           }else {
               $(".remindMe").prop("checked",false);
           }
           $("#remindDays").val(data.body.remindDays);
           $("#remindHeOne").val(data.body.remindHe);
           var remindDays;
           if(data.body.remindDays==3){
               remindDays='提前3天'
           }else if(data.body.remindDays==1){
               remindDays='提前1天'
           }else if(data.body.remindDays==4){
               remindDays='提前4天'
           }else if(data.body.remindDays==7){
               remindDays='提前一周'
           }else if(data.body.remindDays==14){
               remindDays='提前两周'
           }else if(data.body.remindDays==5){
               remindDays='提前5天'
           }else if(data.body.remindDays==2){
               remindDays='提前2天'
           }else if(data.body.remindDays==6){
               remindDays='提前6天'
           }else if(data.body.remindDays==7){
               remindDays='提前7天'
           }else if(data.body.remindDays==35){
               remindDays='提前五周'
           }
           // $("#titime").val(data.body.remindDays)
           $("#titime").val(remindDays)
           var data = data.body.itemModels;
           for (var i = 0; i < data.length; i++) {
                pathml+='<div class="planList"><div class="weui-col-100 weui-col-marg follist">'
                    +'<div class="weui-cells weui-cells_form weui-margin-0">'
                    +'<div class="weui-cell weui-cell_switch weui-ba-E3E3E3">'
                    +'<div class="weui-cell__bd weui-tex-des weui-tone-desk">'
                    +'<span class="weui-floow-first"></span> 距离首次治疗'
                    +'<div class="weui-plam-month">'
                    +'<input class="weui-input month planweui"  type="text" placeholder="'+data[i].calcVal+data[i].calcUnit+'" value="">'
                    +'<input type="hidden" class="calcValone" value="'+data[i].calcVal+'">'
                    +'<input type="hidden" class="calcUnitone" value="'+data[i].calcUnit+'">'
                    +'</div>'
                    +'<span class="calcDate">'+data[i].calcDate+'</span></div>'
                    +'<div class="weui-cell__ft">'
                    +'<input class="weui-switch weui-sw-bac discussion" type="checkbox" checked><input type="hidden" class="ifcheck" value="true">'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'<div class="weui-foll-list">'
                    +'<div class="weui-cells weui-margin-0">'
                    +'<div class="wenplan">';
                    var datalist=data[i].contentModels;

                    for(var j=0;j<datalist.length;j++){
                        if(datalist[j].followUpType=="REMIND"){
                            followUpType="<span class='falseB'><i></i>复查提醒</span>";
                        }else if(datalist[j].followUpType=="ESSAY"){
                            followUpType="<span class='trueB'><i></i>文章</span>";
                        }else if(datalist[j].followUpType=="INQUIRY"){
                            followUpType="<span class='trueB'><i></i>问诊表</span>";
                        }
                        pathml+='<div class="weui-cell weyu_list_one">'
                            +'<div class="weui-cell__bd">';
                                if(datalist[j].followUpType=="REMIND"){
                                    pathml+='<p class="weui-list-text weuifucha">'+followUpType+': '
                                    +'<span class="weui-back-f60 futext">'+datalist[j].title+'</span>'
                                    +'<input type="hidden" class="followUpType" value="'+datalist[j].followUpType+'">'
                                    +'<input type="hidden" class="contentId" value="'+datalist[j].contentId+'"> '
                                    +'</p>';
                                }else{
                                    pathml+='<p class="weui-list-text">'+followUpType+': '
                                    +'<span class="weui-back-f60">'+datalist[j].title+'</span>'
                                    +'<input type="hidden" class="followUpType" value="'+datalist[j].followUpType+'">'
                                    +'<input type="hidden" class="contentId" value="'+datalist[j].contentId+'"> '
                                    +'</p>';
                                }
                        pathml+='</div>'
                            +'<div class="weui-cell__ft weui-delete"><i class="weui-icon-cancel weui-icon-backcole"></i></div>'
                            +'</div>';
                    }
                    pathml+='</div><div class="weui-wenzje">'
                    +' <div class="weui-lpak-te">'
                    +'<p class="openpopup" id="open"><span class="weui-add-plan">+</span>问诊表/健康知识</p>'
                    +'</div>'
                    +'</div>'
                    +'<div class="weui-lis-bttom">'
                    +'<span class="addAll"><img src="images/a-5.png" alt="" class="weui-list-add">添加一项</span>'
                    +'<span class="dataAll"><img src="images/a-4.png" alt="" class="weui-list-add">删除此项</span>'
                    +'</div>'
                    +'</div>'
                    +'</div>'
                    +'</div></div>';
           }
           $("#followtext").html(pathml);

           $("body").on('click','.weui-wenzje', function() {
               $("#change").val("true");
               target = $(this).prev();
               if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
                   jsMethod();
               } else if (navigator.userAgent.match(/android/i)) {
                   window.androidShare.jsMethodDetail();
               }
           })

           function toast(){
               $.alert("sting");
           }
           var datatime=$("#date").val();
           var weuifucha;
           $("body").on("click", ".weuifucha",function () {

               weuifucha=$(this);
               var textlist=weuifucha.find(".futext").text();
               console.log(textlist)
               $.prompt({
                   text: "请输入您的复查提醒",
                   title: "提示",
                   onOK: function(text) {
                       weuifucha.find(".futext").text(text)
                       // $.alert("您的名字是:"+text, "角色设定成功");
                   },
                   onCancel: function() {
                       console.log("取消了");
                   },
                   input: textlist
               });
           } );
            $("body").on("click", ".dataAll",delate);
            function delate() {
                e = window.event || e;
                e.preventDefault();

                var dataAl=$(this).parent().parent().parent().parent().parent();
                $("#change").val("true");
                var followtext=$("#followtext");
                $.each(followtext, function () {
                    var $followtext = $(this);
                    var planList=$followtext.find(".planList").length;
                    if(planList!=1){
                        $.toptip('删除成功', 'success');
                        dataAl.remove();

                    }else {
                        $.alert("仅剩下一项内容了，不能进行删除！")
                    }
                })
            }
           //新增一项
           function addlist() {
               $.toptip('添加成功', 'success');
               var append="";
               append+='<div class="planList">'
                   +'<div class="weui-col-100 weui-col-marg follist">'
                   +'<div class="weui-cells weui-cells_form weui-margin-0">'
                   +'<div class="weui-cell weui-cell_switch weui-ba-E3E3E3">'
                   +'<div class="weui-cell__bd weui-tex-des weui-tone-desk">'
                   +'<span class="weui-floow-first"></span>'
                   +' 距离首次治疗'
                   +'<div class="weui-plam-month">'
                   +'<input class="weui-input month" type="text" placeholder="1日" value="" readonly="" />'
                   +'<input type="hidden" class="calcValone" value="1" />'
                   +'<input type="hidden" class="calcUnitone" value="日" />'
                   +'</div>'
                   +'<span class="calcDate">'+datatime+'</span>'
                   +'</div>'
                   +'<div class="weui-cell__ft">'
                   +'<input class="weui-switch weui-sw-bac discussion" type="checkbox" checked="" />'
                   +'<input type="hidden" class="ifcheck" value="true" />'
                   +'</div>'
                   +'</div>'
                   +'</div>'
                   +'<div class="weui-foll-list">'
                   +'<div class="weui-cells weui-margin-0">'
                   +'<div class="wenplan">'




                    +'<div class="weui-cell weyu_list_one">'
                   // +'<div class="weui-wenzje wueilisdt">'
                   +'<div class="weui-cell__bd">'
                   +'<p class="weui-list-text weuifucha" style="text-align: left">复查提醒: '
                   +'<span class="weui-back-f60 futext">点击此处进行编辑</span>'
                   +'<input type="hidden" class="followUpType" value="REMIND">'
                   +'<input type="hidden" class="contentId" value=""> '
                   +'</p>'
                   +'</div>'
                   +'<div class="weui-cell__ft weui-delete"><i class="weui-icon-cancel weui-icon-backcole"></i></div>'
                   // +'</div>'
                   +'</div>'
                   +'</div>'
                   +'<div class="weui-wenzje">'
                   +'<div class="weui-lpak-te">'
                   +'<p class="openpopup" id="open"><span class="weui-add-plan">+</span>问诊表/健康知识</p>'

                   +'</div>'
                   +'</div>'
                   +'<div class="weui-lis-bttom">'
                   +'<span class="addAll"><img src="images/a-5.png" alt="" class="weui-list-add" />添加一项</span>'
                   +'<span class="dataAll"><img src="images/a-4.png" alt="" class="weui-list-add" />删除此项</span>'
                   +'</div>'
                   +'</div>'
                   +'</div>'
                   +'</div>'
                   +'</div>';
               var follist=$(this).parent().parent().parent().parent().parent();
               var app = $(append);
               follist.after(app);
               $("#change").val("true");

               $(".weui-delete").click(function () {
                   e = window.event || e;
                   e.preventDefault();
                   var weuilost=$(this).parent();
                   weuilost.remove();
                   $("#change").val("true");
               });
               // $(".wueilisdt").on('click', function() {
               //     $("#change").val("true");
               //     target = $(this).prev();
               //     if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
               //         jsMethod();
               //     } else if (navigator.userAgent.match(/android/i)) {
               //         window.androidShare.jsMethodDetail();
               //     }
               // })

               $(".month").picker({
                   title: "请选择时间周期",
                   cols: [
                       {
                           textAlign: 'center',
                           values: ['1', '2', '3', '4', '5','6', '7', '8', '9','10','11','12','13','14','15','16','17','18','19','20','21']
                           //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
                       },
                       {
                           textAlign: 'center',
                           values: ['天', '周', '月', '年']
                       }
                   ],
                   onChange: function(p, v, dv) {
                       var calcValone=$(p.input).parent().find(".calcValone");
                       var calcUnitone=$(p.input).parent().find(".calcUnitone");
                       calcValone.val(v[0]);
                       calcUnitone.val(v[1]);
                       $("#change").val("true");
                       var weekNum=v[0];
                       var weekMonth=v[1];
                       var weekMonthNum="";
                       if(weekMonth=="天"){
                           weekMonthNum=1;
                       }else if(weekMonth=="周"){
                           weekMonthNum=7;
                       }else if(weekMonth=="月"){
                           weekMonthNum=30;
                       }else if(weekMonth=="年"){
                           weekMonthNum=365;
                       }

                       var Totalumber=parseInt(weekMonthNum*weekNum);//获取总数
                       var dateone=$("#date").val();

                       addDate(dateone,Totalumber);
                       var dataNum=dateone.getDate+Totalumber;


                       var d=new Date(dateone);
                       d.setDate(d.getDate()+Totalumber);
                       var m=d.getMonth()+1;
                       var newdata=d.getFullYear()+'-'+m+'-'+d.getDate();
                       if(newdata=="NaN-NaN-NaN"){
                           $.alert("请选择首次治疗时间");
                           return false;
                       }else {
                           $(p.input).parent().parent().find(".calcDate").text(newdata);
                       }
                   },

               });
               $(".discussion").click(function () {
                   var $this=$(this);

                   if($($this).is(':checked')) {
                       $this.parent().find(".ifcheck").val("true");
                   }else{
                       $this.parent().find(".ifcheck").val("false");
                   }
                   $("#change").val("true");
               })
           }

           $("body").on("click", ".addAll",addlist );
           // $("body").on("click", ".addAll",function () {
           //
           // } );

           $(".weui-delete").click(function () {
               e = window.event || e;
               e.preventDefault();
               var weuilost=$(this).parent();
               weuilost.remove();
               $("#change").val("true");
           });
           //设置问诊模板是否开放
           $(".discussion").click(function () {
               var $this=$(this)
               if($($this).is(':checked')) {
                   $this.parent().find(".ifcheck").val("true");
               }else{
                   $this.parent().find(".ifcheck").val("false");
               }
               $("#change").val("true");
           })
           // $(".dataAll").click(function () {
           //     e = window.event || e;
           //     e.preventDefault();
           //     var dataAl=$(this).parent().parent().parent().parent().parent();
           //     dataAl.remove();
           //     $("#change").val("true");
           // });
           var ary = new Array();

           var s = ary.join(",")+",";

           $(".month").picker({
               title: "请选择时间周期",
               cols: [
                   {
                       textAlign: 'center',
                       values: ['1', '2', '3', '4', '5','6', '7', '8', '9','10','11','12','13','14','15','16','17','18','19','20','21']
                       //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
                   },
                   {
                       textAlign: 'center',
                       values: ['天', '周', '月', '年']
                   }
               ],
               onChange: function(p, v, dv) {
                   var calcValone=$(p.input).parent().find(".calcValone");
                   var calcUnitone=$(p.input).parent().find(".calcUnitone");
                   calcValone.val(v[0]);
                   calcUnitone.val(v[1]);
                   $("#change").val("true");
                    var weekNum=v[0];
                    var weekMonth=v[1];
                    var weekMonthNum="";
                    if(weekMonth=="天"){
                        weekMonthNum=1;
                    }else if(weekMonth=="周"){
                        weekMonthNum=7;
                    }else if(weekMonth=="月"){
                        weekMonthNum=30;
                    }else if(weekMonth=="年"){
                        weekMonthNum=365;
                    }
                    var Totalumber=parseInt(weekMonthNum*weekNum);//获取总数
                   var dateone=$("#date").val();
                   addDate(dateone,Totalumber);
                   var dataNum=dateone.getDate+Totalumber;
                   var d=new Date(dateone);
                   d.setDate(d.getDate()+Totalumber);
                   var m=d.getMonth()+1;
                   var newdata=d.getFullYear()+'-'+m+'-'+d.getDate();
                   if(newdata=="NaN-NaN-NaN"){
                       $.alert("请选择首次治疗时间");
                       return false;
                   }else {
                       $(p.input).parent().parent().find(".calcDate").text(newdata);
                   }
               },

           });
       }

    },
    error: function (data) {

    }
});


function addDate(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var m=d.getMonth()+1;
    var newdata=d.getFullYear()+'-'+m+'-'+d.getDate();
    return newdata;
}


var remindMe="true";
$("#discussion").click(function () {
    $("#change").val("true");
    if($('#discussion').is(':checked')) {
        remindMe='true';
        console.log("a");
    }else{
        remindMe='false';
        console.log("b");
    }
})
$('.aaaa').click(function(){
    submit()
})
submit()
function  submit() {
    alert($("#remindDays").val())
    var title=$("#titleName").text();
    var firstTreatmentTime=$("#date").val();
    var remindDays=$("#remindDays").val();
    var remindHe=$("#remindHeOne").val();
    var change=$("#change").val();
    data={
        "change":change,             //是否生成计划时创建随访模板 true是，false否
        "id": id,       //模板ID
        'userId':oUserId,
        "title": title,               //标题
        "firstTreatmentTime": firstTreatmentTime,     //首次治疗时间
        "remindMe": remindMe,               //提醒我
        "remindHe": remindHe,               //提醒TA
        "remindDays": remindDays,                //提醒时间
        "itemModels": []
    };
    var questionbox=$(".planList");
    $.each(questionbox, function() {
        var $this=$(this);
        var ifchck=$this.find(".ifcheck").val();
            var itemModels={};
            itemModels.calcVal=$this.find(".calcValone").val();
            itemModels.calcUnit=$this.find(".calcUnitone").val();
            itemModels.calcDate=$this.find(".calcDate").text();
            itemModels.state=ifchck;
            var contentModels={};
            var desc=$this.find(".weyu_list_one");
            var questionType=$this.find(".questionType").val();//问题类型【CHECKBOX、RADIO、TEXT】
            itemModels.contentModels=[];
            $.each(desc,function () {
                var contentModels ={};
                var $desc=$(this)
                contentModels.followUpType = $desc.find(".followUpType").val();
                contentModels.title = $desc.find(".weui-back-f60").text();
                contentModels.contentId = $desc.find(".contentId").val();
                itemModels.contentModels.push(contentModels);
            })
            data.itemModels.push(itemModels);
    });
    if(remindDays==""){
        $.alert("提醒时间不能为空！");
        return false;
    }else {
        $.ajax({
            type:"POST",
            url:"/m/v1/api/followup/followupPlan/createFollowUpPlan?token="+token,//【H5】根据随访模板生成计划
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
                        window.android.jsMethodFollowSubmit(true,data.body.id);
                        window.androidShare.jsMethodFollow(data.body.id);
                    }
                }else{
                    $.alert(data.errMsg);
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {

                    } else if (navigator.userAgent.match(/android/i)) {
                        window.android.jsMethodFollowSubmit(false,"");
                    }
                }

            },
            error:function (error) {
                $.alert(data.errMsg);
                window.android.jsMethodSubmit(false);
            }
        })
    }

}
function showAlert(message){
    alert(message);
}
$('.submited').on('click', function() {
    submit();
})

