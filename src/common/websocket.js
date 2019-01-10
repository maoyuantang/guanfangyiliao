import protobuf from "protobufjs";
// import aaa from "../common/reconnecting-websocket.min.js"
const imessage = require('./imessage.json')
let webSocket = null;
//let global_callback = null;
let lockReconnect = false; //避免重复连接
let tt;
let IMessage;
const port = '8080'
let ticket; //票据，登录即可返回
let sequence; //序列号
let content;//消息内容
let serverTime;//服务器时间
let oMsgId;
//初始化websocket
// alert(this.$store.state.token)
function initWebSocket(otoken, ofun) {
    console.log(otoken)
    //封装自定义的消息协议
    // protobuf.load('../common/imessage.json', (error, root) => {
    let root = protobuf.Root.fromJSON(imessage);
    //获取消息协议类型
    IMessage = root.lookupType("IMessage");
    console.log(IMessage)
    //创建Message对象,进行Im登录
    //getCookie('token'),
    let message = loginIM(otoken)
    console.log(message)
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    let buffer = IMessage.encode(message).finish();


    //ws地址
    let wsUrl = 'wss://demo.chuntaoyisheng.com:10002/chat'
    // let wsUrl = 'wss://echo.websocket.org'
    console.log(wsUrl)
    if (!window.webSocket) {

        webSocket = new WebSocket(wsUrl);
        window.webSocket = webSocket
        console.log(window.webSocket)

    }






    webSocket.binaryType = "arraybuffer"
    //接受消息
    webSocket.onmessage = function (e) {

        console.log(IMessage.decode(new Uint8Array(e.data)));
        let odata = IMessage.decode(new Uint8Array(e.data));

        webSocketonmessage(odata);
        //心跳. 



    }
    webSocket.onclose = function (e) {
        webSocketonclose(e);
    }
    webSocket.onopen = function () {
        webSocketonopen(buffer);
    }

    //连接发生错误的回调方法
    webSocket.onerror = function () {
        console.log("WebSocket连接发生错误");
        reconnect(otoken);
    }
    // })


    return webSocket
}


// 实际调用的方法 ,按照协议生辰一个data数据agentData
function sendMessage(agentData) {
    if (webSocket.readyState === webSocket.OPEN) {
        //若是ws开启状态
        websocketsend(agentData)
    } else if (webSocket.readyState === webSocket.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
            sendMessage(agentData, callback);
        }, 1000);
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendMessage(agentData, callback);
        }, 1000);
    }
}


