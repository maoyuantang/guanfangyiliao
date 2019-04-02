/**
 * Created by tangyu on 2017/11/15.
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
var tokensd="";
IsReverse(token);
function IsReverse(text){
    var tokens=text.split('').reverse().join('');//获取token并倒置过来
    console.log(tokens);
    tokensd=tokens;
}
console.log(tokensd);
function encodeBase64(mingwen,times){
    var code="";
    var num=1;
    if(typeof times=='undefined'||times==null||times==""){
        num=1;
    }else{
        var vt=times+"";
        num=parseInt(vt);
    }

    if(typeof mingwen=='undefined'||mingwen==null||mingwen==""){

    }else{
        $.base64.utf8encode = true;
        code=mingwen;
        for(var i=0;i<num;i++){
            code=$.base64.btoa(code);
        }
    }
    return code;
}
var estxt=encodeBase64(tokensd);
console.log(estxt);
$.ajax({
    url: "/api/v1s1/article/editArticleApp",//编辑文章不要
    type: "POST ",
    dataType: "json",
    // beforeSend:index,
    beforeSend: function (xhr) {
        xhr.setRequestHeader("token", token);
        xhr.setRequestHeader("Content-Type", 'application/json');
    },
    data:{
        "articleId":id,
        "optType":1
    },
    success: function (data) {

    },
    error: function (data) {

    }
});
//查询随访列表
var index=$.showLoading("正在加载...");
//jQuery实现textarea高度根据内容自适应
$.fn.extend({
    txtaAutoHeight: function () {
        return this.each(function () {
            var $this = $(this);
            if (!$this.attr('initAttrH')) {
                $this.attr('initAttrH', $this.outerHeight());
            }
            setAutoHeight(this).on('input', function () {
                setAutoHeight(this);
            });
        });
        function setAutoHeight(elem) {
            var $obj = $(elem);
            return $obj.css({ height: $obj.attr('initAttrH'), 'overflow-y': 'hidden' }).height(elem.scrollHeight);
        }
    }
});

//调用
$(function () {
    $("#txtaMain").txtaAutoHeight();
});
//查看文章详情
$.ajax({
    url: "/m/v1/api/inquiry/article/getArticleDetails?token="+token+'&articleId='+id,
    type: "GET",
    dataType: "json",
    beforeSend:index,
    beforeSend: function (xhr) {
        // xhr.setRequestHeader("token", token);
        xhr.setRequestHeader("Content-Type", 'application/json');
    },
    // data:{
    //     "articleId":id
    // },
    success: function (data) {
        $.hideLoading();
        if(data.errCode==0) {
            $("#adminFg").show();
            $(".titleimg").show();
            if(data.body.outLinkFg==true){
                window.location.href=data.body.url;
                // var url='请点击：<br/><a href="'+data.body.url+'">'+data.body.url+'</a>'
                // $("#content").html(url);
            }else{
                $(".main").show();
                $("#content").html(data.body.content);
            }

            $("#title").text(data.body.title);
            if(data.body.visible==true){
                $("#discussion").prop("checked",'true');
            }else{

            };
            if(data.body.openComment==true){
                $("#discussionone").prop("checked",'true');
            }else{

            };
            //判断是否有权限
            if(data.body.adminFg==true){
                $("#adminFg").show();
            }else{
                $("#adminFg").hide();
            };
            //是否开放讨论
            if(data.body.openComment==true){
                $("#visible").show();
            }else{
                $("#visible").hide();
            };
        }
    },
    error: function (data) {
        $.hideLoading();
    }
});
function add0(m){return m<10?'0'+m:m }
function format(shijianchuo){
    if (shijianchuo==""||shijianchuo==null||shijianchuo=="null"){
        return "";
    }
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
//获取评论列表
appQueryCommentList();
function  appQueryCommentList() {
    max=10,page=1;
    //进入页面加载
    load(page);
    //滚动加载更多
    var loading = false;  //状态标记
    $(document.body).infinite().on("infinite", function() {
        if(loading) return;
        loading = true;
        setTimeout(function() {
            page=page+1;
            load(page);
            loading = false;
        }, 1000);   //模拟延迟
    });
    //ajax加载数据
    function load(p) {
        $.ajax({
            url: "/m/v1/api/inquiry/article/appQueryCommentList?token="+token,//文章评论列表
            type: "GET",
            dataType: "json",
            beforeSend:index,
            beforeSend: function (xhr) {
                // xhr.setRequestHeader("token", token);
                xhr.setRequestHeader("Content-Type", 'application/json');
            },
            data:{
                "articleId":id,
                "count":(p-1)*max,          //已查询过了多少条
                "pageSize":max       //默认每页加载10条，可自定义
            },
            success: function (data) {
                $.hideLoading();
                $(".weui-loadmore").show();
                if(data.errCode==0) {
                    if(data.body.length<1){
                        $("#nodetails").show();
                        $(".weui-loadmore").html('<div class="weui-loadmore weui-loadmore_line"> <span class="weui-loadmore__tips">暂无更多评论</span> </div>')
                    }else{
                        $("#nodetails").hide();
                        var pahtml='';

                        for (var i=0;i<data.body.length;i++){

                            var userId=data.body[i].userId;
                            var img="/user/api/v2/public/download?downType=Head&secId=" + estxt + "&userId=" + userId + "&layer=00&deType=HD"
                            pahtml+='<div class="weui-row weui-back-fff">'
                                +'<div class="weui-col-30">'
                                +'<div class="weui-media-box__hd">'
                                +'<img class="weui-media-box__thumb weui-img-wi cover" src="'+img+'">'
                                +'</div>'
                                +'</div>'
                                +'<div class="weui-col-70">'
                                +'<h4 class="weui-media-box__title">'
                                +data.body[i].userName
                                +'</h4>'
                                +'<p class="weui-media-boxee">'
                                +data.body[i].content
                                +'</p>'
                                +'<p class="weui-time">'
                                +format(data.body[i].createTime)
                                +'</p>'
                                +'</div>'
                                +'</div>';
                        }
                           $("#appQueryCommentList").append(pahtml)
                        var t_img; // 定时器
                        var isLoad = true; // 控制变量



                        $(".cover").load(function(){
                            console.log("加载完成！");
                        });
                        //判断图片是否加载完成
                        var imgdefereds=[];
                        $('.cover').each(function(){
                            var dfd=$.Deferred();
                            $(this).bind('load',function(){
                                dfd.resolve();
                            }).bind('error',function(){
                                //图片加载错误，加入错误处理
                                // dfd.resolve();
                                console.log('a');
                                $(this).attr('src',"images/a1.png");
                            })
                            if(this.complete) setTimeout(function(){
                                dfd.resolve();
                            },1000);
                            imgdefereds.push(dfd);
                        })
                    }

                }
            },
            error: function (data) {

            }
        });
    }
}


// 、、所有人可见
$("#discussion").click(function () {
    editArticleApp(1)
})
//开放讨论
$("#discussionone").click(function () {
    editArticleApp(2)
    if($('#discussionone').is(':checked')) {
        // do something
        console.log("aa")
        $("#visible").show();
    }else {
        console.log("vvv");
        $("#visible").hide();
    }
})

function editArticleApp(num) {
    $.ajax({
        url: "/api/v1s1/article/editArticleApp",//编辑文章，说是不要
        type: "POST",
        dataType: "json",
        // beforeSend:index,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("token", token);
            xhr.setRequestHeader("Content-Type", 'application/json');
        },
        data:JSON.stringify({
            "articleId":id,
            "optType":num
        }),
        success: function (data) {
            if(data.errCode==0) {
                $.toast("操作成功");
            }
        },
        error: function (data) {

        }
    });
}

$(".weui-ar-btn").click(function () {
    $(".chackTextarea-area").addClass("textT");
    var content=$("#article").val();
    console.log(content);
    if(content==""){
        $.toptip('评论不能为空，请重新输入', 'error');
        return false;
    }else{
        $.ajax({
            url: "/m/v1/api/inquiry/article/submitArticleComment?token="+token,//提交评论
            type: "POST",
            dataType: "json",
            // beforeSend:index,
            beforeSend: function (xhr) {
                // xhr.setRequestHeader("token", token);
                xhr.setRequestHeader("Content-Type", 'application/json');
            },
            data:JSON.stringify({
                "articleId":id,
                "content":content
            }),
            success: function (data) {
                if(data.errCode==0) {
                    var userId=data.body.userId;
                    var pahtml="";
                    var img="/user/api/v2/public/download?downType=Head&secId=" + estxt + "&userId=" + userId + "&layer=00&deType=HD"
                    pahtml+='<div class="weui-row weui-back-fff">'
                        +'<div class="weui-col-30">'
                        +'<div class="weui-media-box__hd">'
                        +'<img class="weui-media-box__thumb weui-img-wi" src="'+img+'">'
                        +'</div>'
                        +'</div>'
                        +'<div class="weui-col-70">'
                        +'<h4 class="weui-media-box__title">'
                        +data.body.userName
                        +'</h4>'
                        +'<p class="weui-media-boxee">'
                        +data.body.content
                        +'</p>'
                        +'<p class="weui-time">'
                        +format(data.body.createTime)
                        +'</p>'
                        +'</div>'
                        +'</div>';
                    $(".wuie-art-list").prepend(pahtml);
                    $("#article").val("");
                    $.toast("评论成功");
                    // window.location.reload();
                    // appQueryCommentList();
                    setTimeout(function () {
                        var t = $('#appQueryCommentList').offset().top;//  获取需要跳转到标签的top值
                        $("html,body").animate({ scrollTop: t}, 500); // 动态跳转到指定位置（数值越大滚动速度越慢）
                    },700)

                }
            },
            error: function (data) {

            }
        });
    }

})


