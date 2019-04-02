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
    url: "/api/v1s1/evaluation/user/queryBasicInfo?token="+token,//没得
    type: "GET",
    dataType: "json",
    // beforeSend:index,
    async: true,
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
                        +'<textarea class="weui-textarea" placeholder="请输入你所知道的答案" rows="3" id="text'+[i+1]+'" form="usrform">'
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
                            +'<input type="checkbox" class="weui-check" value="'+solutionModels[j].id+'" name="checkbox'+j+'" id="b1'+i + j +'" '+aaaa+'>'
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
                            +'<input type="radio" class="weui-check" name="radio1'+i+'" value="'+solutionModels[j].id+'" id="a1'+i + j +'" '+aaaa+'>'
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
function  submit() {
    var textarea=$(".weui-textarea").val();
    var planId=id;
    data={
        "id":planId,
        "options":[]
    };
    data.id = id;
    var questionbox=$(".weui-cells");

    //      "id": "59fc25a01655d7584afeb82a",                               //评估模板主键ID
    //     "options": [                                                    //问题
    //     {
    //         "id": "07fd6717ea084426b871f6ee78e9ad1e",               //问题ID
    //         "textAnswer": "111111",                                 //问题文本时的答案
    //         "optAndAnswer": [                                       //选项
    //             {
    //                 "id": "0ca72bd6f3f14ea3bfb5ffe2bed051ad",       //选项ID
    //                 "checked": true                                 //是否选中；true选中；false不选中
    //             },
    //             {
    //                 "id": "4b1c34c39e4e4440a9287637b51d53c0",
    //                 "checked": false
    //             },
    //             {
    //                 "id": "afe75edde3f34dbb89acfbdcedfc4724",
    //                 "checked": true
    //             }
    //         ]
    //     },

    $.each(questionbox, function() {
        var options = []
        var $this=$(this);
        var questionType=$this.find(".questionType").val();//问题类型【CHECKBOX、RADIO、TEXT】
        if(questionType=="CHECKBOX"){
            var options={};
            var mid=$this.find(".id").val();
            options.id=mid;
            options.textAnswer="";
            options.optAndAnswer=[];
            var desc=$this.find(".weui-tion-lef");
            $.each(desc,function () {
                console.log(desc);
                var optAndAnswer ={};
                var $desc=$(this)
                optAndAnswer.id=$desc.find(".weui-check").val();
                optAndAnswer.checked=$desc.find(".weui-check").is(":checked");
                options.optAndAnswer.push(optAndAnswer);

                var daan = $this.find("input[type=checkbox]:checked");
                var chk_value =[];
                daan.each(function(){
                    chk_value.push($(this).val());
                });
                if(chk_value==""){
                    $("#ajaxradio").val("false");
                }else{
                    $("#ajaxradio").val("true");
                };

            })
        }
        else if(questionType=="RADIO"){
            var options={};
            var mid=$this.find(".id").val();
            options.id=mid;
            options.textAnswer="";
            options.optAndAnswer=[];
            var desc=$this.find(".weui-tion-lef");
            $.each(desc,function () {
                var optAndAnswer ={};
                var $desc=$(this)
                optAndAnswer.id=$desc.find(".weui-check").val();
                optAndAnswer.checked=$desc.find(".weui-check").is(":checked");
                options.optAndAnswer.push(optAndAnswer);
                var daan = $this.find("input[type=radio]:checked");
                var chk_value =[];
                daan.each(function(){
                    chk_value.push($(this).val());
                });
                if(chk_value==""){
                    $("#ajaxcheck").val("false");
                }else{
                    $("#ajaxcheck").val("true");
                };
            })
        }else if(questionType=="TEXT"){
            var options={};
            var daan = $this.find(".weui-textarea").val();
            var mid=$this.find("#textarea").val();
            if(daan==""){
                $("#ajaxtext").val("false");
            }else{
                $("#ajaxtext").val("true");
            };
            options.textAnswer=daan;
            options.id=mid;
            options.optAndAnswer=[];
        }
        data.options.push(options);
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
    console.log(JSON.stringify(data));
    function ajaxsuit() {
        $.ajax({
            type:"POST",
            url:"/api/v1s1/evaluation/user/createEvaluationPlan?token="+token,//没得
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
                        window.android.jsMethodFollowSubmit(true,data.body);
                        window.android.jsMethodSubmit(true);
                    }
                }else{
                    window.android.jsMethodFollowSubmit(false,"");
                    window.android.jsMethodSubmit(false);
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
    submit();
})