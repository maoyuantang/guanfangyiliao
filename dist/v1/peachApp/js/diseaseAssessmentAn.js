/**
 * Created by tangyu on 2017/11/15.
 */
/**
 * Created by tangyu on 2017/11/14.
 */
/**
 * Created by tangyu on 2017/11/7.
 */
/**
 * Created by tangyu on 2017/11/7.
 */
// var token="80e28d70bfe24368aa97a3e3d3ae17c9";
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
$("#discussion").click(function () {
    if($('#discussion').is(':checked')) {
        console.log("true");
        var cancel='';
        var textL='操作成功';
        updateInquiryState(textL,cancel);
    }else{
        var textL='取消操作';
        var cancel='cancel'
        updateInquiryState(textL,cancel);
        console.log("false");
    }
})
function updateInquiryState(textL,state) {
    $.ajax({
        url: "/api/v1s1/inquiry/doctor/updateInquiryState",//不用
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
//.查看问诊计划详情
// var index=$.showLoading();
$.ajax({
    url: " /api/v1s1/evaluation/user/queryEvalPlanId?token="+token,//没得
    type: "GET",
    dataType: "json",
    // beforeSend:index,
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", 'application/json');
    },
    data:{
        id:id
    },
    success: function (data) {
        $.hideLoading();
        if(data.errCode==0) {
            $("#title").text(data.body.title);
            $("#numtext").text(data.body.count);
            $("#title").text(data.body.title);
            $("#count").text(data.body.count);
            var pathml = "";
            var data = data.body.options;
            for (var i = 0; i < data.length; i++) {
                if (data[i].questionType == "TEXT") {
                    pathml+='<div class="weui-cells weui-cells_form weui-margin-0">' +
                        '<input type="hidden" class="questionType" value="'+data[i].questionType+'">' +
                        '<input type="hidden" class="id nowid" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                        +'<div class="weui-cell">'
                        +'<div class="weui-cell__bd"><input type="hidden" id="textarea" value="'+data[i].id+'">'
                        +'<textarea class="weui-textarea" placeholder="请输入你所知道的答案" rows="3" id="text'+[i+1]+'" form="usrform" readonly>'
                        +data[i].textAnswer
                        +'</textarea>'
                        +'</div>'
                        +'</div>'
                        +'</div>';
                } else if (data[i].questionType == "CHECKBOX") {
                    pathml+='<div class="weui-cells weui-cells_checkbox weui-margin-0"><input type="hidden" class="questionType" value="'+data[i].questionType+'"><input type="hidden" class="id" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                    var solutionModels = data[i].optAndAnswer;
                    for (var j = 0; j < solutionModels.length; j++) {
                        pathml+='<label class="weui-cell weui-check__label weui-tion-lef" for="b1'+i + j +'">'
                            +'<div class="weui-cell__bd">'
                            +'<input type="hidden" class="sortNumId" value="'+ solutionModels[j].sortId+'">'
                            +'<input type="hidden" class="sortID nowid" value="'+ solutionModels[j].id+'">'
                            +'<p>'
                            + '<span class="sortID" style="display: none">' + solutionModels[j].sortId + '</span>'
                            + '<span class="tag" >' + solutionModels[j].tag + '</span><span>、</span>'
                            + '<span class="desc">' + solutionModels[j].desc + '</span>'
                            +'</p>'
                            +'</div>';
                        var aaaa = solutionModels[j].checked?"checked":solutionModels[j].checked;
                        pathml+='<div class="weui-cell__hd weui-padd-right">'
                            +'<input type="checkbox" class="weui-check" disabled value="'+solutionModels[j].id+'" name="checkbox'+j+'" id="b1'+i + j +'" '+aaaa+'>'
                            +'<i class="weui-icon-checked"></i>'
                            +'</div>';
                        pathml+='</label>';


                    }
                    pathml += '</div>';
                } else if (data[i].questionType == "RADIO") {
                    pathml+='<div class="weui-cells weui-cells_radio weui-margin-0"><input type="hidden" class="questionType" value="'+data[i].questionType+'"><input type="hidden" class="id" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                    var solutionModels = data[i].optAndAnswer;
                    for (var j = 0; j < solutionModels.length; j++) {
                        pathml +='<label class="weui-cell weui-check__label weui-tion-lef"  for="a1'+i + j +'">'
                            +'<div class="weui-cell__bd">'
                            +'<input type="hidden" class="sortNumId" value="'+ solutionModels[j].sortId+'">'
                            +'<input type="hidden" class="sortID nowid" value="'+ solutionModels[j].id+'">'
                            +'<p>'
                            + '<span class="sortID" style="display: none">' + solutionModels[j].sortId + '</span>'
                            + '<span class="tag" >' + solutionModels[j].tag + '</span><span>、</span>'
                            + '<span class="desc">' + solutionModels[j].desc + '</span>'
                            +'</p>'
                            +'</div>';
                        var aaaa = solutionModels[j].checked?"checked":solutionModels[j].checked;
                        pathml+='<div class="weui-cell__ft">'
                            +'<input type="radio" class="weui-check" disabled name="radio1'+i+'" value="'+solutionModels[j].id+'" id="a1'+i + j +'" '+aaaa+'>'
                            +'<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                            +'</div>'

                        pathml+='</label>';
                    }
                    pathml += '</div>';

                }
            }
            $("#questionbox").html(pathml);
        }
    },
    error: function (data) {

    }
});
