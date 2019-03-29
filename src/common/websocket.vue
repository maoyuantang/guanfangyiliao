<template>
    <div>
        <!-- <el-dialog title="提示" :visible.sync="receiveVideoVisable" width="30%" :before-close="handleClose">
            <div>
                <button @click="receiveVideo()">接收</button>
                <button @click="refuseVideo()">拒绝</button>
            </div>
        </el-dialog> -->
        <div v-if='receiveVideoVisable'>
            <el-dialog title="提示" :visible.sync="receiveVideoVisable" width="30%" :before-close="handleClose" :showClose="VideoshowClose">
                <div>
                    <h4>{{startVideoName}}邀请你视频</h4>
                    <div>
                        <button @click="receiveVideo()">接收</button>
                        <button @click="refuseVideo()">拒绝</button>
                    </div>
                </div>
            </el-dialog>
        </div>

        <!-- 视频聊天 -->
        <div v-if="VideoVisable">
            <el-dialog class='videoClassBox' title="视频" :visible.sync="VideoVisable" center append-to-body fullscreen @close="closeVideo()" :showClose="VideoshowClose">
                <ovideo :createVideoRoomData="createVideoRoomData" @reback="videoclick" :sessionId1="sessionId" :doctorVis="doctorVis"></ovideo>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import ovideo from "../video/oVideo.vue";
import apiBaseURL from "../enums/apiBaseURL.js";
import { mapState } from "vuex";
import protobuf from "protobufjs";
import {
    storageUsers,
    fetchSyncInfo,
    userInfo,
    fetchChatSession
} from "../api/apiAll.js";

