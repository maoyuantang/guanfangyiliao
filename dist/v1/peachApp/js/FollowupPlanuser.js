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
//查询随访列表
$.ajax({
    url: "/m/v1/api/followup/followupPlan/getFollowUpPlan?token="+token,
    type: "GET",
    dataType: "json",
    // beforeSend:index,
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", 'application/json');
    },
    data:{
        "planId":id
    },
    success: function (data) {
        if(data.errCode==0) {
            $("#userid").val(data.body.id);
            $(".title").text(data.body.title);
            $("#formeid").text("来自于："+data.body.doctorName);
            var pahtml="";
            var data = data.body.planItemResults;
            for (var i = 0; i < data.length; i++) {
                pahtml+='<div class="weui-user-list">'
                    +'<div class="weui-list-top">'
                    +'<h4 class="wuei-user-h3">距离就诊日期'+
                    +data[i].calcVal+data[i].calcUnit
                    +'后'
                    +'<span class="weui-back-646464">'
                    +data[i].calcDate
                    +'</span></h4>';
                    var datalist=data[i].itemContentResults;
                    for(var j=0;j<datalist.length;j++){
                        if(datalist[j].followUpType=="REMIND"){
                            followUpType="<span class='falseB'><i></i>复查提醒</span>";
                        }else if(datalist[j].followUpType=="ESSAY"){
                            followUpType="<span class='trueB'><i></i>文章</span>";
                        }else if(datalist[j].followUpType=="INQUIRY"){
                            followUpType="<span class='trueB'><i></i>问诊表</span>";
                        }
                        pahtml+='<p class="weui-suer-icon">'+followUpType+':'+ datalist[j].title+'</p>'
                    }
                    pahtml+='</div>'
                    +'</div>';
            }
            $(".weuiUserlist").html(pahtml);
            function submit() {
                var userid=$("#userid").val();
                console.log(userid);
                window.android.jsMethod(userid);
                return $("#userid").val();
            }
            submit();
        }else{
            $.alert(data.errMsg);
        }
    },
    error: function (data) {

    }
});


