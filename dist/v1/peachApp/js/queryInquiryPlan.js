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
var isUser=getParam('isUser');
console.log(id)

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
//不同场景的生成问诊计划
// generateInquiryPlan();
// function generateInquiryPlan() {
//     $.ajax({
//         url: "/api/v1s1/inquiry/doctor/generateInquiryPlan",
//         type: "POST",
//         dataType: "json",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("token", token);
//             xhr.setRequestHeader("Content-Type", 'application/json');
//         },
//         data:JSON.stringify({
//             "id":id,
//             // "userIds":['59a0d8cccaccbc7abe8c684f']
//         }),
//         success: function (data) {
//             // ios(generateInquiryPlan,data.body);
//             console.log(data.body);
//             return data.body;
//         },
//         error: function (data) {
//         }
//     })
// }
//.查看问诊计划详情
// var index=$.showLoading();
$.ajax({
    url: "/m/v1/api/inquiry/inquiryPlan/queryInquiryPlan?token="+token,
    type: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Content-Type", 'application/json');
    },
    data:{
        planId:id
    },
    success: function (data) {
        if(data.errCode==0) {
            if(data.body.planState=="OK"){
                $(".submited").hide();
            }else{
                if(isUser=="false"){
                    $(".submited").hide();
                }else{
                    $(".submited").show();
                }
            }
           
            $("#title").text(data.body.title);
            $("#numtext").text(data.body.count)
            var pathml = "";
            var data = data.body.solutionDtos;
            for (var i = 0; i < data.length; i++) {
                if (data[i].questionType == "TEXT") {
                    pathml+='<div class="weui-cells weui-cells_form weui-margin-0">' +
                        '<input type="hidden" class="questionType" value="'+data[i].questionType+'">' +
                        '<input type="hidden" class="id nowid" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                        +'<div class="weui-cell">'
                        +'<div class="weui-cell__bd"><input type="hidden" id="textarea" value="'+data[i].id+'">';
                    if(data[i].text==""){
                        pathml+='<textarea class="weui-textarea " placeholder="请输入你所知道的答案" rows="3" id="text'+[i+1]+'" form="usrform">'
                        +data[i].text
                        +'</textarea>';
                    }else if(data[i].text!=""){
                        pathml+='<p class="weui-textarea weuitext" placeholder="请输入你所知道的答案" rows="3" id="text'+[i+1]+'" form="usrform">'
                            +data[i].text
                            +'</p>';
                    }


                    pathml+='</div>'
                        +'</div>'
                        +'</div>';
                } else if (data[i].questionType == "CHECKBOX") {
                    pathml+='<div class="weui-cells weui-cells_checkbox weui-margin-0"><input type="hidden" class="questionType" value="'+data[i].questionType+'"><input type="hidden" class="id" value="'+data[i].id+'">'
                        +'<div class="weui-cells__title"><i class="weui-detail-icon">'+[i+1]+'</i>'
                        +'<span class="titleNmu">'+(data[i].title)+'</span>'
                        +'</div>'
                    var solutionModels = data[i].solutionAsDtos;
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
                    var solutionModels = data[i].solutionAsDtos;
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
                            pathml+='<div class="weui-cell__ft">';
                             pathml +='<input type="radio" class="weui-check" name="radio1'+i+'" value="'+solutionModels[j].id+'" id="a1'+i + j +'" '+aaaa+'>'
                            pathml+='<span class="weui-icon-checked weui-in-check weui-icon-font-size"></span>'
                            +'</div>'

                        pathml+='</label>';
                    }
                    pathml += '</div>';

                }
            }
            $("#questionbox").html(pathml);
        }else{
            $.alert(data.message);
        }
    },
    error: function (data) {

    }
});


$(document).ready(function(){
    $(".submit").on("click",function () {
        var survey=$("#survey-wrap").text();
        var questions = $("#questionbox > div");
        console.log(questions.length);
        var title=$("#title").text();//问诊模板标题
        var createTime='2017-11-08'
        var data={
            "title": title,                //问诊模板标题
            "createTime":createTime,     //创建时间
            "count": 2,                                         //评估题量
            "options": []
        };
        $.each(questions, function () {
            var $question = $(this);
            var desc=$question.find(".weui-cell");
            var questionType=$question.find(".questionType").val();//类型
            console.log(questionType);
            var options = {};
            options.id=$question.find(".id").val();//获取id
            options.title=$question.find(".titleNmu").text();//获取id
            options.questionType=$question.find(".questionType").val();//获取id
            options.optAndAnswer = [];
            if(questionType=="CHECKBOX" || questionType=="RADIO"){
                $.each(desc,function () {
                    var optAndAnswer ={};
                    var $desc=$(this)
                    ID=$desc.find(".sortID").val();
                    var sortID=$desc.find(".sortNumId").val();
                    desc=$desc.find(".desc").text();
                    optAndAnswer.id = ID;
                    optAndAnswer.sortId = $desc.find(".sortNumId").val();
                    optAndAnswer.tag = $desc.find(".tag").text();
                    optAndAnswer.desc = desc;
                    optAndAnswer.
                    options.optAndAnswer.push(optAndAnswer);
                })
            }
            data.options.push(options);
        });
        // var token="923d7990f0874e499eaf3466df13ab47";
        $.ajax({
            type:"POST",
            url:"/api/v1s1/inquiry/doctor/createInquiry",//不要了
            dataType:"json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("token", token);
                xhr.setRequestHeader("content-Type", "application/json");
            },
            data:JSON.stringify(data),
            success:function (data) {

            },
            error:function (error) {

            }
        })
    })
})