export default {
    components: {
        ovideo
    },
    name: "steps",
    props: ["inData"],
    computed: {},
    data() {
        return {
            doctorVis: 0,
            VideoshowClose: false,
            startVideoName: "",
            receiveVideoVisable: false,
            VideoVisable: false,
            webSocket: null,
            //let global_callback = null;
            lockReconnect: false, //避免重复连接
            tt: "",
            imessage: "",
            IMessage: "",
            port: "8080",
            ticket: "", //票据，登录即可返回
            sequence: "", //序列号
            content: "", //消息内容
            serverTime: "", //服务器时间
            oMsgId: "",
            content: "",
            heartCheck: {},
            createVideoRoomData: {},
            sessionId: ""
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        })
    },
    async created() {
        let self = this;
        this.imessage = require("./imessage.json");
        //心跳检测
        this.heartCheck = {
            timeout: 20000,
            timeoutObj: null,
            serverTimeoutObj: null,
            start: function() {
                // console.log('heart');
                // let self = this;
                let data = {
                    RequestType: 3,
                    ticket: self.$store.state.socket.messageTicket.ticket
                };
                this.timeoutObj && clearTimeout(this.timeoutObj);
                this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
                this.timeoutObj = setTimeout(function() {
                    //这里发送一个心跳，后端收到后，返回一个心跳消息，
                    console.log(self);
                    let buffer = self.$store.state.socket.IMessage.encode(
                        data
                    ).finish();
                    self.$store.state.socket.socketObj.send(buffer); //心跳的内容需要根据实际情况进行自己定义
                    // console.log('send-heart', data);
                }, this.timeout);
            }
        };
        // this.getMessageTicket();
    },
    methods: {
        videoclick(data) {
            this.VideoVisable = false;
        },
        receiveVideo() {
            this.closeVideoOr("ON");
            this.sendMessageChat("6", "accept");
            this.$store.commit("socket/IFVIDEOIMG", 1);
            this.receiveVideoVisable = false;
        },
        refuseVideo() {
            this.receiveVideoVisable = false;
            this.sendMessageChat(6, "refuse");
        },
        handleClose() {},
        closeVideo() {
            this.closeVideoOr("OFF");
        },
        // 拉取同步消息接口
        async pullSynchro() {
            let _this = this;
            let query = {
                token: this.userState.token,
                versionId: this.userSelfInfo.currMaxVersion,
                pageNums: 10
            };
            const res = await fetchSyncInfo(query);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                let oUserSelfInfo = this.userSelfInfo;
                oUserSelfInfo.currMaxVersion = res.data.body.currMaxVersion;
                this.$store.commit("user/SETUSERSELFINFO", oUserSelfInfo);
                this.$store.commit("socket/SYNCHROIMESSAGE", res.data.body);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取用户信息
        async getUserInfo() {
            const options = {
                token: this.userState.token,
                oneself: true
            };
            let res = await userInfo(options);
            if (res.data.errCode === 0) {
                //登录成功
                this.$store.commit("user/SETUSERSELFINFO", res.data.body);
                sessionStorage.setItem(
                    "userSelfInfo",
                    JSON.stringify(res.data.body)
                ); //将用户个人信息写入缓存
            } else {
                this.$message({
                    showClose: true,
                    message: res.errMsg,
                    type: "error"
                });
            }
            this.$router.push({ path: "/" });
        },
        // 进入或退出视频
        async closeVideoOr(oState) {
            alert("dd");
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                conferenceId: this.createVideoRoomData.conferenceId,
                state: oState
            };
            const res = await storageUsers(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                if (oState == "ON") {
                    _this.VideoVisable = true;
                } else {
                    this.$notify.success({
                        title: "成功",
                        message: "退出成功！"
                    });
                    _this.VideoVisable = false;
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        initWebSocket(otoken) {
            //封装自定义的消息协议
            // protobuf.load('../common/imessage.json', (error, root) => {
            let root = protobuf.Root.fromJSON(this.imessage);
            //获取消息协议类型
            // this.IMessage = root.lookupType("IMessage");
            let oImssage = root.lookupType("IMessage");
            this.$store.commit("socket/IMESSAGE", oImssage);
            //创建Message对象,进行Im登录
            let message = this.loginIM(otoken);
            // Encode a message to an Uint8Array (browser) or Buffer (node)
            let buffer = this.$store.state.socket.IMessage.encode(
                message
            ).finish();

            //ws地址
            let wsUrl = "wss://demo.chuntaoyisheng.com:10002/chat"; //测试
            // let wsUrl = "wss://demo.chuntaoyisheng.com:10002/chat";//开发

            if (!window.webSocket) {
                let owebsocket = new WebSocket(wsUrl);
                this.$store.commit("socket/SETSOCKET", owebsocket);

                // this.webSocket = new WebSocket(wsUrl);
                // window.webSocket = this.webSocket;
            }

            this.$store.state.socket.socketObj.binaryType = "arraybuffer";
            //接受消息
            this.$store.state.socket.socketObj.onmessage = e => {
                console.log("dd");

                let odata = this.$store.state.socket.IMessage.decode(
                    new Uint8Array(e.data)
                );
                this.webSocketonmessage(odata);
                //心跳.
            };
            this.$store.state.socket.socketObj.onclose = e => {
                this.webSocketonclose(e);
            };
            this.$store.state.socket.socketObj.onopen = e => {
                this.webSocketonopen(buffer);
            };

            //连接发生错误的回调方法
            this.$store.state.socket.socketObj.onerror = e => {
                console.log("WebSocket连接发生错误");
                this.reconnect(otoken);
            };
            // })

            return this.$store.state.socket.socketObj;
        },
        // 实际调用的方法 ,按照协议生辰一个data数据agentData
        // sendMessage(agentData) {
        //     if (
        //         this.$store.state.socket.socketObj.readyState ===
        //         this.$store.state.socket.socketObj.OPEN
        //     ) {
        //         //若是ws开启状态
        //         this.websocketsend(agentData);
        //     } else if (
        //         this.$store.state.socket.socketObj.readyState ===
        //         this.$store.state.socket.socketObj.CONNECTING
        //     ) {
        //         // 若是 正在开启状态，则等待1s后重新调用
        //         let _this = this;
        //         setTimeout(function() {
        //             _this.sendMessage(agentData);
        //         }, 1000);
        //     } else {
        //         // 若未开启 ，则等待1s后重新调用
        //         let _this = this;
        //         setTimeout(function() {
        //             _this.sendMessage(agentData);
        //         }, 1000);
        //     }
        // },
        //发送
        sendMessageChat(childMessageType, messageBody) {
            let odate = new Date();
            let oHour = odate.getHours();
            let oMinite = odate.getMinutes();
            if (oHour <= 9) {
                oHour = "0" + oHour;
            }
            if (oMinite <= 9) {
                oMinite = "0" + oMinite;
            }

            let timestamp = Date.parse(new Date());
            console.log(this.userSelfInfo);
            let Iessage = {
                RequestType: 4,
                ticket: this.$store.state.socket.messageTicket.ticket,
                info: {
                    messageType: 0, //消息
                    childMessageType: childMessageType, //文本
                    from: this.userSelfInfo.userId, //userid
                    fromNickName: this.userSelfInfo.name, //昵称
                    toNickName: "",
                    to: this.sessionId, //发给谁，接收者的用户ID
                    body: messageBody, //消息内容
                    sequence: this.$store.state.socket.messageTicket.sequence, //消息发送序号。
                    chatType: 2, //医生端标识
                    clientTime: timestamp,
                    serverTime: this.$store.state.socket.messageTicket
                        .serverTime
                }
            };
            console.log(Iessage);
            if (messageBody) {
                this.sendMessage(Iessage);
            } else {
                alert("消息不能为空");
            }

            // let aaa=websocket.dadaTransfer
        },
        sendMessage(agentData) {
            if (
                this.$store.state.socket.socketObj.readyState ===
                this.$store.state.socket.socketObj.OPEN
            ) {
                //若是ws开启状态
                this.websocketsend(agentData);
            } else if (
                this.$store.state.socket.socketObj.readyState ===
                this.$store.state.socket.socketObj.CONNECTING
            ) {
                // 若是 正在开启状态，则等待1s后重新调用
                let _this = this;
                setTimeout(function() {
                    _this.sendMessage(agentData);
                }, 1000);
            } else {
                // 若未开启 ，则等待1s后重新调用
                let _this = this;
                setTimeout(function() {
                    _this.sendMessage(agentData);
                }, 1000);
            }
        },
        // 数据发送
        websocketsend(data) {
            console.log("下方发消息");
            console.log(data);
            let msg = this.$store.state.socket.IMessage.encode(data).finish();

            this.$store.state.socket.socketObj.send(msg);
        },
        // 数据接收
        webSocketonmessage(odata) {
            console.log("下方收消息");
            console.log(odata);
            let RequestType = odata.RequestType;
            if (RequestType == 101) {
                console.log("登录成功");
                let oMessageTicket = {
                    ticket: odata.ticket, //票据，登录即可返回
                    sequence: odata.status.sequence, //序列号
                    content: "", //消息内容
                    serverTime: odata.status.serverTime, //服务器时间
                    oMsgId: odata.status.msgId
                };
                this.$store.commit("socket/MESSAGETICKET", oMessageTicket);
                this.heartCheck.start();
            } else if (RequestType == 104) {
                console.log(odata.status.message);
                if (odata.status.message == "发送成功") {
                    let oMessageTicket = {
                        ticket: odata.ticket, //票据，登录即可返回
                        sequence: odata.status.sequence, //序列号
                        content: "", //消息内容
                        serverTime: odata.status.serverTime, //服务器时间
                        oMsgId: odata.status.msgId
                    };
                    this.$store.commit("socket/MESSAGETICKET", oMessageTicket);
                }

                this.heartCheck.start();
            } else if (RequestType == 102) {
                alert("您在其他设备上进行了登录");
                this.$store.commit("user/CLEARUSERINFO");
                this.$store.commit("user/CLAERUSERSELFINFO");
                sessionStorage.clear();
                this.$store.state.socket.socketObj.close();
                this.$router.replace({
                    path: "/login"
                });
            } else if (RequestType == 103) {
                let Iessage = {
                    RequestType: 105,
                    ticket: this.$store.state.socket.messageTicket.ticket,
                    status: {
                        state: true,
                        msgId: this.$store.state.socket.messageTicket.oMsgId, //客户端上接收到最后一条消息的ID号
                        sequence: this.$store.state.socket.messageTicket
                            .sequence //客户端上发送最后一条消息的序号
                    }
                };
                this.sendMessage(Iessage);
                return false;
            } else if (RequestType == 5) {
                let Iessage = {
                    RequestType: 105,
                    ticket: this.$store.state.socket.messageTicket.ticket,
                    status: {
                        state: true,
                        msgId: this.$store.state.socket.messageTicket.oMsgId, //客户端上接收到最后一条消息的ID号
                        sequence: this.$store.state.socket.messageTicket
                            .sequence //客户端上发送最后一条消息的序号
                    }
                };
                this.sendMessage(Iessage);
                return false;
            } else if (RequestType == 0) {
                //同步
                this.pullSynchro();
                return false;
            } else if (RequestType == 6) {
                this.sessionId = odata.info.to;
                console.log(odata.info.body);
                let fromL = odata.info.from;
                if (fromL != this.userSelfInfo.userId) {
                    //判断不是本人发的消息
                    let msgId = odata.info.msgId;
                    let childMessageType = odata.info.childMessageType;
                    let bodyVideo = odata.info.body;
                    let fromNickNameL = odata.info.fromNickName;

                    let toL = odata.info.to;
                    let toNickNameL = odata.info.toNickName;
                    let Iessage = {
                        RequestType: 106,
                        ticket: this.$store.state.socket.messageTicket.ticket,
                        status: {
                            state: true,
                            msgId: msgId //客户端上接收到最后一条消息的ID号
                        }
                    };
                    this.sendMessage(Iessage);

                    this.$store.commit("socket/MSGBOX", odata);
                    let _this = this;

                    console.log(
                        odata.info.body + "和" + odata.info.body.split("&")[1]
                    );

                    let username = odata.info.fromNickName;
                    let id = odata.info.to.replace("#", "M").replace(":", "-");
                    let content = "";
                    if (childMessageType == 6 || childMessageType == 8) {
                        if (bodyVideo == "refuse") {
                            //拒绝视频
                            // content =
                            //     '<div style="color:#F60">拒绝了视频通话</div>';
                            // layer.msg("拒绝了视频通话");
                        } else if (bodyVideo == "cancle") {
                            _this.receiveVideoVisable = false;
                            // var videosessionid = layui.data("videosessionid")
                            //     .id;
                            // if (videosessionid == fromL) {
                            //     var music = document.getElementById(
                            //         "audioPlay"
                            //     );
                            //     music.pause();
                            //     content =
                            //         '<div style="color:#fff">取消了视频通话</div>';
                            //     if (count == 0) {
                            //         layer.msg("取消了视频通话");
                            //         $(".closediV").hide();
                            //         $(".vidoefix").remove();
                            //         $(".viedoe").remove();
                            //         setTimeout(function() {
                            //             layer.closeAll(); //疯狂模式，关闭所有层
                            //         }, 500);
                            //     }
                            // }
                            return false;
                        } else if (bodyVideo.indexOf("videoing") > -1) {
                            // layer.msg("对方正在视频通话中");
                            return;
                        } else if (bodyVideo.indexOf("complete") > -1) {
                            // layui.data("selectRoomStateNw", {
                            //     key: "sessionId",
                            //     remove: true
                            // });
                            // layui.data("videoing", {
                            //     key: "videoing",
                            //     value: "false"
                            // });
                            // content =
                            //     '<div style="color:#373C38">视频通话已结束</div>';
                            // sessionStorage.setItem("joinroom", "false"); //判断进入房间
                            // layer.msg("对方挂断视频");
                        } else if (
                            bodyVideo.indexOf("MicroCinic&hangup") > -1
                        ) {
                        } else if (bodyVideo.indexOf("accept") > -1) {
                            // count++;
                            // acceptrom = "complete&time=";
                            // content =
                            //     '<div style="color:#373C38">接受了视频聊天</div>';
                        } else if (
                            bodyVideo.indexOf("sendroom") > -1 ||
                            bodyVideo.indexOf("MicroCinicSendRoom") > -1
                        ) {
                            console.log("收到了邀请视频");
                            if (
                                odata.info.body.split("&")[3] ==
                                this.userSelfInfo.userId
                            ) {
                                _this.receiveVideoVisable = true;
                                console.log("是本人收到了邀请视频");
                                _this.startVideoName = odata.info.fromNickName;

                                _this.createVideoRoomData = {
                                    conferenceId: odata.info.body.split("&")[2],
                                    conferenceNumber: odata.info.body.split(
                                        "&"
                                    )[1]
                                };

                                // this.$notify({
                                //     title: "请注意",
                                //     message: "您有一条视频消息请点开查看！",
                                //     position: "bottom-right",
                                //     duration: 0,
                                //     showClose: oshowClose,
                                //     onClick() {
                                //         _this.receiveVideoVisable = true;
                                //     },
                                //     onClose() {}
                                // });
                            }

                            // var videoing = layui.data("videoing").videoing;
                            // if (videoing == "true") {
                            //     var room = "";
                            //     var bodyT = "videoing";
                            //     var childMessageTypeT = 6;
                            //     var sessionId = toL;
                            //     parent.seestateTPL(
                            //         childMessageTypeT,
                            //         bodyT,
                            //         sessionId,
                            //         room,
                            //         layui.data("realName").realName,
                            //         fromNickNameL
                            //     );
                            //     return false;
                            // }
                            // if (odata.info.body.indexOf("$") > -1) {
                            //     this.$notify({
                            //         title: "请注意",
                            //         message: "您有一条视频消息请点开查看！",
                            //         position: "bottom-right",
                            //         duration: 0,
                            //         onClick() {
                            //             _this.receiveVideoVisable = true;
                            //         }
                            //     });
                            //     if (odata.info.body.indexOf(userId) > -1) {
                            //         var strAudio =
                            //             "<audio id='audioPlay' src='./chat_vedio_callin.mp3' hidden='true' loop='true'>";
                            //         if ($("body").find("audio").length <= 0)
                            //             $("body").append(strAudio);
                            //         var audio = document.getElementById(
                            //             "audioPlay"
                            //         );
                            //         //浏览器支持 audion
                            //         audio.play();
                            //         content =
                            //             '<div class="lay-video">' +
                            //             '<div style="color:#fff;padding-bottom: 10px;">邀请你开视频</div>' +
                            //             '<div class="closediV"><button class="layui-btn layui-btn-danger" layim-event="extend" lay-filter="refusedto">拒绝</button>' +
                            //             '<button class="layui-btn" layim-event="extend" lay-filter="accept" data-typel="two" data-toNickNameL="' +
                            //             toNickNameL +
                            //             '" data-toL="' +
                            //             toL +
                            //             '" data-fromL="' +
                            //             fromL +
                            //             '" data-fromNickNameL="' +
                            //             fromNickNameL +
                            //             '" data-room="' +
                            //             bodyVideo +
                            //             '" data-type="true">接受</button>' +
                            //             "</div></div>";
                            //         layer.msg(username + "邀请你开视频");
                            //         Notification.requestPermission(function(
                            //             permission
                            //         ) {
                            //             if (
                            //                 Notification.permission == "granted"
                            //             ) {
                            //                 var notification = new Notification(
                            //                     "" + username + "",
                            //                     {
                            //                         body:
                            //                             "邀请你开视频。。。。",
                            //                         icon:
                            //                             "../../images/gf_logo_app.png"
                            //                     }
                            //                 );
                            //                 notification.onclick = function() {
                            //                     notification.close();
                            //                 };
                            //             }
                            //         });
                            //     } else {
                            //         var conferenceId = odata.info.body
                            //             .split("&")[2]
                            //             .split("$")[0];
                            //         var kName = odata.info.fromNickName;
                            //         content =
                            //             '<div class="lay-video">' +
                            //             '<div style="color:#F60" data-id="' +
                            //             conferenceId +
                            //             '" >发起了视频聊天</div>' +
                            //             '<div class="closediV vidoefix"  id="' +
                            //             conferenceId +
                            //             '">' +
                            //             '<div class="viedoe" style="color:#1474A9;padding: 5px;border-bottom: 2px solid #ccc;cursor: pointer;" layim-event="extend" data-conferenceId="' +
                            //             conferenceId +
                            //             '" lay-filter="jionRoom"><img src="../../images/v1.png" style="width: 20px;padding-right: 10px;    float: inherit;">正在进行视频会话</div>' +
                            //             '<div class="jinlis" style="display:none"><div class="userImlist">' +
                            //             '<img src="../../images/a1.png"><img src="../../images/a1.png"><img src="../../images/a1.png"><img src="../../images/a1.png">' +
                            //             "</div>" +
                            //             '<button class="layui-btn layui-btn-danger joninRom" layim-event="extend" lay-filter="cancelInto">取消</button>' +
                            //             '<button class="layui-btn joninRom" layim-event="extend" lay-filter="accept" data-typel="one" data-toNickNameL="' +
                            //             toNickNameL +
                            //             '" data-toL="' +
                            //             toL +
                            //             '" data-fromL="' +
                            //             fromL +
                            //             '" data-fromNickNameL="' +
                            //             fromNickNameL +
                            //             '" data-room="' +
                            //             bodyVideo +
                            //             '" data-type="true">加入</button>' +
                            //             "</div></div>";
                            //         var roomArray = [];
                            //         var roomNum = bodyVideo.split("&")[1];
                            //         var roomSession =
                            //             toL +
                            //             "$" +
                            //             roomNum +
                            //             "$" +
                            //             conferenceId;
                            //         try {
                            //             var roomAJosn = JSON.parse(
                            //                 localStorage.getItem("roomSession")
                            //             );
                            //             for (
                            //                 var i = 0;
                            //                 i < roomAJosn.length;
                            //                 i++
                            //             ) {
                            //                 var roomnums = roomAJosn[i];
                            //                 if (roomnums.indexOf(toL) > -1) {
                            //                     console.log(roomnums);
                            //                     roomAJosn.remove(roomnums);
                            //                 } else {
                            //                     roomArray.push(roomAJosn[i]);
                            //                 }
                            //             }
                            //             //  roomArray.push(roomAJosn.toString());
                            //         } catch (e) {}
                            //         roomArray.push(roomSession);
                            //         localStorage.setItem(
                            //             "roomSession",
                            //             JSON.stringify(roomArray)
                            //         );
                            //     }
                            // } else {
                            //     var strAudio =
                            //         "<audio id='audioPlay' src='./chat_vedio_callin.mp3' hidden='true' loop='true'>";
                            //     if ($("body").find("audio").length <= 0)
                            //         $("body").append(strAudio);
                            //     var audio = document.getElementById(
                            //         "audioPlay"
                            //     );
                            //     //浏览器支持 audion
                            //     audio.play();
                            //     content =
                            //         '<div class="lay-video">' +
                            //         '<div style="color:#fff;padding-bottom: 10px;">邀请你开视频</div>' +
                            //         '<div class="closediV"><button class="layui-btn layui-btn-danger" layim-event="extend" lay-filter="refusedto">拒绝</button>' +
                            //         '<button class="layui-btn" layim-event="extend" lay-filter="accept" data-typel="two" data-toNickNameL="' +
                            //         toNickNameL +
                            //         '" data-toL="' +
                            //         toL +
                            //         '" data-fromL="' +
                            //         fromL +
                            //         '" data-fromNickNameL="' +
                            //         fromNickNameL +
                            //         '" data-room="' +
                            //         bodyVideo +
                            //         '" data-type="true">接受</button>' +
                            //         "</div></div>";
                            //     layer.msg(username + "邀请你开视频");
                            //     Notification.requestPermission(function(
                            //         permission
                            //     ) {
                            //         if (Notification.permission == "granted") {
                            //             var notification = new Notification(
                            //                 "" + username + "",
                            //                 {
                            //                     body: "邀请你开视频。。。。",
                            //                     icon:
                            //                         "../../images/gf_logo_app.png"
                            //                 }
                            //             );
                            //             notification.onclick = function() {
                            //                 notification.close();
                            //             };
                            //         }
                            //     });
                            // }
                        }
                    } else if (childMessageType == 4) {
                        content =
                            '<div style="color:#F60">该消息为音频消息,请在手机上查看</div>';
                    } else if (childMessageType == 5) {
                        content =
                            "img[/user/api/v2/public/download?downType=Chat&secId=" +
                            encodeBase64 +
                            "&userId=&layer=00&deType=HD&fileId=" +
                            bodyVideo +
                            "]";
                    } else if (childMessageType == 7) {
                        var bodyPro = this.IMessage.decode(
                            new Uint8Array(res.data)
                        ).info.body;
                        var videosessionid = layui.data("videosessionidNow").id;
                        if (
                            bodyPro == "MicroCinic&hangup" &&
                            videosessionid == toL
                        ) {
                            var kicking = layui.data("kicking").kicking; //判断是否踢人
                            var videotyped = layui.data("videotype").type;
                            var localTest = layui.data("videousertype").type;
                            if (parent.quitType == "true") {
                                layer.closeAll();
                                parent.quitType = "false";
                            }
                            if (localTest == "true") {
                                parent.leaveConference();
                            }

                            if (videotyped == "true") {
                                if (kicking == "true") {
                                    // return;
                                }
                                parent.leaveConference();
                            }
                        }
                        return false;
                    } else if (childMessageType == 18) {
                        var formidls = this.IMessage.decode(
                            new Uint8Array(res.data)
                        ).info.from;
                        if (formidls != layui.data("realName").id) {
                            var fromNickName = this.IMessage.decode(
                                new Uint8Array(res.data)
                            ).info.fromNickName;
                            var bodyPro = JSON.parse(
                                this.IMessage.decode(new Uint8Array(res.data))
                                    .info.body
                            );
                            var toNickName = this.IMessage.decode(
                                new Uint8Array(res.data)
                            ).info.toNickName;
                            var phtml;
                            var fromid = odata.info.to;
                            content =
                                '<div class="artic">' +
                                '<span style="color: #3FDD86">' +
                                fromNickName +
                                "给您发了一份问诊表" +
                                '<p class="mingpian"><img src="../../images/q1.png" style="width: 45px;"> ' +
                                bodyPro.title +
                                "</p></span>" +
                                '<p class="shouji">请在手机上查看</p>' +
                                "</div>";
                        } else {
                            return false;
                        }
                    } else if (childMessageType == 20) {
                        var fromNickName = this.IMessage.decode(
                            new Uint8Array(res.data)
                        ).info.fromNickName;
                        var bodyPro = JSON.parse(
                            this.IMessage.decode(new Uint8Array(res.data)).info
                                .body
                        );
                        var toNickName = this.IMessage.decode(
                            new Uint8Array(res.data)
                        ).info.toNickName;
                        var phtml;
                        var fromid = odata.info.to;
                        content =
                            '<div class="artic">' +
                            '<span style="color: #3FDD86">' +
                            fromNickName +
                            "给您发了一份随访计划" +
                            '<p class="mingpian"><img src="../../images/q1.png" style="width: 45px;"> ' +
                            bodyPro.title +
                            "</p></span>" +
                            '<p class="shouji">请在手机上查看</p>' +
                            "</div>";
                    } else if (childMessageType == 21) {
                        var bodyPo = JSON.parse(
                            this.IMessage.decode(new Uint8Array(res.data)).info
                                .body
                        );
                        if (bodyPo.notice == "HOSPITAL") {
                            //医院通知
                            var notification = new Notification(
                                "" + bodyPo.title + "",
                                {
                                    body: bodyPo.body,
                                    icon: "../../images/gf_logo_app.png"
                                }
                            );
                            notification.onclick = function() {
                                notification.close();
                            };
                            parent.pullNoticeList();
                        } else if (bodyPo.notice == "FOLLOW_UP") {
                            //随访通知,
                            parent.pullNoticeList();
                            var notification = new Notification(
                                "" + bodyPo.title + "",
                                {
                                    body: bodyPo.body,
                                    icon: "../../images/gf_logo_app.png"
                                }
                            );
                            notification.onclick = function() {
                                notification.close();
                            };
                            parent.pullNoticeList();
                        } else if (bodyPo.notice == "COOPERATION") {
                            //协作邀请,
                            parent.pullNoticeList();
                            var notification = new Notification(
                                "" + bodyPo.title + "",
                                {
                                    body: bodyPo.body,
                                    icon: "../../images/gf_logo_app.png"
                                }
                            );
                            notification.onclick = function() {
                                notification.close();
                            };
                        } else if (bodyPo.notice == "BIZ_APPOINT") {
                            //业务指派,
                            parent.pullNoticeList();
                            var notification = new Notification(
                                "" + bodyPo.title + "",
                                {
                                    body: bodyPo.body,
                                    icon: "../../images/gf_logo_app.png"
                                }
                            );
                            notification.onclick = function() {
                                notification.close();
                            };
                        } else if (bodyPo.notice == "CLINIC") {
                            //新的诊室业务
                            parent.pullNoticeList();
                            var notification = new Notification(
                                "" + bodyPo.title + "",
                                {
                                    body: bodyPo.body,
                                    icon: "../../images/gf_logo_app.png"
                                }
                            );
                            notification.onclick = function() {
                                notification.close();
                            };
                        } else if (bodyPo.notice == "FOLLOW_UP_TABLE") {
                            //随访计划表,
                            parent.pullNoticeList();
                            var notification = new Notification(
                                "" + bodyPo.title + "",
                                {
                                    body: bodyPo.body,
                                    icon: "../../images/gf_logo_app.png"
                                }
                            );
                            notification.onclick = function() {
                                notification.close();
                            };
                        } else if (bodyPo.notice == "REFUND") {
                            //退款通知
                            parent.pullNoticeList();
                            var notification = new Notification(
                                "" + bodyPo.title + "",
                                {
                                    body: bodyPo.body,
                                    icon: "../../images/gf_logo_app.png"
                                }
                            );
                            notification.onclick = function() {
                                notification.close();
                            };
                        } else if (bodyPo.notice == "CRVIDEO") {
                            //视频回拨
                            parent.pullNoticeList();
                            var notification = new Notification(
                                "" + bodyPo.title + "",
                                {
                                    body: bodyPo.body,
                                    icon: "../../images/gf_logo_app.png"
                                }
                            );
                            notification.onclick = function() {
                                notification.close();
                            };
                        } else if (bodyPo.notice == "CLINIC_INVITED") {
                            //诊室邀请
                            var bodyls = JSON.parse(
                                this.IMessage.decode(new Uint8Array(res.data))
                                    .info.body
                            );
                            var botest = bodyls.body;
                            var getParams = function(name) {
                                var search = botest;
                                var pattern = new RegExp(
                                    "[?&]" + name + "=([^&]+)",
                                    "g"
                                );
                                var matcher = pattern.exec(search);
                                var items = null;
                                if (null != matcher) {
                                    try {
                                        items = decodeURIComponent(
                                            decodeURIComponent(matcher[1])
                                        );
                                    } catch (e) {
                                        try {
                                            items = decodeURIComponent(
                                                matcher[1]
                                            );
                                        } catch (e) {
                                            items = matcher[1];
                                        }
                                    }
                                }
                                return items;
                            };
                            var state = getParams("state");
                            if (state == "true") {
                                // var notification = new Notification("诊室邀请", {
                                //     body: IMessage.decode(new Uint8Array(res.data)).info.fromNickName+'邀请您医技协作',
                                //     icon: '../../images/gf_logo_app.png'
                                // });
                                // notification.onclick = function() {
                                //     notification.close();
                                // };
                                layer.open({
                                    type: 2,
                                    title: "诊室邀请",
                                    shadeClose: true,
                                    shade: 0,
                                    anim: 6,
                                    offset: "rb",
                                    area: ["280px", "350px"],
                                    content:
                                        "./page/components/listbox/invitation.html?" +
                                        botest +
                                        "&formname=" +
                                        this.IMessage.decode(
                                            new Uint8Array(res.data)
                                        ).info.fromNickName //iframe的url
                                });
                            } else {
                                layer.closeAll();
                            }
                        }
                        return false;
                    } else {
                        content = odata.info.body;
                    }
                    var cid = odata.info.msgId;
                    var fromid = odata.info.to;
                    var fromUserid = odata.info.from;
                    var timestamp = odata.info.clientTime;
                    var mine = false;
                    // if (fromUserid == userId) {
                    //     mine = true;
                    // }
                    // if (userSeesion.indexOf(fromid) > -1) {
                    //     var type = "group";
                    // } else {
                    //     var type = "firend";
                    // }
                    // var resdata = {
                    //     username: username, //消息来源用户名
                    //     avatar:
                    //         interfaces +
                    //         "/user/api/v2/public/download?downType=Head&secId=" +
                    //         encodeBase64 +
                    //         "&userId=" +
                    //         odata.info.from +
                    //         "&layer=00&deType=HD",
                    //     id: id, //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
                    //     type: type, //聊天窗口来源类型，从发送消息传递的to里面获取
                    //     content: content, //消息内容
                    //     chatType: chatTypeT,
                    //     groupId: id, //定义唯一的id方便你处理信息
                    //     cid: cid, //消息id，可不传。除非你要对消息进行一些操作（如撤回）
                    //     mine: mine, //是否我发送的消息，如果为true，则会显示在右方
                    //     fromid: fromid, //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
                    //     timestamp: timestamp //服务端时间戳。注意：JS中的时间戳是精确到毫秒，如果你返回的是标准的 unix 时间戳，记得要 *1000
                    // };
                    // var seFromid = odata.info.from;
                    // var seBody = odata.info.body;
                    // var sEsessionId = layui.data("selectRoomState").sessionId;
                    // var sEsessionIdt = layui.data("selectRoomStateT").sessionId;
                    // var childNum = odata.info.childMessageType;

                    // if (odata.info.chatType == 3) {
                    //     //判断是否是用户发送过来的消息
                    //     if (fromid == sEsessionId) {
                    //         try {
                    //             parent.onliConert(
                    //                 fromNickNameL,
                    //                 seBody,
                    //                 childNum
                    //             );
                    //         } catch (e) {}
                    //     } else {
                    //         try {
                    //             var chatboxsession = layui
                    //                 .data("chatboxsession")
                    //                 .id.replace("M", "#")
                    //                 .replace("-", ":");
                    //             var selectRoomStateNw = layui
                    //                 .data("selectRoomStateNw")
                    //                 .sessionId.replace("M", "#")
                    //                 .replace("-", ":");
                    //         } catch (e) {}
                    //         if (selectRoomStateNw == odata.info.to) {
                    //             try {
                    //                 parent.onliConertp(
                    //                     fromNickNameL,
                    //                     seBody,
                    //                     childNum
                    //                 );
                    //             } catch (e) {}
                    //         }
                    //         if (chatboxsession == odata.info.to) {
                    //             console.log(odata.info.to);
                    //             parent.chatKu(
                    //                 odata.info.body,
                    //                 odata.info.serverTime
                    //             );
                    //         }
                    //         var notification = new Notification(
                    //             "" + odata.info.fromNickName + "",
                    //             {
                    //                 body: "我已填好问诊表，请医生查看",
                    //                 icon: "../../images/gf_logo_app.png"
                    //             }
                    //         );
                    //         notification.onclick = function() {
                    //             notification.close();
                    //         };
                    //         parent.rendcoles(
                    //             odata.info.to
                    //                 .replace("#", "M")
                    //                 .replace(":", "-")
                    //         );
                    //     }
                    // } else {
                    //     try {
                    //         var selectRoomStateNw = layui
                    //             .data("selectRoomStateNw")
                    //             .sessionId.replace("M", "#")
                    //             .replace("-", ":");
                    //     } catch (e) {}
                    //     if (selectRoomStateNw == odata.info.to) {
                    //         try {
                    //             parent.onliConertp(
                    //                 fromNickNameL,
                    //                 seBody,
                    //                 childNum
                    //             );
                    //         } catch (e) {}
                    //     } else {
                    //         if (userSeesion.indexOf(fromid) > -1) {
                    //             layim.getMessage(resdata); //res.data即你发送消息传递的数据（阅读：监听发送的消息）
                    //             return false;
                    //         }
                    //     }
                    // }
                } else {
                    // 是本人发的消息
                    //判断当前接受的会话是否在当前列表中
                    //  let msgId = odata.info.msgId;
                    // let childMessageType = odata.info.childMessageType;
                    // let bodyVideo = odata.info.body;
                    // let fromNickNameL = odata.info.fromNickName;
                    console.log(odata);
                    let toL = odata.info.to;
                    let toNickNameL = odata.info.toNickName;

                    let msgId = odata.info.msgId;

                    var Iessage = {
                        RequestType: 106,
                        ticket: this.$store.state.socket.messageTicket.ticket,
                        status: {
                            state: true,
                            msgId: msgId //客户端上接收到最后一条消息的ID号
                        }
                    };
                    this.sendMessage(Iessage);

                    try {
                        var bodyls = JSON.parse(odata.info.body);
                        var botest = bodyls.body;
                        var bodyPo = JSON.parse(odata.info.body);
                        var childMessageType = odata.info.childMessageType;
                        if (childMessageType == 21) {
                            // var notification = new Notification(""+bodyPo.title+"", {
                            //     body: bodyPo.body,
                            //     icon: '../../images/gf_logo_app.png'
                            // });
                            // notification.onclick = function() {
                            //     notification.close();
                            // };
                            parent.pullNoticeList();
                        }
                    } catch (e) {}
                    var getParams = function(name) {
                        var search = botest;
                        var pattern = new RegExp(
                            "[?&]" + name + "=([^&]+)",
                            "g"
                        );
                        var matcher = pattern.exec(search);
                        var items = null;
                        if (null != matcher) {
                            try {
                                items = decodeURIComponent(
                                    decodeURIComponent(matcher[1])
                                );
                            } catch (e) {
                                try {
                                    items = decodeURIComponent(matcher[1]);
                                } catch (e) {
                                    items = matcher[1];
                                }
                            }
                        }
                        return items;
                    };
                    var state = getParams("state");
                    if (state == "true") {
                        parent.invitation++;
                        // var notification = new Notification("诊室邀请", {
                        //     body: IMessage.decode(new Uint8Array(res.data)).info.fromNickName+'邀请您医技协作',
                        //     icon: '../../images/gf_logo_app.png'
                        // });
                        // notification.onclick = function() {
                        //     notification.close();
                        // };
                        if (parent.invitation == 1) {
                            layer.open({
                                type: 2,
                                title: "诊室邀请",
                                shadeClose: true,
                                shade: 0,
                                anim: 6,
                                offset: "rb",
                                area: ["280px", "350px"],
                                content:
                                    "./page/components/listbox/invitation.html?" +
                                    botest +
                                    "&formname=" +
                                    this.IMessage.decode(
                                        new Uint8Array(res.data)
                                    ).info.fromNickName, //iframe的url
                                cancel: function(index, layero) {
                                    parent.invitation = "";
                                }
                            });
                        }
                    } else if (state == "false") {
                        parent.invitation = "";
                        layer.closeAll();
                    }
                }
            }
        },
        // 数据发送
        // websocketsend(data) {
        //     let msg = this.$store.state.socket.IMessage.encode(data).finish();
        //     this.$store.state.socket.socketObj.send(msg);
        // },
        //关闭
        webSocketonclose(e) {
            if (this.userState.token) {
                console.log("connection closed (" + e.code + ")");
                this.reconnect();
            }
        },
        webSocketonopen(buffer) {
            if (this.$store.state.socket.socketObj.readyState === 1) {
                console.log("连接成功");
                this.$store.state.socket.socketObj.send(buffer);
            } else {
                console.log(
                    "链接状态" + this.$store.state.socket.socketObj.readyState
                );
            }

            //发送心跳  进行保持长连接 /心跳检测重置
            this.heartCheck.start();
        },
        //重新连接IM
        reconnect(otoken) {
            let _this = this;
            // console.log(otoken)
            if (this.lockReconnect) {
                return;
            }
            this.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            this.tt && clearTimeout(this.tt);
            this.tt = setTimeout(function() {
                //每4s中进行一次连接IM
                _this.initWebSocket(otoken);
                _this.lockReconnect = false;
            }, 4000);
        },
        loginIM(token) {
            // console.log(token)
            var odata = new Date();
            // console.log(odata.getTime())
            //消息类型按照这样传递
            let message = this.$store.state.socket.IMessage.create({
                RequestType: 1,
                login: {
                    token: token,
                    timestamp: odata.getTime(),
                    systemType: "WEB",
                    deviceType: "WEB"
                }
            });
            return message;
        }
        // getMessageTicket() {
        //     let messageTicket = {
        //         ticket: this.ticket, //票据，登录即可返回
        //         sequence: this.sequence, //序列号
        //         content: this.content, //消息内容
        //         serverTime: this.serverTime, //服务器时间
        //         oMsgId: this.oMsgId,
        //         content: this.content
        //     };
        //     this.$emit("getMessageTicket", messageTicket);
        // }
    },
    watch: {
        "userSocketInfo.synchroMessage": {
            handler(n, o) {
                let _this = this;
                $.each(n.syncData, function(index, text) {
                    if (text.command == "SYNC_USER_INFO_UPDATE") {
                        _this.getUserInfo();
                    }
                    if (text.command == "SYNC_LOGOUT") {
                        //退出登录
                    }
                });
            }
        }
    }
};
</script>

<style scoped>
.steps {
}
</style>