//数据接收
function webSocketonmessage(odata) {
    let RequestType = odata.RequestType;
    if (RequestType == 101 && odata.status.state) {
        console.log('登录成功')
        ticket = odata.ticket;//票据
        sequence = odata.status.sequence;//序列号
        serverTime= odata.status.serverTime;//服务器时间
        oMsgId=odata.status.msgId
        console.log(oMsgId)
        heartCheck.start()
       
    } else if (RequestType == 102) {
        alert('您在其他设备上进行了登录')
    } else if (RequestType == 103) {
        alert('dd')
        let Iessage = {
            RequestType: 105,
            ticket: ticket,
            status: {
                state: true,
                msgId: oMsgId, //客户端上接收到最后一条消息的ID号
                sequence: sequence //客户端上发送最后一条消息的序号
            }
        }
        sendMessage(Iessage);
        return false;
    } else if (RequestType == 0) {//同步  

    } else if (RequestType === 5) {
        let Iessage = {
            RequestType: 105,
            ticket: ticket,
            status: {
                state: true,
                msgId: "", //客户端上接收到最后一条消息的ID号
                sequence: sequence //客户端上发送最后一条消息的序号
            }
        }
        sendMessage(Iessage);
    } if (RequestType == 0) {
        var localTeste = layui.data('sequence').number;
        sequence = localTeste;
        //.同步数据
        $.ajax({
            url: interfaces + "/user/api/v2/public/syncInfo",
            type: "GET",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("token", token);
                xhr.setRequestHeader("Content-Type", 'application/json');
            },
            data: {
                "versionId": layui.data('realName').currMaxVersionId,
                "size": 1
            },
            success: function (data) {
                if (data.code == "OK") {
                    if (data.body.syncData.length > 0) {
                        layui.data('realName', {
                            key: 'currMaxVersionId'
                            , value: data.body.currMaxVersion
                        });
                        if (data.body.syncData[0].command == "SYNC_DOCTOR_LIST") {//医生端拉取医生关联诊室列表
                            try {
                                parent.cliniclist();
                                window.parent.demo("#planMain", "/health/api/v2/index/plan", 1)
                                window.parent.demo("#planWarn", "/health/api/v2/index/alert", 2)
                                window.parent.demo("#planFollow", "/health/api/v2/index/followup", 3)
                                window.parent.demo("#roomList", "/user/api/v2/clinic/clinicInfo", 4)
                                parent.queue_list();
                            } catch (error) {
                                console.log(error);
                            }
                        } else if (data.body.syncData[0].command == "SYNC_DOCTOR_LIST_STATE") {//医生端医生被另一个医生踢了，医生退出诊室
                            var jsonbody = JSON.stringify(data.body.syncData[0].body)
                            var localTest = layui.data('videotype').type;
                            if (localTest == "false") {
                                layer.closeAll();
                                layer.msg('你已经被其他医生踢出诊室', { icon: 5 });
                                parent.quitType = "true";
                                parent.cliniclist();
                            } else {
                                layer.msg('你已经被其他医生踢出诊室', { icon: 5 });
                                parent.quitType = "true";
                                layui.data('videousertype', {
                                    key: 'type'
                                    , value: 'true'
                                });
                                parent.cliniclist();
                                var id = sessionId;
                                parent.seestateTPL(7, "MicroCinic&hangup", layui.data('videouserinfo').id, "", fromNickName, layui.data('videouserinfo').toNickName);
                            }
                        } else if (data.body.syncData[0].command == "SYNC_DOCTOR_SESSION") {//医生端拉取会话列表
                            parent.queue_list();
                        } else if (data.body.syncData[0].command == "SYNC_UPDATE_READ_STATE") {//医生端拉取会话列表
                            parent.pullHistoryMessage()
                        } else if (data.body.syncData[0].command == "SYNC_DOCTOR_LIST_STATE") {//医生端医生被另一个医生踢了，医生退出诊室

                        } else if (data.body.syncData[0].command == "SYNC_BIZ_LIST_UPDATE") {//不区分医生端和用户端，拉取会话列表
                            parent.cliniclist();
                            parent.pullHistoryMessage()
                        } else if (data.body.syncData[0].command == "SYNC_SESSION") {//不区分医生端和用户端，拉取会话列表
                            $.ajax({
                                url: interfaces + "/group/api/v2/session/pullDoctorSessionList",
                                type: "GET",
                                dataType: "json",
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("token", token);
                                    xhr.setRequestHeader("Content-Type", 'application/json');
                                },
                                success: function (data) {
                                    if (data.code == "OK") {
                                        function getCookie(sName) {
                                            var aCookie = document.cookie.split("; ");
                                            for (var i = 0; i < aCookie.length; i++) {
                                                var aCrumb = aCookie[i].split("=");
                                                if (sName == aCrumb[0])
                                                    return decodeURI(aCrumb[1]);
                                            }
                                            return null;
                                        }
                                        var data = data;
                                        var userIdL = [];
                                        var imglists = "";
                                        for (var i = 0; i < data.body.length; i++) {
                                            userSeesion.push(data.body[i].sessionId);
                                            var group = {};
                                            var userNoteName = data.body[i].name;
                                            var friendGroup = "MYGROUP";
                                            var userId = data.body[i].sessionId.replace("#", "M").replace(":", "-");
                                            var userType = "2";
                                            group.currUserLeader = data.body[i].currUserLeader;
                                            group.groupname = userNoteName;
                                            group.friendGroup = friendGroup;
                                            group.userType = userType;
                                            group.username = userNoteName;
                                            group.id = userId;
                                            group.avatar = interfaces + "/user/api/v2/public/download?downType=Head&secId=" + encodeBase64 + "&userId=" + data.body[i].headerImg[0] + "&layer=00&deType=HD"
                                            datas.group.push(group);
                                            /*sName为要取的key名*/


                                        }
                                        for (var k = 0; k < data.body[0].headerImg.length; k++) {
                                            var heimlength = data.body[0].headerImg.length;
                                            if (heimlength == 1) {
                                                imglists = '<img style="width:45px; height:45px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            } else if (heimlength == 2) {
                                                imglists += '<img  class="heimlengthtwo" style="width: 20px; height: 20px; margin-bottom:3px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            } else if (heimlength == 3) {
                                                imglists += '<img  class="heimlengththree" style="width: 20px; height: 20px; margin-bottom:3px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            } else if (heimlength == 4) {
                                                imglists += '<img style="width: 20px; height: 20px; margin-bottom:3px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            } else if (heimlength == 5) {
                                                imglists += '<img  class="heimlengthfive" style="width: 15px; height: 15px; margin-bottom:3px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            } else if (heimlength == 6) {
                                                imglists += '<img  class="heimlengthsex" style="width: 15px; height: 15px; margin-bottom:3px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            } else if (heimlength == 7) {
                                                imglists += '<img  class="heimlengthseven" style="width: 14px; height: 14px; margin-bottom:1px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            } else if (heimlength == 8) {
                                                imglists += '<img  class="heimlengtheight" style="width: 14px; height: 14px; margin-bottom:1px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            } else if (heimlength >= 9) {
                                                imglists += '<img  class="heimlengthnine" style="width: 14px; height: 14px; margin-bottom:1px;" src="' + interfaces + '/user/api/v2/public/download?downType=Head&secId=' + encodeBase64 + '&userId=' + data.body[0].headerImg[k] + '&layer=00&deType=HD">';
                                            }
                                        }
                                        var dates = new Date();
                                        dates.setTime(dates.getTime() + 120 * 600 * 1000);//只能这么写，10表示10秒钟
                                        $.cookie("userIdL", userIdL, { expires: dates, path: "/", domain: "chuntaoyisheng.com" });
                                        // var gruouid=data.body[0].sessionId.replace("#","M").replace(":","-");
                                        var gruouid = "" + data.body[0].sessionId.replace("#", "M").replace(":", "-") + ""
                                        console.log(gruouid);
                                        setTimeout(function () {
                                            var addGroup = {
                                                type: 'group'
                                                , avatar: imglists
                                                , groupname: data.body[0].name
                                                , id: gruouid
                                                , members: 0
                                            };
                                            // layim.addList(addGroup);
                                        }, 1000)

                                    }

                                },
                                error: function (data) {
                                }
                            });
                        } else if (data.body.syncData[0].command == "SYNC_DOCTOR_WEB_STATE") {//不区分医生端和用户端，拉取会话列表
                            var videotypes = layui.data('videotype').type;
                            layer.msg('你已经被其他医生踢出诊室', { icon: 5 });
                            parent.quitType = "true";
                            if (videotypes == "true") {
                                var id = sessionId;
                                parent.seestateTPL(7, "MicroCinic&hangup", layui.data('videouserinfo').id, "", fromNickName, layui.data('videouserinfo').toNickName);
                            } else {
                                setTimeout(function () {
                                    layer.closeAll();
                                }, 2000)
                            }
                        }
                    }
                }
            },
            error: function (data) {

            }
        });
    } else if (RequestType === 6) {//接收到消息处理
        console.log(odata.info.body)
        // var fromL = odata.info.from;
        // if (true) {//判断是不是本人发的消息
        //     let msgId = odata.info.msgId;
        //     let childMessageType = odata.info.childMessageType;
        //     let bodyVideo = odata.info.body;
        //     let fromNickNameL = odata.info.fromNickName;

        //     let toL = odata.info.to;
        //     let toNickNameL = odata.info.toNickName;
        //     let Iessage = {
        //         RequestType: 106,
        //         ticket: ticket,
        //         status: {
        //             state: true,
        //             msgId: msgId, //客户端上接收到最后一条消息的ID号
        //             sequence: sequence //客户端上发送最后一条消息的序号
        //         }
        //     }
        //     sendMessage(Iessage);
        //     let username = odata.info.fromNickName;
        //     let id = odata.info.to.replace("#", "M").replace(":", "-");
        //     // let content = '';
        //     if (childMessageType == 6 || childMessageType == 8) {
        //         if (bodyVideo == "refuse") {//拒绝视频
        //             content = '<div style="color:#F60">拒绝了视频通话</div>';
        //             layer.msg('拒绝了视频通话');
        //         } else if (bodyVideo == "cancle") {
        //             var videosessionid = layui.data('videosessionid').id;
        //             if (videosessionid == fromL) {
        //                 var music = document.getElementById("audioPlay");
        //                 music.pause();
        //                 content = '<div style="color:#fff">取消了视频通话</div>';
        //                 if (count == 0) {
        //                     layer.msg('取消了视频通话');
        //                     $(".closediV").hide();
        //                     $(".vidoefix").remove();
        //                     $(".viedoe").remove();
        //                     setTimeout(function () {
        //                         layer.closeAll(); //疯狂模式，关闭所有层
        //                     }, 500)
        //                 }
        //             }
        //             return false;
        //         } else if (bodyVideo.indexOf("videoing") > -1) {
        //             layer.msg('对方正在视频通话中');
        //             return;
        //         } else if (bodyVideo.indexOf("complete") > -1) {
        //             layui.data('selectRoomStateNw', {
        //                 key: 'sessionId'
        //                 , remove: true
        //             });
        //             layui.data('videoing', {
        //                 key: "videoing"
        //                 , value: "false"
        //             });
        //             content = '<div style="color:#373C38">视频通话已结束</div>';
        //             sessionStorage.setItem("joinroom", "false");//判断进入房间
        //             layer.msg('对方挂断视频');
        //         } else if (bodyVideo.indexOf("MicroCinic&hangup") > -1) {
        //         } else if (bodyVideo.indexOf("accept") > -1) {
        //             count++;
        //             acceptrom = "complete&time="
        //             content = '<div style="color:#373C38">接受了视频聊天</div>';
        //         } else if (bodyVideo.indexOf("sendroom") > -1 || bodyVideo.indexOf("MicroCinicSendRoom") > -1) {
        //             var videoing = layui.data('videoing').videoing;
        //             if (videoing == "true") {
        //                 var room = "";
        //                 var bodyT = 'videoing';
        //                 var childMessageTypeT = 6;
        //                 var sessionId = toL;
        //                 parent.seestateTPL(childMessageTypeT, bodyT, sessionId, room, layui.data('realName').realName, fromNickNameL);
        //                 return false;
        //             }
        //             if (odata.info.body.indexOf("$") > -1) {
        //                 if (odata.info.body.indexOf(userId) > -1) {
        //                     var strAudio = "<audio id='audioPlay' src='./chat_vedio_callin.mp3' hidden='true' loop='true'>";
        //                     if ($("body").find("audio").length <= 0)
        //                         $("body").append(strAudio);
        //                     var audio = document.getElementById("audioPlay");
        //                     //浏览器支持 audion
        //                     audio.play();
        //                     content = '<div class="lay-video">' +
        //                         '<div style="color:#fff;padding-bottom: 10px;">邀请你开视频</div>' +
        //                         '<div class="closediV"><button class="layui-btn layui-btn-danger" layim-event="extend" lay-filter="refusedto">拒绝</button>' +
        //                         '<button class="layui-btn" layim-event="extend" lay-filter="accept" data-typel="two" data-toNickNameL="' + toNickNameL + '" data-toL="' + toL + '" data-fromL="' + fromL + '" data-fromNickNameL="' + fromNickNameL + '" data-room="' + bodyVideo + '" data-type="true">接受</button>' +
        //                         '</div></div>';
        //                     layer.msg(username + '邀请你开视频');
        //                     Notification.requestPermission(function (permission) {
        //                         if (Notification.permission == "granted") {
        //                             var notification = new Notification("" + username + "", {
        //                                 body: '邀请你开视频。。。。',
        //                                 icon: '../../images/gf_logo_app.png'
        //                             });
        //                             notification.onclick = function () {
        //                                 notification.close();
        //                             };
        //                         }
        //                     });
        //                 } else {
        //                     var conferenceId = odata.info.body.split("&")[2].split('$')[0];
        //                     var kName = odata.info.fromNickName;
        //                     content = '<div class="lay-video">' +
        //                         '<div style="color:#F60" data-id="' + conferenceId + '" >发起了视频聊天</div>' +
        //                         '<div class="closediV vidoefix"  id="' + conferenceId + '">' +
        //                         '<div class="viedoe" style="color:#1474A9;padding: 5px;border-bottom: 2px solid #ccc;cursor: pointer;" layim-event="extend" data-conferenceId="' + conferenceId + '" lay-filter="jionRoom"><img src="../../images/v1.png" style="width: 20px;padding-right: 10px;    float: inherit;">正在进行视频会话</div>' +
        //                         '<div class="jinlis" style="display:none"><div class="userImlist">' +
        //                         '<img src="../../images/a1.png"><img src="../../images/a1.png"><img src="../../images/a1.png"><img src="../../images/a1.png">' +
        //                         '</div>' +
        //                         '<button class="layui-btn layui-btn-danger joninRom" layim-event="extend" lay-filter="cancelInto">取消</button>' +
        //                         '<button class="layui-btn joninRom" layim-event="extend" lay-filter="accept" data-typel="one" data-toNickNameL="' + toNickNameL + '" data-toL="' + toL + '" data-fromL="' + fromL + '" data-fromNickNameL="' + fromNickNameL + '" data-room="' + bodyVideo + '" data-type="true">加入</button>' +
        //                         '</div></div>';
        //                     var roomArray = [];
        //                     var roomNum = bodyVideo.split("&")[1];
        //                     var roomSession = toL + "$" + roomNum + "$" + conferenceId;
        //                     try {
        //                         var roomAJosn = JSON.parse(localStorage.getItem('roomSession'));
        //                         for (var i = 0; i < roomAJosn.length; i++) {
        //                             var roomnums = roomAJosn[i];
        //                             if (roomnums.indexOf(toL) > -1) {
        //                                 console.log(roomnums)
        //                                 roomAJosn.remove(roomnums);
        //                             } else {
        //                                 roomArray.push(roomAJosn[i]);
        //                             }
        //                         }
        //                         //  roomArray.push(roomAJosn.toString());
        //                     } catch (e) {

        //                     }
        //                     roomArray.push(roomSession);
        //                     localStorage.setItem('roomSession', JSON.stringify(roomArray))
        //                 }
        //             } else {
        //                 var strAudio = "<audio id='audioPlay' src='./chat_vedio_callin.mp3' hidden='true' loop='true'>";
        //                 if ($("body").find("audio").length <= 0)
        //                     $("body").append(strAudio);
        //                 var audio = document.getElementById("audioPlay");
        //                 //浏览器支持 audion
        //                 audio.play();
        //                 content = '<div class="lay-video">' +
        //                     '<div style="color:#fff;padding-bottom: 10px;">邀请你开视频</div>' +
        //                     '<div class="closediV"><button class="layui-btn layui-btn-danger" layim-event="extend" lay-filter="refusedto">拒绝</button>' +
        //                     '<button class="layui-btn" layim-event="extend" lay-filter="accept" data-typel="two" data-toNickNameL="' + toNickNameL + '" data-toL="' + toL + '" data-fromL="' + fromL + '" data-fromNickNameL="' + fromNickNameL + '" data-room="' + bodyVideo + '" data-type="true">接受</button>' +
        //                     '</div></div>';
        //                 layer.msg(username + '邀请你开视频');
        //                 Notification.requestPermission(function (permission) {
        //                     if (Notification.permission == "granted") {
        //                         var notification = new Notification("" + username + "", {
        //                             body: '邀请你开视频。。。。',
        //                             icon: '../../images/gf_logo_app.png'
        //                         });
        //                         notification.onclick = function () {
        //                             notification.close();
        //                         };
        //                     }
        //                 });
        //             }

        //         }
        //     } else if (childMessageType == 4) {
        //         content = '<div style="color:#F60">该消息为音频消息,请在手机上查看</div>';
        //     } else if (childMessageType == 5) {
        //         content = 'img[/user/api/v2/public/download?downType=Chat&secId=' + encodeBase64 + '&userId=&layer=00&deType=HD&fileId=' + bodyVideo + ']';
        //     } else if (childMessageType == 7) {
        //         var bodyPro = IMessage.decode(new Uint8Array(res.data)).info.body;
        //         var videosessionid = layui.data('videosessionidNow').id;
        //         if (bodyPro == "MicroCinic&hangup" && videosessionid == toL) {
        //             var kicking = layui.data('kicking').kicking;//判断是否踢人
        //             var videotyped = layui.data('videotype').type;
        //             var localTest = layui.data('videousertype').type;
        //             if (parent.quitType == "true") {
        //                 layer.closeAll();
        //                 parent.quitType = "false";
        //             }
        //             if (localTest == "true") {
        //                 parent.leaveConference();
        //             }

        //             if (videotyped == "true") {
        //                 if (kicking == "true") {
        //                     // return;
        //                 }
        //                 parent.leaveConference();
        //             }

        //         }
        //         return false;
        //     } else if (childMessageType == 18) {
        //         var formidls = IMessage.decode(new Uint8Array(res.data)).info.from;
        //         if (formidls != layui.data('realName').id) {
        //             var fromNickName = IMessage.decode(new Uint8Array(res.data)).info.fromNickName;
        //             var bodyPro = JSON.parse(IMessage.decode(new Uint8Array(res.data)).info.body);
        //             var toNickName = IMessage.decode(new Uint8Array(res.data)).info.toNickName;
        //             var phtml;
        //             var fromid = odata.info.to;
        //             content = '<div class="artic">' +
        //                 '<span style="color: #3FDD86">' + fromNickName + "给您发了一份问诊表" +
        //                 '<p class="mingpian"><img src="../../images/q1.png" style="width: 45px;"> ' + bodyPro.title + '</p></span>' +
        //                 '<p class="shouji">请在手机上查看</p>' +
        //                 '</div>'
        //         } else {
        //             return false;
        //         }
        //     } else if (childMessageType == 20) {
        //         var fromNickName = IMessage.decode(new Uint8Array(res.data)).info.fromNickName;
        //         var bodyPro = JSON.parse(IMessage.decode(new Uint8Array(res.data)).info.body);
        //         var toNickName = IMessage.decode(new Uint8Array(res.data)).info.toNickName;
        //         var phtml;
        //         var fromid = odata.info.to;
        //         content = '<div class="artic">' +
        //             '<span style="color: #3FDD86">' + fromNickName + "给您发了一份随访计划" +
        //             '<p class="mingpian"><img src="../../images/q1.png" style="width: 45px;"> ' + bodyPro.title + '</p></span>' +
        //             '<p class="shouji">请在手机上查看</p>' +
        //             '</div>'
        //     } else if (childMessageType == 21) {
        //         var bodyPo = JSON.parse(IMessage.decode(new Uint8Array(res.data)).info.body);
        //         if (bodyPo.notice == "HOSPITAL") {//医院通知
        //             var notification = new Notification("" + bodyPo.title + "", {
        //                 body: bodyPo.body,
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //             parent.pullNoticeList();
        //         } else if (bodyPo.notice == "FOLLOW_UP") {//随访通知,
        //             parent.pullNoticeList();
        //             var notification = new Notification("" + bodyPo.title + "", {
        //                 body: bodyPo.body,
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //             parent.pullNoticeList();
        //         } else if (bodyPo.notice == "COOPERATION") {//协作邀请,
        //             parent.pullNoticeList();
        //             var notification = new Notification("" + bodyPo.title + "", {
        //                 body: bodyPo.body,
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //         } else if (bodyPo.notice == "BIZ_APPOINT") {//业务指派,
        //             parent.pullNoticeList();
        //             var notification = new Notification("" + bodyPo.title + "", {
        //                 body: bodyPo.body,
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //         } else if (bodyPo.notice == "CLINIC") {//新的诊室业务
        //             parent.pullNoticeList();
        //             var notification = new Notification("" + bodyPo.title + "", {
        //                 body: bodyPo.body,
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //         } else if (bodyPo.notice == "FOLLOW_UP_TABLE") {//随访计划表,
        //             parent.pullNoticeList();
        //             var notification = new Notification("" + bodyPo.title + "", {
        //                 body: bodyPo.body,
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //         } else if (bodyPo.notice == "REFUND") {//退款通知
        //             parent.pullNoticeList();
        //             var notification = new Notification("" + bodyPo.title + "", {
        //                 body: bodyPo.body,
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //         } else if (bodyPo.notice == "CRVIDEO") {//视频回拨
        //             parent.pullNoticeList();
        //             var notification = new Notification("" + bodyPo.title + "", {
        //                 body: bodyPo.body,
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //         } else if (bodyPo.notice == "CLINIC_INVITED") {//诊室邀请
        //             var bodyls = JSON.parse(IMessage.decode(new Uint8Array(res.data)).info.body);
        //             var botest = bodyls.body;
        //             var getParams = function (name) {
        //                 var search = botest;
        //                 var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        //                 var matcher = pattern.exec(search);
        //                 var items = null;
        //                 if (null != matcher) {
        //                     try {
        //                         items = decodeURIComponent(decodeURIComponent(matcher[1]));
        //                     } catch (e) {
        //                         try {
        //                             items = decodeURIComponent(matcher[1]);
        //                         } catch (e) {
        //                             items = matcher[1];
        //                         }
        //                     }
        //                 }
        //                 return items;
        //             };
        //             var state = getParams("state");
        //             if (state == "true") {
        //                 // var notification = new Notification("诊室邀请", {
        //                 //     body: IMessage.decode(new Uint8Array(res.data)).info.fromNickName+'邀请您医技协作',
        //                 //     icon: '../../images/gf_logo_app.png'
        //                 // });
        //                 // notification.onclick = function() {
        //                 //     notification.close();
        //                 // };
        //                 layer.open({
        //                     type: 2,
        //                     title: '诊室邀请',
        //                     shadeClose: true,
        //                     shade: 0,
        //                     anim: 6,
        //                     offset: 'rb',
        //                     area: ['280px', '350px'],
        //                     content: './page/components/listbox/invitation.html?' + botest + '&formname=' + IMessage.decode(new Uint8Array(res.data)).info.fromNickName //iframe的url
        //                 });
        //             } else {
        //                 layer.closeAll();
        //             }

        //         }
        //         return false;
        //     } else {
        //         content = odata.info.body;
        //     }
        //     var cid = odata.info.msgId;
        //     var fromid = odata.info.to;
        //     var fromUserid = odata.info.from;
        //     var timestamp = odata.info.clientTime;
        //     var mine = false;
        //     if (fromUserid == userId) {
        //         mine = true;
        //     }
        //     if (userSeesion.indexOf(fromid) > -1) {
        //         var type = 'group';
        //     } else {
        //         var type = 'firend';
        //     }
        //     var resdata = {
        //         username: username //消息来源用户名
        //         , avatar: interfaces + "/user/api/v2/public/download?downType=Head&secId=" + encodeBase64 + "&userId=" + odata.info.from + "&layer=00&deType=HD"
        //         , id: id //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
        //         , type: type //聊天窗口来源类型，从发送消息传递的to里面获取
        //         , content: content //消息内容
        //         , chatType: chatTypeT
        //         , groupId: id //定义唯一的id方便你处理信息
        //         , cid: cid //消息id，可不传。除非你要对消息进行一些操作（如撤回）
        //         , mine: mine //是否我发送的消息，如果为true，则会显示在右方
        //         , fromid: fromid //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
        //         , timestamp: timestamp //服务端时间戳。注意：JS中的时间戳是精确到毫秒，如果你返回的是标准的 unix 时间戳，记得要 *1000
        //     }
        //     var seFromid = odata.info.from;
        //     var seBody = odata.info.body;
        //     var sEsessionId = layui.data('selectRoomState').sessionId;
        //     var sEsessionIdt = layui.data('selectRoomStateT').sessionId;
        //     var childNum = odata.info.childMessageType;

        //     if (odata.info.chatType == 3) {//判断是否是用户发送过来的消息
        //         if (fromid == sEsessionId) {
        //             try {
        //                 parent.onliConert(fromNickNameL, seBody, childNum);
        //             } catch (e) {

        //             }
        //         } else {

        //             try {
        //                 var chatboxsession = layui.data('chatboxsession').id.replace("M", "#").replace("-", ":");
        //                 var selectRoomStateNw = layui.data('selectRoomStateNw').sessionId.replace("M", "#").replace("-", ":");
        //             } catch (e) {

        //             }
        //             if (selectRoomStateNw == odata.info.to) {
        //                 try {
        //                     parent.onliConertp(fromNickNameL, seBody, childNum);
        //                 } catch (e) {

        //                 }
        //             }
        //             if (chatboxsession == odata.info.to) {
        //                 console.log(odata.info.to);
        //                 parent.chatKu(odata.info.body, odata.info.serverTime);
        //             }
        //             var notification = new Notification("" + odata.info.fromNickName + "", {
        //                 body: "我已填好问诊表，请医生查看",
        //                 icon: '../../images/gf_logo_app.png'
        //             });
        //             notification.onclick = function () {
        //                 notification.close();
        //             };
        //             parent.rendcoles(odata.info.to.replace("#", "M").replace(":", "-"))
        //         }
        //     } else {
        //         try {
        //             var selectRoomStateNw = layui.data('selectRoomStateNw').sessionId.replace("M", "#").replace("-", ":");
        //         } catch (e) {

        //         }
        //         if (selectRoomStateNw == odata.info.to) {
        //             try {
        //                 parent.onliConertp(fromNickNameL, seBody, childNum);
        //             } catch (e) {

        //             }
        //         } else {
        //             if (userSeesion.indexOf(fromid) > -1) {
        //                 layim.getMessage(resdata); //res.data即你发送消息传递的数据（阅读：监听发送的消息）
        //                 return false;
        //             }
        //         }
        //     }
        // } else {
        //     //判断当前接受的会话是否在当前列表中
        //     console.log("b");
        //     var msgId = IMessage.decode(new Uint8Array(res.data)).info.msgId;
        //     var Iessage = {
        //         RequestType: 106,
        //         ticket: localTest.ticket,
        //         status: {
        //             state: true,
        //             msgId: msgId, //客户端上接收到最后一条消息的ID号
        //             sequence: layui.data('sequence').number //客户端上发送最后一条消息的序号
        //         }
        //     }
        //     sendMessage(Iessage);
        //     try {
        //         var bodyls = JSON.parse(IMessage.decode(new Uint8Array(res.data)).info.body);
        //         var botest = bodyls.body;
        //         var bodyPo = JSON.parse(IMessage.decode(new Uint8Array(res.data)).info.body);
        //         var childMessageType = IMessage.decode(new Uint8Array(res.data)).info.childMessageType;
        //         if (childMessageType == 21) {
        //             // var notification = new Notification(""+bodyPo.title+"", {
        //             //     body: bodyPo.body,
        //             //     icon: '../../images/gf_logo_app.png'
        //             // });
        //             // notification.onclick = function() {
        //             //     notification.close();
        //             // };
        //             parent.pullNoticeList();
        //         }

        //     } catch (e) {

        //     }
        //     var getParams = function (name) {
        //         var search = botest;
        //         var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        //         var matcher = pattern.exec(search);
        //         var items = null;
        //         if (null != matcher) {
        //             try {
        //                 items = decodeURIComponent(decodeURIComponent(matcher[1]));
        //             } catch (e) {
        //                 try {
        //                     items = decodeURIComponent(matcher[1]);
        //                 } catch (e) {
        //                     items = matcher[1];
        //                 }
        //             }
        //         }
        //         return items;
        //     };
        //     var state = getParams("state");
        //     if (state == "true") {
        //         parent.invitation++;
        //         // var notification = new Notification("诊室邀请", {
        //         //     body: IMessage.decode(new Uint8Array(res.data)).info.fromNickName+'邀请您医技协作',
        //         //     icon: '../../images/gf_logo_app.png'
        //         // });
        //         // notification.onclick = function() {
        //         //     notification.close();
        //         // };
        //         if (parent.invitation == 1) {
        //             layer.open({
        //                 type: 2,
        //                 title: '诊室邀请',
        //                 shadeClose: true,
        //                 shade: 0,
        //                 anim: 6,
        //                 offset: 'rb',
        //                 area: ['280px', '350px'],
        //                 content: './page/components/listbox/invitation.html?' + botest + '&formname=' + IMessage.decode(new Uint8Array(res.data)).info.fromNickName, //iframe的url
        //                 cancel: function (index, layero) {
        //                     parent.invitation = "";
        //                 }
        //             });
        //         }
        //     } else if (state == "false") {
        //         parent.invitation = "";
        //         layer.closeAll();
        //     }
        // }

    }
    //global_callback(e.data, IMessage)
    //将接收到的数据进行处理
    // let data = IMessage.decode(new Uint8Array(e.data));
    // //将接收到的数据进行处理
    // console.dir('客户端接收到消息:====>' + data);
    // let RequestType = IMessage.decode(new Uint8Array(e.data)).RequestType;

    // if (RequestType === 101 || RequestType === 104) {
    //     sequence = IMessage.decode(new Uint8Array(e.data)).status.sequence;
    //     if (RequestType === 101) {
    //         ticket = IMessage.decode(new Uint8Array(e.data)).ticket;
    //     }
    // } else {
    //     //需要处理的消息
    //     //把接收到的数据暴露出去
    //     //acceptMessageData(data)
    //     console.log("接收到的数据:" + data)
    // }
    //将所有的数据交给外部进行处理,当连接成功够进行回调调用
}
//数据接收到的内容传送
//数据发送
function websocketsend(data) {


    //websock.send(JSON.stringify(agentData));
    // let Message = {
    //     RequestType: 4,
    //     ticket: ticket,
    //     info: {
    //         messageType: 0, //消息
    //         childMessageType: data.childMessageType, //文本
    //         from: data.from, //userid
    //         fromNickName: data.fromNickName, //昵称
    //         toNickName: data.toNickName,
    //         to: data.to, //发给谁，接收者的用户ID
    //         body: data.body, //消息内容
    //         sequence: sequence, //消息发送序号。
    //         chatType: 2, //单聊  GROUP 群聊
    //         clientTime: '',
    //         serverTime: "",
    //         conferenceId: data.conferenceId
    //     }
    // }


    let msg = IMessage.encode(data).finish();
    webSocket.send(msg);
}