function  submit() {
    var textarea=$(".weui-textarea").val();
    console.log(textarea);
    var d = {};
    var t = $('form').serializeArray();
    var t1 = $('form').serialize();
    console.log(t);
    console.log(t1);

    var planId=id;
    data={
        "planId":planId,
        "basicInfoMap":[]
    };
    var questionbox=$(".weui-cells");
    console.log(questionbox);

    // {
    //     "planId":"59fae41f6fd21bbbb41bbdd6",                //问诊计划ID
    //     "basicInfoMap" : [                                  //问题项
    //     {
    //         "mid" : "59fad11e1655d7df2cd5521c",         //对应问题ID
    //         "text" : "",                                //文本的答案
    //         "items" : [                                 //选中的选项对应的ID
    //             "f5ddba7128834e87b0ec1b9e5bef86ab",
    //             "944ccb02d6464153a779ce29e4d74db2"
    //         ]
    //     },
    //     {
    //         "mid" : "59fad11e1655d7df2cd5521b",
    //         "text" : "卧槽",
    //         "items" : []
    //     },
    //     {
    //         "mid" : "59fad11e1655d7df2cd5521d",
    //         "text" : "卧槽",
    //         "items" : [
    //             "0988ff9c50ba4f839b4e3901244ea011"
    //         ]
    //     }
    // ]
    // }
    console.log(data.planId.basicInfoMap);
    var checkeck=[];
    var radioT=[];
    var danleng=questionbox.siblings(".weui-cells_radio").length;//获取radio总的数量
    console.log("--------"+danleng);
    var checkboxdaan = questionbox.find("input[type=checkbox]:checked");
    console.log(checkboxdaan.length);
    $.each(questionbox, function() {
        var $this=$(this);
        var basicInfoMap={};
        var desc=$this.find(".weui-tion-lef");
        var questionType=$this.find(".questionType").val();//问题类型【CHECKBOX、RADIO、TEXT】
        basicInfoMap.items=[];
        if(questionType=="CHECKBOX"){
            basicInfoMap.text=$this.find(".titleNmu").text();
            var mid=$this.find(".id").val();
            basicInfoMap.mid=mid;
            var daan = $this.find("input[type=checkbox]:checked");
            console.log(daan);
            var daan1 = $this.find("input[type=radio]:checked");
            var chk_value =[];
            daan.each(function(){
                console.log($(this).val());
                chk_value.push($(this).val());
                checkeck.push($(this).val());
                console.log(checkeck.length);
            });
            daan1.each(function(){
                chk_value.push($(this).val());
            });
            if(chk_value==""){
                $("#ajaxcheck").val("false");
            }else{
                $("#ajaxcheck").val("true");
            };
            basicInfoMap.items=chk_value;
        }else if(questionType=="RADIO"){
            basicInfoMap.text=$this.find(".titleNmu").text();
            var daan = $this.find("input[type=radio]:checked");
            var chk_value =[];
            daan.each(function(){
                chk_value.push($(this).val());
                radioT.push($(this).val());

            });
            console.log(chk_value);
            if(chk_value==""){
                $("#ajaxradio").val("false");
            }else{
                $("#ajaxradio").val("true");
            };
            var mid=$this.find(".id").val();
            basicInfoMap.mid=mid;
            basicInfoMap.items=chk_value;
        }else if(questionType=="TEXT"){
            var daan = $this.find(".weui-textarea").val();
            console.log(daan);

            var mid=$this.find("#textarea").val();
            console.log(mid);
            basicInfoMap.text=daan;
            basicInfoMap.mid=mid;
            basicInfoMap.items=[daan];
        }

        data.basicInfoMap.push(basicInfoMap);
    });
    console.log(radioT.length)
    var raleg=radioT.length;//判断选中radio的数量
    $('form').on('submit', function() {
        var title = $('inpur[name=title]').val(),
            content = $('textarea').val();
    })
    var ajaxradio=$("#ajaxradio").val();
    var ajaxcheck=$("#ajaxcheck").val();
    for(var i=0;i<data.basicInfoMap.length;i++){
        console.log(data.basicInfoMap[i].items);
        if(data.basicInfoMap[i].items==""){
            console.log("a");
            $.alert("请将题做完在提交");
            return false;
        }
    }
    ajaxsuit();
    function ajaxsuit() {
        $.ajax({
            type:"POST",
            url:"/m/v1/api/inquiry/inquiryPlan/handleInquiryPlan?token="+token,
            dataType:"json",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("content-Type", "application/json");
            },
            data:JSON.stringify(data),
            success:function (data) {
                if(data.errCode==0) {
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
                        window.webkit.messageHandlers.submit.postMessage(data.code);
                    } else if (navigator.userAgent.match(/android/i)) {
                        window.android.jsMethodSubmit(true);
                    }
                }else{
                    $.alert(data.message);
                    window.android.jsMethodSubmit(false);
                }
            },
            error:function (error) {
                $.alert("操作失败");
                window.android.jsMethodSubmit(false);
            }
        })
    }

}
$('.submited').on('click', function() {
    submit();
})