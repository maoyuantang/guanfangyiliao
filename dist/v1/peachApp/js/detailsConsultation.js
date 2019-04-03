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
var userId=getParam('userId');
var token=getParam('token');
console.log(id)
console.log(token)

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
        url: "/health/api/v2/inquiry/doctor/updateInquiryState",//没用
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
//不同场景的生成问诊计划
// generateInquiryPlan();
// function generateInquiryPlan() {
//     $.ajax({
//         url: "/health/api/v2/inquiry/doctor/generateInquiryPlan",
//         type: "POST",
//         dataType: "json",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("token", token);
//             xhr.setRequestHeader("Content-Type", 'application/json');
//         },
//         data:JSON.stringify({
//             id:id,
//             userId:userId
//         }),
//         success: function (data) {
//             var userid=data.body;
//             ios('generateInquiryPlan',userid);
//
//             window.androidShare.jsMethod(data.body);
//             return data.body;
//         },
//         error: function (data) {
//         }
//     })
// }
// showAlert("hello");
// function showAlert(message){
//     alert(message);
// }
//
// function setupWebViewJavascriptBridge(callback) {
//     if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
//     if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
//     window.WVJBCallbacks = [callback];
//     var WVJBIframe = document.createElement('iframe');
//     WVJBIframe.style.display = 'none';
//     WVJBIframe.src = 'https://__bridge_loaded__';
//     document.documentElement.appendChild(WVJBIframe);
//     setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
// }
// setupWebViewJavascriptBridge(function(bridge) {
//
//     /* Initialize your app here */
//
//     bridge.registerHandler('JS Echo', function(data, responseCallback) {
//         console.log("JS Echo called with:", data)
//         responseCallback(data)
//     })
//     bridge.callHandler('ObjC Echo', {'key':'value'}, function responseCallback(responseData) {
//         console.log("JS received response:", responseData)
//     })
// })
//.查询科室列表
// var index=$.showLoading();
$.ajax({
    url: "/m/v1/api/inquiry/inquiryModel/queryInquiry?token="+token,//问诊模板详情
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
        if(data.errCode==0) {
            $("#title").text(data.body.title);
            $("#numtext").text(data.body.count)
            var pathml = "";
            var data = data.body.bankModels;
            for (var i = 0; i < data.length; i++) {
                if (data[i].questionType == "TEXT") {
                pathml+='<div class="weui-cells weui-cells_form weui-margin-0">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +(data[i].title)
                        +'</div>'
                        +'<div class="weui-cell">'
                        +'<div class="weui-cell__bd">'
                        +'<textarea class="weui-textarea" placeholder="请输入你所知道的答案" rows="3" id="text'+[i+1]+'"></textarea>'
                        +'</div>'
                        +'</div>'
                        +'</div>';
                } else if (data[i].questionType == "CHECKBOX") {
                    pathml+='<div class="weui-cells weui-cells_checkbox weui-margin-0">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +(data[i].title)
                        +'</div>'
                        var solutionModels = data[i].solutionModels;
                        for (var j = 0; j < solutionModels.length; j++) {
                            pathml+='<label class="weui-cell weui-check__label weui-tion-lef" for="b1'+i + j +'">'
                                +'<div class="weui-cell__bd">'
                                +'<p>'
                                + '<span class="sortID" style="display: none">' + solutionModels[j].sortId + '</span>'
                                + '<span class="tag" >' + solutionModels[j].tag + '</span><span>、</span>'
                                + '<span class="desc">' + solutionModels[j].desc + '</span>'
                                +'</p>'
                                +'</div>'
                                +'<div class="weui-cell__hd weui-padd-right">'
                                +'<input type="checkbox" class="weui-check" name="checkbox'+j+'" id="b1'+i + j +'">'
                                +'<i class="weui-icon-checked"></i>'
                                +'</div>'
                                +'</label>';

                    }
                    pathml += '</div>';
                } else if (data[i].questionType == "RADIO") {
                       pathml+='<div class="weui-cells weui-cells_radio weui-margin-0">'
                            +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                            +(data[i].title)
                            +'</div>'
                            var solutionModels = data[i].solutionModels;
                            for (var j = 0; j < solutionModels.length; j++) {
                               pathml +='<label class="weui-cell weui-check__label weui-tion-lef"  for="a1'+i + j +'">'
                                        +'<div class="weui-cell__bd">'
                                       +'<p>'
                                       + '<span class="sortID" style="display: none">' + solutionModels[j].sortId + '</span>'
                                       + '<span class="tag" >' + solutionModels[j].tag + '</span><span>、</span>'
                                       + '<span class="desc">' + solutionModels[j].desc + '</span>'
                                       +'</p>'
                                        +'</div>'
                                        +'<div class="weui-cell__ft">'
                                        +'<input type="radio" class="weui-check" name="radio1'+i+'" id="a1'+i + j +'">'
                                        +'<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                                        +'</div>'
                                        +'</label>';
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