//关闭
function webSocketonclose(e) {
    console.log("connection closed (" + e.code + ")");
    reconnect();
}

function webSocketonopen(buffer) {
    if (webSocket.readyState === 1) {
        console.log("连接成功");

        webSocket.send(buffer);
    } else {
        console.log("链接状态" + webSocket.readyState);
    }

    //发送心跳  进行保持长连接 /心跳检测重置
    heartCheck.start();
}
//心跳检测
let heartCheck = {
    timeout: 20000,
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function () {
        // console.log('heart');
        let self = this;
        let data = {
            'RequestType': 3,
            'ticket': ticket
        };
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            let buffer = IMessage.encode(data).finish();
            webSocket.send(buffer); //心跳的内容需要根据实际情况进行自己定义
            console.log('send-heart', data);
        }, this.timeout)
    }
}




//重新连接IM
function reconnect(otoken) {

    console.log(otoken)
    if (lockReconnect) {
        return;
    };
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    tt && clearTimeout(tt);
    tt = setTimeout(function () {
        //每4s中进行一次连接IM
        initWebSocket(otoken);
        lockReconnect = false;
    }, 4000);
}

function loginIM(token) {
    console.log(token)
    var odata = new Date()
    console.log(odata.getTime())
    //消息类型按照这样传递
    let message = IMessage.create({
        RequestType: 1,
        login: {
            token: token,
            timestamp: odata.getTime(),
            systemType: 'WEB',
            deviceType: 'WEB'
        }
    });
    return message
}

//客户端接收到的数据,暴露给外面使用
function getContent(){
    return content;
}
function getTicket(){
    return ticket;
}
function getServerTime(){
    return serverTime;
}
function getSequence(){
    return sequence;
}
function getMsgId(){
    return oMsgId;
}
console.log(getSequence())


export default { sendMessage, initWebSocket,getContent,getTicket,getServerTime,getSequence,getMsgId }