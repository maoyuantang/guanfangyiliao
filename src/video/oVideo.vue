<template>
    <div>
        <div class="container-fluid bs-docs-container">
            <div class="row">
                <div class="col-xs-12 mani-media-box">
                    <div class="col-xs-12 media-box other-media">
                        <div id="remoteVideos"></div>
                        <div class="videoChatBtn" @click="videoChatBtn()">
                            <img style='width: 23px;
    height: 25px;' src='../assets/img/jianpan.png' /> 问诊工具
                            <!-- <button class='questToolClass' :disabled='questVisable'>
                            
                            </button> -->

                        </div>
                    </div>
                    <div class="col-xs-12 media-box us-media">
                        <!-- 网络视频 -->
                        <div v-if="localVideoVisable" id="localVideos" v-loading="loadingUs" element-loading-text="加载视频中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">

                        </div>
                        <!-- 本地视频 -->
                        <div class="localVideos1">
                            <video class="localVideo1" id="video" v-show="closeVideoBtnVieable" autoplay></video>
                        </div>
                        <!-- <video v-else class="localVideo1" id="video"  autoplay></video> -->

                        <div>
                            <div class="videoTopBtnBox">
                                <div @click='sendArchives()' v-show="chatTypeBox.startDoctorTYpe!='协作'">
                                    <img src="./../../static/assets/img/danganVideo.png" /> 查档案
                                </div>
                                <div>
                                    <div v-if="screenClickVisable" @click="screenClick()">屏幕分享</div>
                                    <div @click="openPatientNum()" v-show="listVisable">列表</div>
                                </div>
                            </div>
                            <div class="videoBtn">
                                <div @click="closeTheVideo()" v-show="guaVisable">
                                    <div><img src="./../../static/assets/img/gua1.png" /></div>
                                    <div>挂断</div>

                                </div>
                                <div @click="closeVideo()" v-show="closeVideoBtnVieable">
                                    <div><img src="./../../static/assets/img/gua1.png" /></div>
                                    <div>退出诊室</div>
                                </div>
                                <!-- <div @click="closeVideo()" v-show="closeVideoBtnVieable">
                                    <div><img src="./../../static/assets/img/videoD1.png" /></div>
                                    <div>关闭视频</div>
                                </div> -->
                            </div>
                            <div class="videoBtn" v-show="publicVideoVisable">
                                <div @click="closeVideoRoom(3)">
                                    <!-- 普通视频的挂断 -->
                                    <div><img src="./../../static/assets/img/gua1.png" /></div>
                                    <div>挂断</div>

                                </div>
                            </div>
                        </div>
                        <div class="videoChatBox" v-if="videoChatVisable">
                            <videoChat :sessionId="sessionId" :doctorVis="doctorVis" :userMessage="userMessage1" :chatType1="videoType" :chatTypeBox="chatTypeBox"></videoChat>
                            <!-- <videoChat :sessionId="sessionId" :doctorVis="doctorVis"></videoChat> -->
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div class="patientClass" v-show="closePatientNumVisable">
            <div class="closeUserMember" @click="closePatientNum()">
                关闭
            </div>
            <div class="patientClass0" v-show="patientVisable">
                <h3>正在排队</h3>
                <ul>
                    <li @click="createChat(thePatientMessage,1)">
                        <div>
                            <img src="../assets/img/sendNew1.png" />
                        </div>
                        <div>
                            {{thePatientMessage.userName}}
                        </div>
                    </li>
                </ul>
                <div>还有{{thePatientMessage.userWaitNow}}人在排队</div>
            </div>
            <div class="patientClass0">
                <h3>未处理业务(未排队)</h3>
                <ul v-show="noLineVisable">
                    <li v-for="(text,index) in noLineNum" :key="index" @click="createChat(text,0)">
                        <div>
                            <img src="../assets/img/sendNew1.png" />
                        </div>
                        <div>
                            {{text.userName}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--屏幕分享-->
        <div v-if="screenVisible">
            <el-dialog title="屏幕分享" :visible.sync="screenVisible" width="380px" center append-to-body>
                <div class="screenBtn">
                    <el-button type="primary" @click="sureScreen()">确认</el-button>
                    <el-button type="primary" @click="installScreen()">共享屏幕插件安装指南</el-button>
                    <el-button type="primary" @click="closeScreen()">取消</el-button>
                </div>
            </el-dialog>
        </div>
        <!--查看档案-->
        <div v-if="archivesVisible">
            <el-dialog title="查看档案" :visible.sync="archivesVisible" width="380px" center append-to-body fullscreen='true'>
                <archives v-if="archivesVisible"></archives>
            </el-dialog>
        </div>
        <!--屏幕安装指南-->
        <div v-if="installScreenVisible">
            <el-dialog title="共享屏幕安装插件指南" :visible.sync="installScreenVisible" width="520px" center append-to-body>
                <div class="screenClass">
                    <img src="../assets/img/screenImg.png" />
                </div>

            </el-dialog>
        </div>
    </div>
</template>
<script>
import "../../static/assets/css/jquery-impromptu.css";
import videoChat from "../public/publicComponents/videoChat.vue";
import archives from "@/components/docDetailed.vue";
import apiBaseURL from "../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {
    doctorInto,
    doctorGetList,
    doctorClickList,
    createVideoRoom,
    doctorQuit,
    doctorHangupNext,
    storageUsers,
    closeVideoRoom,
    bindSession
} from "../api/apiAll.js";
export default {
    name: "video",
    components: {
        videoChat,
        archives
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        })
    },
    data() {
        return {
            archivesId: "",
            archivesVisible: false,
            userResource: "",
            videoUser: 0,
            videoUser1: 0, //判断有没有人接收了视频
            screenClickVisable: false,
            screenVisible: false,
            installScreenVisible: false,
            closeVideoBtnVieable: false,
            publicVideoVisable: false,
            listVisable: true,
            oSeaver: "meet.xiaoqiangio.com",
            oUser: "gfki",
            oPassWord: "1qaz@WSX",
            patientNum: "", //排队患者
            noLineNum: "", //未完成排队数
            thePatientMessage: {},
            noLineVisable: false,
            patientVisable: false,
            createVideoRoomData1: {},
            localVideoVisable: false,
            sessionId: "",
            oUserId: "", //当前就诊人id
            guaVisable: false,
            questVisable: true,
            closePatientNumVisable: false,
            videoChatVisable: false,
            // doctorVis: 1,
            videoIng: 0,
            loadingUs: true,
            loadingOther: true,
            streamObject: {}
        };
    },
    methods: {
        //查看档案
        sendArchives() {
            if (this.archivesId) {
                this.$router.replace({
                    path: "/outpatient",
                    query: {
                        id: this.archivesId,
                        inData: true
                    }
                });
                this.archivesVisible = true;
            } else {
                this.$notify.error({
                    title: "警告",
                    message: "请选择需要查看档案的用户"
                });
            }

            // this.$router.push({
            //     path: "/docDetailed",
            //     query: {
            //         id: this.userMessage.userId
            //     }
            // });
        },
        //屏幕分享
        screenClick() {
            this.screenVisible = true;
        },
        closeScreen() {
            this.screenVisible = false;
        },
        //确认分享
        sureScreen() {
            this.screenShareBtn();
        },
        //安装指南
        installScreen() {
            this.installScreenVisible = true;
        },
        openPatientNum() {
            this.closePatientNumVisable = true;
            this.getThePatient();
        },
        closePatientNum() {
            this.closePatientNumVisable = false;
        },
        //发送
        sendMessageChat(childMessageType, messageBody, childMessageType1) {
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
            this.sendMessage(Iessage);

            // let aaa=websocket.dadaTransfer
        },

        // 添加消息到发送框
        addMessageK(ouserId, oMessage, oMessageTime, childMessageType) {
            if (childMessageType == "VIDEO") {
                if (oMessage.indexOf("cancle") > -1) {
                    oMessage = "取消了视频通话";
                } else if (oMessage.indexOf("refuse") > -1) {
                    oMessage = "拒绝了视频通话";
                } else if (oMessage.indexOf("videoing") > -1) {
                    oMessage = "对方正在视频通话中";
                } else if (oMessage.indexOf("complete") > -1) {
                    oMessage = "视频通话已结束";
                } else if (oMessage.indexOf("accept") > -1) {
                    oMessage = "接受了视频聊天";
                } else if (oMessage.indexOf("complete") > -1) {
                    oMessage = "视频通话已结束";
                } else if (oMessage.indexOf("sendroom") > -1) {
                    console.log("发起了视频聊天！！！！");
                    oMessage = "发起了视频聊天";
                }
            } else if (
                childMessageType == "FOLLOWUP" ||
                childMessageType == "INTERROGATION"
            ) {
                let oMessage1 = JSON.parse(oMessage);
                this.messageList.push({
                    from: ouserId,
                    content: oMessage1,
                    serverTime: oMessageTime,
                    childMessageType: childMessageType
                });
            } else if (childMessageType == "IMAGE") {
                this.messageList.push({
                    fromNickName: fromNickName,
                    from: ouserId,
                    content: this.imgUrl + oMessage,
                    serverTime: oMessageTime,
                    childMessageType: childMessageType,
                    signImages: [this.imgUrl + oMessage]
                });
            } else {
                this.messageList.push({
                    from: ouserId,
                    content: oMessage,
                    serverTime: oMessageTime,
                    childMessageType: childMessageType
                });
            }
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
            let msg = this.$store.state.socket.IMessage.encode(data).finish();
            this.$store.state.socket.socketObj.send(msg);
        },
        //调用本地摄像头
        getLocal() {
            let _this = this;
            var aVideo = document.getElementById("video");
            this.$nextTick(() => {
                var aCanvas = document.getElementById("canvas");
                console.log(aCanvas);
            });
            // var ctx = aCanvas.getContext("2d");

            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia; //获取媒体对象（这里指摄像头）
            navigator.getUserMedia(
                {
                    video: true
                },
                gotStream,
                noStream
            ); //参数1获取用户打开权限；参数二成功打开后调用，并传一个视频流对象，参数三打开失败后调用，传错误信息

            function gotStream(stream) {
                video.src = URL.createObjectURL(stream);
                video.onerror = function() {
                    stream.stop();
                };
                _this.streamObject = stream;
                // stream.getTracks()[0].stop();
                stream.onended = noStream;
                video.onloadedmetadata = function() {
                    // alert("摄像头成功打开！");
                };
            }

            function noStream(err) {
                alert(err);
            }
        },
        //进入诊室
        async enterRoomBtn() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                clinicId: this.oClinicId
            };
            const res = await doctorInto(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.patientNum = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取当前排队的人
        async getThePatient() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                clinicId: this.oClinicId,
                doctorId: this.userSelfInfo.userId
            };
            const res = await doctorGetList(query, options);
            if (res.data && res.data.errCode === 0) {
                this.thePatientMessage = res.data.body;
                if (res.data.body.li) {
                    this.noLineVisable = true;
                    this.patientVisable = false;
                } else {
                    this.noLineVisable = false;
                    this.patientVisable = true;
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取未完成排队数
        async noLineUpNum() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                clinicId: this.oClinicId
            };
            const res = await doctorClickList(query, options);
            if (res.data && res.data.errCode === 0) {
                this.noLineNum = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //创建会话
        async createChat(text, num) {
            this.archivesId = text.userId;
            this.userMessage1 = {
                clinicId: this.userMessage.clinicId,
                departmentId: this.userMessage.departmentId,
                userId: text.userId,
                orgCode: this.userSelfInfo.orgCode,
                clinicOrderId: text.orderId //订单id
            };
            this.oUserId = text.userId;
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                orderId: text.orderId
            };
            const res = await bindSession(query, options);
            if (res.data && res.data.errCode === 0) {
                _this.sessionId = res.data.body;
                _this.questVisable = false;
                //正在排队
                if (num == 1) {
                    _this.createVideo(text.userId);
                } else {
                    //未完成排队
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //创建视频
        async createVideo(ouserId) {
            if (this.videoIng == 0) {
                let _this = this;
                let query = {
                    token: this.userState.token
                };
                let options = {
                    type: "NORMAL",
                    time: ""
                };
                const res = await createVideoRoom(query, options);
                if (res.data && res.data.errCode === 0) {
                    _this.createVideoRoomData1 = {
                        conferenceId: res.data.body.conferenceId,
                        conferenceNumber: res.data.body.conferenceNumber
                    };
                    console.log("创建视频成功");
                    _this.closeVideoBtnVieable = false; //关闭视频隐藏
                    _this.$store.commit("socket/IFENTERVIDEO", 1); //当前登录用户在视频中
                    _this.videoIng = 1;
                    _this.closePatientNumVisable = false;
                    _this.localVideoVisable = true;
                    this.firstSet();
                    _this.guaVisable = true;
                    _this.questVisable = true;
                    let childMessageType = 7;
                    let messageBody =
                        "MicroCinicSendRoom&" +
                        res.data.body.conferenceNumber +
                        "&" +
                        res.data.body.conferenceId;

                    _this.sendMessageChat(childMessageType, messageBody);
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            } else if (this.videoIng == 1) {
                this.$notify.error({
                    title: "警告",
                    message: "正在视频中....."
                });
            }
        },
        //问诊工具
        videoChatBtn() {
            if (this.archivesId) {
                if (this.videoChatVisable) {
                    this.videoChatVisable = false;
                    if (this.videoType == "门诊") {
                    } else {
                        this.publicVideoVisable = true;
                    }
                } else {
                    this.videoChatVisable = true;
                    if (this.videoType == "门诊") {
                    } else {
                        this.publicVideoVisable = false;
                    }
                }
            } else {
                this.$notify.error({
                    title: "警告",
                    message: "请选择用户"
                });
            }
        },
        //挂断普通视频
        closePublicVideo() {
            this.closeVideoRoom(0);
            // let _this = this;
            // let query = {
            //     token: this.userState.token
            // };
            // let options = {
            //     clinicId: this.oClinicId,
            //     userId: this.oUserId
            // };
            // const res = await doctorHangupNext(query, options);
            // if (res.data && res.data.errCode === 0) {
            //     // _this.getThePatient();
            //     // _this.noLineUpNum();
            //     _this.closeVideoRoom(0);
            //     _this.guaVisable = false;
            //     _this.questVisable = false;
            //     console.log("关闭视频成功");
            //     _this.localVideoVisable = false;
            //     _this.videoIng = 0;
            // } else {
            //     //失败
            //     this.$notify.error({
            //         title: "警告",
            //         message: res.data.errMsg
            //     });
            // }
        },
        //挂断当前视频
        async closeTheVideo() {
            // this.streamObject.getTracks()[0].stop();
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                clinicId: this.oClinicId,
                userId: this.oUserId
            };
            const res = await doctorHangupNext(query, options);
            if (res.data && res.data.errCode === 0) {
                _this.getThePatient();
                _this.noLineUpNum();
                _this.closeVideoRoom(0);
                _this.guaVisable = false;
                _this.questVisable = false;
                console.log("关闭视频成功");
                _this.localVideoVisable = false;
                _this.videoIng = 0;
                _this.$store.commit("socket/IFENTERVIDEO", 0); //当前登录用户没有在视频
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        closeTheVideo1() {},
        //关闭视频退出诊室
        async closeVideo() {
            this.streamObject.getTracks()[0].stop();
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                clinicId: this.oClinicId
            };
            const res = await doctorQuit(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "退出诊室成功"
                });
                // if (_this.$store.state.socket.ifEnterVideo == 0) {
                //     _this.$emit("reback", "closeVideoOnly");
                // } else if (_this.$store.state.socket.ifEnterVideo == 1) {
                //     this.closeVideoRoom(1);
                // }
                _this.$emit("reback", "closeVideoOnly");
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //退出视频房间
        async closeVideoRoom(num) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                conferenceId: this.createVideoRoomData1.conferenceId,
                state: "OFF"
            };
            const res = await storageUsers(query, options);
            if (res.data && res.data.errCode === 0) {
                let childMessageType = "";
                let messageBody = "complete";

                if (num == 3) {
                    console.log("离开房间1");

                    childMessageType = 6;

                    if (_this.videoUser == 0) {
                        _this.$emit("reback", "closeCancle");
                        messageBody = "cancle";
                        _this.sendMessageChat("6", "cancle", "VIDEO");
                    } else if (_this.videoUser > 0) {
                        alert("有人在视频，然后我挂断");
                        _this.$emit("reback", "closeComplete");
                        messageBody = "complete";
                        _this.sendMessageChat("6", "complete", "VIDEO");
                    }
                    _this.$store.commit("socket/IFVIDEOIMG", 0);
                } else if (num == 2) {
                    //    为2是人数太多被挤出或者都挂断了视频，只剩我一个自动退出
                    _this.$emit("reback", "closeCancle");
                } else {
                    childMessageType = 7;
                    _this.sendMessageChat(
                        childMessageType,
                        messageBody,
                        "CRVIDEO"
                    );
                }
                _this.closeVideoBtnVieable = true; //关闭视频显示
                _this.deleteVideoRoom();
                console.log("离开房间");
                _this.leaveRoomBtn();
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //删除视频房间
        async deleteVideoRoom() {
            let _this = this;
            let query = {
                token: this.userState.token,
                cID: this.createVideoRoomData1.conferenceId
            };
            const res = await closeVideoRoom(query);
            if (res.data && res.data.errCode === 0) {
                console.log("删除房间陈宫");
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        generateVideoDeviceSelectElement(resource) {
            var VideoInputSelectForm = document.createElement("div");
            VideoInputSelectForm.className = "form-group";
            var VideoInputSelectDiv = document.createElement("div");
            var VideoDevicesSelect = document.createElement("select");
            VideoDevicesSelect.id = "video_input_select_" + resource;
            VideoDevicesSelect.className = "form-control";
            Manis.getVideoInputDevices(function(result) {
                console.info("get video input devices : ", result);
                if (result.code == 200) {
                    var devices = result.response;
                    for (var i = 0; i != devices.length; i++) {
                        var deviceOption = document.createElement("option");
                        deviceOption.value = devices[i].value;
                        deviceOption.innerHTML = devices[i].label;
                        VideoDevicesSelect.appendChild(deviceOption);
                    }
                }
            });
            VideoDevicesSelect.onchange = function() {
                var currentVideoInputDevice = $(this).val();
                console.log(
                    "video input device will change to :",
                    currentVideoInputDevice
                );
                Manis.changeVideoInputDevice(currentVideoInputDevice, function(
                    result
                ) {
                    console.info("change video input complete : ", result);
                    if (result.code == 200) {
                        $("#localVideos").find("video")[0].srcObject =
                            result.response.stream;
                    }
                });
            };
            VideoInputSelectDiv.appendChild(VideoDevicesSelect);
            VideoInputSelectForm.appendChild(VideoInputSelectDiv);
            return VideoInputSelectForm;
        },
        generateAudioInputDevicesSelect(resource) {
            var audioInputSelectForm = document.createElement("div");
            audioInputSelectForm.className = "form-group";
            var audioInputSelectDiv = document.createElement("div");
            var audioDevicesSelect = document.createElement("select");
            audioDevicesSelect.id = "audio_input_select_" + resource;
            audioDevicesSelect.className = "form-control";
            Manis.audioInputDevices(function(result) {
                console.info("get audio input devices : ", result);
                if (result.code == 200) {
                    var devices = result.response;
                    for (var i = 0; i != devices.length; i++) {
                        var deviceOption = document.createElement("option");
                        deviceOption.value = devices[i].value;
                        deviceOption.innerHTML = devices[i].label;
                        audioDevicesSelect.appendChild(deviceOption);
                    }
                }
            });
            audioDevicesSelect.onchange = function() {
                var currentAudioInputDevice = $(this).val();
                console.log(
                    "audio input device will change to :",
                    currentAudioInputDevice
                );
                Manis.audioInputChange(currentAudioInputDevice, function(
                    result
                ) {
                    console.info("change audio input complete : ", result);
                    if (result.code == 200) {
                        $("#localVideos").find("video")[0].srcObject =
                            result.response.stream;
                    }
                });
            };
            audioInputSelectDiv.appendChild(audioDevicesSelect);
            audioInputSelectForm.appendChild(audioInputSelectDiv);
            return audioInputSelectForm;
        },
        generateResolutionSelectElement(response, resource) {
            var resolutionDiv = document.createElement("div");
            var resolutionSelect = document.createElement("select");
            resolutionSelect.className = "form-control";
            resolutionSelect.id = "resolution_select_" + resource;
            var qvgaOption = document.createElement("option");
            qvgaOption.innerHTML = "QVGA (320x180)";
            qvgaOption.value = "180";
            if (qvgaOption.value == response.constraints.video.height.exact) {
                qvgaOption.selected = true;
            }
            resolutionSelect.appendChild(qvgaOption);
            var vgaOption = document.createElement("option");
            vgaOption.innerHTML = "VGA (960x540)";
            vgaOption.value = "540";
            if (vgaOption.value == response.constraints.video.height.exact) {
                vgaOption.selected = true;
            }
            resolutionSelect.appendChild(vgaOption);

            var xgaOption = document.createElement("option");
            xgaOption.innerHTML = "XGA (1024x758)";
            xgaOption.value = "768";
            if (xgaOption.value == response.constraints.video.height.exact) {
                xgaOption.selected = true;
            }
            resolutionSelect.appendChild(xgaOption);

            var xgaOption_480 = document.createElement("option");
            xgaOption_480.innerHTML = "XGA (640x480)";
            xgaOption_480.value = "480";
            if (
                xgaOption_480.value == response.constraints.video.height.exact
            ) {
                xgaOption_480.selected = true;
            }
            resolutionSelect.appendChild(xgaOption_480);

            var xgaOption_240 = document.createElement("option");
            xgaOption_240.innerHTML = "XGA (320x240)";
            xgaOption_240.value = "240";
            if (
                xgaOption_240.value == response.constraints.video.height.exact
            ) {
                xgaOption_240.selected = true;
            }
            resolutionSelect.appendChild(xgaOption_240);

            var hdOption = document.createElement("option");
            hdOption.innerHTML = "HD (1280x720)";
            hdOption.value = "720";
            if (hdOption.value == response.constraints.video.height.exact) {
                hdOption.selected = true;
            }
            resolutionSelect.appendChild(hdOption);
            var fullHdOption = document.createElement("option");
            fullHdOption.innerHTML = "Full HD (1920x1080)";
            fullHdOption.value = "1080";
            if (fullHdOption.value == response.constraints.video.height.exact) {
                fullHdOption.selected = true;
            }
            resolutionSelect.appendChild(fullHdOption);
            resolutionSelect.onchange = function() {
                Manis.changeResolution($(this).val(), function(result) {
                    console.log("got modify resolution response : ", result);
                    if (result.code == 200) {
                        if (result.response.replace == true) {
                            $("#localVideos").find("video")[0].srcObject =
                                result.response.stream;
                        }
                    }
                });
            };
            resolutionDiv.appendChild(resolutionSelect);
            return resolutionDiv;
        },
        generateToggleLocalVideoElement(resource) {
            var videoMuteToggleDiv = document.createElement("div");
            var videoMuteToggleElement = document.createElement("button");
            videoMuteToggleElement.className = "btn btn-default";
            videoMuteToggleElement.innerHTML = "关闭视频(本端)";
            videoMuteToggleElement.id = "video_mute_status_btn_" + resource;
            videoMuteToggleElement.onclick = function() {
                Manis.videoToggleMute(
                    function(success) {
                        console.info(
                            "video mute complete , status now is : ",
                            success
                        );
                        if (success.code == 200) {
                            if (success.response) {
                                // video muted
                                $("#video_mute_status_btn_" + resource).html(
                                    "开启视频(本端)"
                                );
                            } else {
                                // video dose not muted
                                $("#video_mute_status_btn_" + resource).html(
                                    "关闭视频(本端)"
                                );
                            }
                        }
                    },
                    function(error) {
                        console.error(
                            "video mute toggle failed with error : ",
                            error
                        );
                    }
                );
            };
            videoMuteToggleDiv.appendChild(videoMuteToggleElement);
            return videoMuteToggleDiv;
        },
        generateToggleLocalAudioElement(resource) {
            var audioMuteToggleDiv = document.createElement("div");
            var audioMuteToggleElement = document.createElement("button");
            audioMuteToggleElement.className = "btn btn-default";
            audioMuteToggleElement.innerHTML = "静音(本端)";
            audioMuteToggleElement.id = "audio_mute_status_btn_" + resource;
            audioMuteToggleElement.onclick = function() {
                Manis.audioToggleMute(
                    function(success) {
                        console.info(
                            "audio mute complete , status now is : ",
                            success
                        );
                        if (success.code == 200) {
                            if (success.response) {
                                // audio muted
                                $("#audio_mute_status_btn_" + resource).html(
                                    "取消静音(本端)"
                                );
                            } else {
                                // audio dose not muted
                                $("#audio_mute_status_btn_" + resource).html(
                                    "静音(本端)"
                                );
                            }
                        }
                    },
                    function(error) {
                        console.error(
                            "audio mute toggle failed with error : ",
                            error
                        );
                    }
                );
            };
            audioMuteToggleDiv.appendChild(audioMuteToggleElement);
            return audioMuteToggleDiv;
        },
        generateStatusElements(response, resource) {
            var baseInfoDiv = document.createElement("div");
            baseInfoDiv.className = "col-xs-6 base-info-box hidden";
            baseInfoDiv.id = "participant_base_info_" + resource;
            var nicknameDiv = document.createElement("div");
            nicknameDiv.innerHTML = "Nickname : ";
            var nicknameElement = document.createElement("span");
            nicknameElement.id = "nickname_" + resource;
            nicknameElement.innerHTML = response.info.nickname;
            nicknameDiv.appendChild(nicknameElement);
            baseInfoDiv.appendChild(nicknameDiv);

            var resolutionDiv = document.createElement("div");
            resolutionDiv.innerHTML = "Resolution : ";
            var resolutionElement = document.createElement("span");
            resolutionElement.id = response.status.resolutionId;
            resolutionDiv.appendChild(resolutionElement);
            baseInfoDiv.appendChild(resolutionDiv);

            var uploadPackageLostDiv = document.createElement("div");
            uploadPackageLostDiv.innerHTML = "Upload package lost : ";
            var uploadPackageLostElement = document.createElement("span");
            uploadPackageLostElement.id = response.status.uploadPackageLostId;
            uploadPackageLostDiv.appendChild(uploadPackageLostElement);
            baseInfoDiv.appendChild(uploadPackageLostDiv);

            var downloadPackageLostDiv = document.createElement("div");
            downloadPackageLostDiv.innerHTML = "Download package lost : ";
            var downloadPackageLostElement = document.createElement("span");
            downloadPackageLostElement.id =
                response.status.downloadPackageLostId;
            downloadPackageLostDiv.appendChild(downloadPackageLostElement);
            baseInfoDiv.appendChild(downloadPackageLostDiv);

            var uploadBitrateDiv = document.createElement("div");
            uploadBitrateDiv.innerHTML = "Upload bitrate : ";
            var uploadBitrateElement = document.createElement("span");
            uploadBitrateElement.id = response.status.uploadBitrateId;
            uploadBitrateDiv.appendChild(uploadBitrateElement);
            baseInfoDiv.appendChild(uploadBitrateDiv);

            var downloadBitrateDiv = document.createElement("div");
            downloadBitrateDiv.innerHTML = "Download bitrate : ";
            var downloadBitrateElement = document.createElement("span");
            downloadBitrateElement.id = response.status.downloadBitrateId;
            downloadBitrateDiv.appendChild(downloadBitrateElement);
            baseInfoDiv.appendChild(downloadBitrateDiv);
            console.info("1111111111111111111111111111", baseInfoDiv);
            return baseInfoDiv;
        },
        generateAudioControlElement(resource) {
            var audioToggleControlDiv = document.createElement("div");
            var audioToggleControlElement = document.createElement("button");
            audioToggleControlElement.className = "btn btn-default";
            audioToggleControlElement.innerHTML = "静音";
            audioToggleControlElement.id =
                "control_audio_mute_status_btn_" + resource;
            audioToggleControlElement.onclick = function() {
                var mute = $(this).html() == "静音" ? true : false;
                Manis.setSomeoneAudioMute(
                    resource,
                    mute,
                    function(success) {
                        if (success.response === true) {
                            $(
                                "#control_audio_mute_status_btn_" + resource
                            ).html("取消静音");
                        } else {
                            $(
                                "#control_audio_mute_status_btn_" + resource
                            ).html("静音");
                        }
                    },
                    function(error) {
                        console.error("compere set audio mute failed :", error);
                    }
                );
            };
            audioToggleControlDiv.appendChild(audioToggleControlElement);
            return audioToggleControlDiv;
        },
        generateTransferCompereElement(resource) {
            var transferCompereDiv = document.createElement("div");
            var transferCompereElement = document.createElement("button");
            transferCompereElement.className = "btn btn-default";
            transferCompereElement.innerHTML = "移交主持人";
            transferCompereElement.id = "transfer_compere_btn_" + resource;
            transferCompereElement.onclick = function() {
                Manis.grantAdmin(
                    resource,
                    function(success) {
                        console.log("get transfer compere success :", success);
                    },
                    function(error) {
                        console.error("get transfer compere failed :", error);
                    }
                );
            };
            transferCompereDiv.appendChild(transferCompereElement);
            return transferCompereDiv;
        },
        generateRemoveElement(resource) {
            var removeDiv = document.createElement("div");
            var removeElement = document.createElement("button");
            removeElement.className = "btn btn-danger";
            removeElement.innerHTML = "踢出";
            removeElement.id = "transfer_compere_btn_" + resource;
            removeElement.onclick = function() {
                Manis.eject(
                    resource,
                    function(success) {
                        console.info("remove participant success", success);
                        _this.videoUser -= 1;
                        _this.$emit("reback", "closeVideoOnly");
                        alert("视频人数不能超过4人");
                    },
                    function(error) {
                        console.error("remove participant failed", error);
                    }
                );
            };
            removeDiv.appendChild(removeElement);
            return removeDiv;
        },
        generateParticipant(result, isSelf, isAdmin) {
            if (result.code == 200) {
                var response = result.response;
                var resource = response.info.resource;
                /** start base info **/
                var participantDiv = document.createElement("div");
                participantDiv.className =
                    "row participant participant_container_" + resource;
                participantDiv.id = "participant_" + resource;

                participantDiv.onmouseover = function() {
                    $(this)
                        .find(".col-xs-6")
                        .removeClass("hidden");
                };
                participantDiv.onmouseout = function() {
                    $(this)
                        .find(".col-xs-6")
                        .addClass("hidden");
                };
                var ssrc = response.stream.ssrc ? response.stream.ssrc : "";
                /** start stream **/
                var streamDiv = document.createElement("div");
                streamDiv.id = "participant_stream_" + ssrc;
                streamDiv.className = "col-xs-12 stream-box";

                var streamElement = document.createElement("video");
                streamElement.autoplay = true;
                streamElement.id = "stream_" + ssrc;
                streamElement.srcObject = response.stream;
                if (isSelf) {
                    streamElement.volume = 0;
                }
                streamDiv.appendChild(streamElement);
                participantDiv.appendChild(streamDiv);
                /** start status **/
                var baseInfoDiv = this.generateStatusElements(
                    response,
                    resource
                );
                participantDiv.appendChild(baseInfoDiv);

                var controlDiv = document.createElement("div");
                controlDiv.className = "col-xs-6 control-box hidden";
                controlDiv.id = "participant_control_" + resource;

                /** start self control **/
                if (isSelf) {
                    /** toggle audio mute **/
                    var audioMuteToggleDiv = this.generateToggleLocalAudioElement(
                        resource
                    );
                    controlDiv.appendChild(audioMuteToggleDiv);
                    /** toggle video mute**/
                    var videoMuteToggleDiv = this.generateToggleLocalVideoElement(
                        resource
                    );
                    controlDiv.appendChild(videoMuteToggleDiv);
                    /** modify video resolution **/
                    var resolutionDiv = this.generateResolutionSelectElement(
                        response,
                        resource
                    );
                    controlDiv.appendChild(resolutionDiv);
                    /** Devices selection **/
                    var VideoInputSelectForm = this.generateVideoDeviceSelectElement(
                        resource
                    );
                    controlDiv.appendChild(VideoInputSelectForm);
                    /** Audio input devices selection **/
                    var audioInputSelectForm = this.generateAudioInputDevicesSelect(
                        resource
                    );
                    controlDiv.appendChild(audioInputSelectForm);
                }
                /** end self control **/

                /** admin control **/
                if (!isSelf) {
                    var audioToggleControlDiv = this.generateAudioControlElement(
                        resource
                    );
                    controlDiv.appendChild(audioToggleControlDiv);

                    var transferCompereDiv = this.generateTransferCompereElement(
                        resource
                    );
                    controlDiv.appendChild(transferCompereDiv);

                    var removeDiv = this.generateRemoveElement(resource);
                    controlDiv.appendChild(removeDiv);
                }
                participantDiv.appendChild(controlDiv);
                return participantDiv;
            }
            return;
        },
        generateRingUpNotice(response) {
            var ringUpContainer = document.createElement("div");
            ringUpContainer.className = "container-fluid over";
            var ringUpLayout = document.createElement("div");
            ringUpLayout.className = "layout";
            var noticeDiv = document.createElement("div");
            noticeDiv.className = "row";
            var noticeElement = document.createElement("h2");
            noticeElement.innerHTML =
                '"' +
                response.nickname +
                '" 邀请您加入到 "' +
                response.roomName +
                '" 会议室';
            noticeDiv.appendChild(noticeElement);
            ringUpLayout.appendChild(noticeDiv);
            var ringUpCtlBox = document.createElement("div");
            ringUpCtlBox.className = "row";
            var acceptBox = document.createElement("div");
            acceptBox.className = "col-xs-6";
            var acceptElement = document.createElement("div");
            acceptElement.className = "btn btn-lg btn-success";
            acceptElement.innerHTML = "接听";
            acceptElement.onclick = function() {
                Manis.responseRingUp(
                    response.roomName,
                    response.password,
                    true,
                    response.uuid,
                    function(success) {
                        console.info("get accept invite result", success);
                        if (success.code == 200 && success.response) {
                            $("#createRoomBtn").toggleClass(
                                "btn-primary disabled"
                            );
                            $("#conferenceName").val(response.roomName);
                            $("#conferencePassword").val(response.password);
                        } else {
                            console.error(success);
                        }
                    }
                );
                $(".over").remove();
            };
            acceptBox.appendChild(acceptElement);
            ringUpCtlBox.appendChild(acceptBox);
            var rejectBox = document.createElement("div");
            rejectBox.className = "col-xs-6";
            var rejectElement = document.createElement("div");
            rejectElement.className = "btn btn-lg btn-danger";
            rejectElement.innerHTML = "拒绝";
            rejectElement.onclick = function() {
                Manis.responseRingUp(
                    response.roomName,
                    response.password,
                    false,
                    response.uuid,
                    function(result) {
                        console.log("get reject invite result ", result);
                    }
                );
                $(".over").remove();
            };
            rejectBox.appendChild(rejectElement);
            ringUpCtlBox.appendChild(rejectBox);
            ringUpLayout.appendChild(ringUpCtlBox);
            ringUpContainer.appendChild(ringUpLayout);
            return ringUpContainer;
        },
        //初始化配置
        firstSet() {
            let _this = this;
            // var server = $("#server").val();
            // var server=this.oSeaver
            var server = "meet.xiaoqiangio.com";
            // alert("初始化配置" + server);
            if (!server) {
                alert("请输入服务器地址");
                return false;
            }
            var type = $("#connect_type").val();
            Manis.initial(
                {
                    server: server,
                    domain: server,
                    type: type
                },
                function(result) {
                    if (result.code == 200) {
                        $("#initBtn").toggleClass("btn-primary disabled");
                        _this.videoLogin();
                    } else {
                        alert(result.msg);
                    }
                }
            );
        },
        //登录
        videoLogin() {
            // alert("登陆");
            let _this = this;
            // var username = $("#username").val();
            // var username=this.oUser
            var username = "gfkj";
            if (!username) {
                alert("请输入用户名");
                return false;
            }
            // var password = $("#password").val();
            // var password=this.oPassWord
            var password = "1qaz@WSX";
            if (!password) {
                alert("请输入密码");
                return false;
            }
            Manis.signIn(
                username,
                password,
                "",
                function(connection) {
                    console.log("sign success : ", connection);
                    _this.anonymousJoinRoomBtn();
                },
                function(error) {
                    console.error("sign error : ", error);
                    _this.firstSet();
                },
                true
            );
            $(this).toggleClass("btn-primary disabled");
        },
        //创建会议室
        createRoomBtn() {
            let _this = this;
            $("#localVideos").html("");
            Manis.createConference(
                "",
                "",
                function(result) {
                    if (result.code == 200) {
                        $("#createRoomBtn").toggleClass("btn-primary disabled");
                        console.info("generate conference complete : ", result);
                        $("#localVideos").append(
                            _this.anonymousJoinRoomBtn(result, true)
                        );
                    }
                },
                function(error) {
                    console.error("get error : ", error);
                }
            );
        },
        /**
         * 加入到房间
         */
        joinRoomBtn() {
            let _this = this;
            // var conferenceName = $("#conferenceName").val();
            let conferenceName = this.createVideoRoomData1.conferenceNumber;

            if (!conferenceName) {
                alert("请输入会议室号");
                return;
            }
            $("#localVideos").html("");
            window.roomName = conferenceName;
            var conferencePassword = $("#conferencePassword").val();
            Manis.joinConference(
                conferenceName,
                conferencePassword,
                function(result) {
                    console.log("join conference success : ", result);
                    $("#localVideos").append(
                        _this.generateParticipant(result, true)
                    );
                },
                function(error) {
                    console.log("join conference failure , error : ", error);
                }
            );
            $(this).toggleClass("btn-primary disabled");
        },

        /**
         * 匿名加入到房间
         */
        anonymousJoinRoomBtn() {
            // alert(
            //     "匿名加入到房间" + this.createVideoRoomData1.conferenceNumber
            // );
            let _this = this;
            // var conferenceName = $("#anonymousConferenceName").val();
            let conferenceName = this.createVideoRoomData1.conferenceNumber;
            alert(conferenceName);
            if (!conferenceName) {
                alert("请输入会议室号");
                return;
            }
            // var anonymousNickname = $("#anonymousNickname").val();
            let anonymousNickname = "于波";
            if (!anonymousNickname) {
                alert("请输入昵称");
                return;
            }
            $("#localVideos").html("");
            window.roomName = conferenceName;
            var conferencePassword = $("#conferencePassword").val();
            Manis.joinByAnonymous(
                conferenceName,
                anonymousNickname,
                conferencePassword,
                false,
                function(result) {
                    console.log("join conference success : ", result);
                    _this.userResource = result.response.info.resource;
                    alert(_this.userResource);
                    $("#localVideos").append(
                        _this.generateParticipant(result, true)
                    );
                },
                function(error) {
                    console.log("join conference failure , error : ", error);
                    // _this.firstSet()
                }
            );
            $(this).toggleClass("btn-primary disabled");
        },

        /**
         * 离开房间
         */
        leaveRoomBtn() {
            Manis.leaveConference(function(conference) {
                console.log("leave conference success : ", conference);
                document.querySelector("#remoteVideos").innerHTML = "";
                document.querySelector("#localVideos").innerHTML = "";
                // location.reload();
            });
            $("button").removeClass("btn-primary disabled");
        },

        /**
         * 呼叫SIP录播
         */
        recordBtn() {
            var sip = $("#sip").val();
            var recordRule = $("#recordRule").val();
            Manis.callSip(
                sip,
                function(success) {
                    console.info("send sip success : ", success);
                },
                function(error) {
                    console.error("send sip error : ", error);
                },
                recordRule
            );
        },

        /**
         * 参会人员列表
         */
        memberList() {
            Manis.memberList(function(result) {
                if (result.code == 200) {
                    var li = "";
                    result.response.forEach(function(m) {
                        console.info("permember :", m);
                        li +=
                            '<li class="list-group-item">' +
                            m.nickname +
                            "</li>";
                    });
                    $("#members").html(li);
                }
            });
        },
        /**
         * 发送文字信息
         */
        sendSipBtn() {
            var receiver = $("#receiver").val();
            var messageText = $("#messageText").val();
            Manis.sendTextMessage(
                messageText,
                receiver,
                function(success) {
                    console.info("send text message success : ", success);
                    $("#receiver").val("");
                    $("#messageText").val("");
                },
                function(error) {
                    console.error("send text message error : ", error);
                }
            );
        },

        /**
         * 呼叫SIP终端
         */
        sendSipBtn() {
            var sip = $("#sip").val();
            Manis.callSip(
                sip,
                function(success) {
                    console.info("send sip success : ", success);
                },
                function(error) {
                    console.error("send sip error : ", error);
                }
            );
        },
        /**
         * 获取主持人权限
         */
        fetchAdminBtn() {
            var pass = $("#fetchAdminPass").val();
            Manis.fetchAdmin(
                pass,
                function(success) {
                    console.info("fetch admin success : ", success);
                },
                function(error) {
                    console.error("fetch admin error : ", error);
                }
            );
        },

        /**
         * 拨号
         */
        ringUpBtn() {
            var receiver = $("#InvitePerson").val();
            var room = config.cNumber;
            var password = "";
            Manis.ringUp(
                receiver,
                room,
                password,
                function(success) {
                    window.withReply = false;
                    console.info("send invite success : ", success);
                },
                function(error) {
                    console.error("send invite error : ", error);
                }
            );
        },

        /**
         * 检查会议室是否已经开启
         */
        isRoomExistBtn() {
            var roomNum = $("#checkRoomExistNum").val();
            if (!roomNum) {
                alert("请输入需要查询的会议室房间号");
            }
            Manis.isRoomExist(roomNum, function(result) {
                if (result.code == 200) {
                    console.info(result.msg);
                } else {
                    console.warn(result.msg);
                }
            });
        },
        /**
         * 白板共享
         */
        whiteboardShareBtn() {
            Manis.whiteboardShare(function(result) {
                if (result.code !== 200) {
                    console.error(result);
                }
                console.info(result);
            });
        },

        screenShareBtn() {
            let _this = this;
            Manis.addScreenSourceToConnection(function(result) {
                if (result.code == 200) {
                    console.info(
                        "success add screen source to connection : ",
                        result
                    );
                } else {
                    console.error(result);
                    _this.$notify.error({
                        title: "警告",
                        message:
                            result.msg +
                            ",请确认是否安装屏幕共享插件，或查看安装"
                    });
                    // parent.layer.msg(''+result.msg+',请确认是否安装屏幕共享插件，或查看安装');
                }
            });
        },

        getFriendsBtn() {
            Manis.getFriends(function(result) {
                if (result.code == 200) {
                    console.info("get my friends  : ", result);
                } else {
                    console.error(result);
                }
            });
        },

        lockRoomBtn() {
            Manis.lockRoom(function(result) {
                if (result.code == 200) {
                    if (result.response) {
                        $("#lockRoomBtn")
                            .html("解锁房间")
                            .removeClass("btn-danger")
                            .addClass("btn-success");
                    } else {
                        $("#lockRoomBtn")
                            .html("锁定房间")
                            .removeClass("btn-success")
                            .addClass("btn-danger");
                    }
                } else {
                    console.error(result);
                }
            });
        }
    },
    created() {
        console.log(this.userMessage);

        if (this.doctorVis == 0) {
            this.screenClickVisable = true;
        } else {
            this.screenClickVisable = false;
        }

        this.createVideoRoomData1 = this.createVideoRoomData;
        let _this = this;

        if (this.videoType == "门诊") {
            this.archivesId=''
            this.listVisable = true;
            this.publicVideoVisable = false;
            this.closeVideoBtnVieable = true;
            this.getLocal();
            this.enterRoomBtn();
            this.noLineUpNum();
            this.getThePatient();
        } else {
            this.archivesId='不是门诊进入'
            this.publicVideoVisable = true;
            this.localVideoVisable = true;
            this.listVisable = false;
            this.questVisable = false;
            this.sessionId = this.sessionId1;
            this.firstSet();

            console.log(this.sessionId);
        }

        /**
         * 收到有人进入房间
         */
        Manis.onJoinConference(function(result) {
            $("#remoteVideos").append(_this.generateParticipant(result, false));
            // _this.$store.commit("socket/VIDEOUSER", 1);
            _this.videoUser += 1;
            alert("收到有人进入房间" + _this.videoUser);
            //人数超过3人呗踢出
            if (_this.videoUser > 3) {
                _this.closeVideoRoom(2);
                // _this.$emit("reback", "closeVideoOnly");
                // _this.generateRemoveElement(_this.userResource);
            }
        });
        /**
         * 收到有人离开房间
         */
        Manis.onLeaveConference(function(result) {
            if (result.code == 200) {
                $(
                    ".participant_container_" + result.response.resource
                ).remove();
            }
            // _this.$store.commit("socket/VIDEOUSER", 0);
            _this.videoUser -= 1;
            if (_this.videoType == "门诊") {
                _this.closeTheVideo();
            } else {
                if (_this.videoUser < 1) {
                    _this.closeVideoRoom(2);
                }
            }

            alert("收到有人离开房间对方有几个人在" + _this.videoUser);
        });
        /**
         * 收到文件信息
         */
        Manis.onTextMessage(function(result) {
            if (result.code == 200) {
                var message =
                    "<b>" +
                    result.response.from +
                    (result.response.isPrivateMsg
                        ? "(悄悄对" +
                          (result.response.to == "yourself"
                              ? "你"
                              : result.response.to == "all"
                                  ? "大家"
                                  : result.response.to) +
                          "说)"
                        : "(对大家说)") +
                    ":</b> <p>" +
                    result.response.content +
                    "</p>";
                $("#text-messages").append(message);
            }
        });
        /**
         * 收到音频状态变更
         */
        Manis.onAudioToggleMute(function(response) {
            if (response.mute == true) {
                var audioMuteDiv = document.createElement("div");
                audioMuteDiv.id = "audio_mute_status_" + response.user.resource;
                audioMuteDiv.innerHTML = "Audio mute status : ";
                var audioMuteElement = document.createElement("span");
                audioMuteElement.innerHTML = "Muted";
                audioMuteDiv.appendChild(audioMuteElement);
                $("#participant_base_info_" + response.user.resource).append(
                    audioMuteDiv
                );
            } else {
                $("#audio_mute_status_" + response.user.resource).remove();
            }
        });
        /**
         * 收到视频状态变更
         */
        Manis.onVideoToggleMute(function(response) {
            if (response.mute == true) {
                var videoMuteDiv = document.createElement("div");
                videoMuteDiv.id = "video_mute_status_" + response.user.resource;
                videoMuteDiv.innerHTML = "Video mute status : ";
                var videoMuteElement = document.createElement("span");
                videoMuteElement.innerHTML = "Muted";
                videoMuteDiv.appendChild(videoMuteElement);
                $("#participant_base_info_" + response.user.resource).append(
                    videoMuteDiv
                );
            } else {
                $("#video_mute_status_" + response.user.resource).remove();
            }
        });
        /**
         * 响铃
         */
        Manis.onRingUp(function(result) {
            if (result.code == 200) {
                var response = result.response;
                var ringUpContainer = generateRingUpNotice(response);
                document.querySelector("body").appendChild(ringUpContainer);
            }
        });
        /**
         * 收到拨号应答
         */
        Manis.onRingUpResponse(function(result) {
            if (result.code == 200) {
                var response = result.response;
                if (response.answer == "accept") {
                    console.log(
                        response.nickname +
                            "accept your invite into " +
                            response.roomName
                    );
                    var receiver = $("#InvitePerson").val();
                    var room = config.cNumber;
                    var password = "";
                    $("#createRoomBtn").click();
                    setTimeout(function() {
                        Manis.sendRoomComplete(
                            receiver,
                            room,
                            password,
                            function(res) {
                                console.log("send room complete success ", res);
                            }
                        );
                    }, 1000);
                } else if (response.answer == "reject") {
                    // someone reject you ring
                    alert(
                        response.nickname +
                            "reject your invite into " +
                            response.roomName
                    );
                } else if (response.answer == "busy") {
                    // someone reject you ring
                    alert(
                        response.nickname + "now is busy " + response.roomName
                    );
                }
            } else if (result.code == 406) {
                alert(result.msg);
            }
        });
        /**
         * 注册被主持人静音
         */
        Manis.onAudioMuteBeSet(function(result) {
            console.log(result);
        });
        /**
         * 主持被主持人踢出房间
         */
        Manis.onEject(function(result) {
            console.log(result);
            if (_this.videoType == "门诊") {
                _this.closeTheVideo();
            } else {
                _this.closePublicVideo();
            }
        });
        /**
         *
         */
        Manis.onHandsUp(function(result) {
            console.log(result);
        });
        /**
         *
         */
        Manis.onRoomComplete(function(result) {
            console.log("on room complete", result);
            if (result.code == 200) {
                var response = result.response;
                $("#conferenceName").val(response.roomNumber);
                $("#conferencePassword").val(response.roomPassword);
                $("#joinRoomBtn").click();
            }
        });
        Manis.onStreamSourceRemoved(function(result) {
            if (result.code == 200) {
                $("#participant_stream_" + result.response.ssrc).remove();
            }
        });
    },
    // beforeCreate() {
    //     const linkData = document.createElement("link");
    //     linkData.id = "linkdata";
    //     linkData.href =
    //         "../../static/Manis-Meetings-Chrome-Extension_v0.0.9.crx";
    //     document.body.appendChild(linkData);
    // },
    // beforeDestroy() {
    //     document.body.removeChild(document.getElementById(linkdata));
    // },
    watch: {
        "userSocketInfo.synchroMessage": {
            handler(n, o) {
                let _this = this;
                $.each(n.syncData, function(index, text) {
                    if (text.command == "SYNC_DOCTOR_GET_LIST") {
                        _this.getThePatient();
                    }
                    if (text.command == "SYNC_DOCTOR_APP_OUT") {
                    }
                });
            }
        },
        "userSocketInfo.msgBox.a.msg": {
            handler(data, o) {
                let olength = data.length;
                let oData = data[olength - 1];
                console.log(data);
                if (oData.RequestType == 6) {
                    if (this.sessionId == oData.info.to) {
                        let oTime = oData.info.serverTime;
                        let timestamp4 = new Date(oTime);
                        let y = timestamp4.getHours();
                        let d = timestamp4.getMinutes();
                        if (y <= 9) {
                            y = "0" + y;
                        }
                        if (d <= 9) {
                            d = "0" + d;
                        }
                        console.log(y + "-" + d);
                        let oMessageTime = y + ":" + d;

                        let messageBody = oData.info.body;
                        let oUserId = oData.info.from;
                        let childMessageType = "";
                        if (!oData.info.childMessageType) {
                            childMessageType = "DEFAULT";
                        }

                        if (oData.info.childMessageType == 6) {
                            childMessageType = "VIDEO";
                            if (messageBody.indexOf("refuse") > -1) {
                                //对方拒绝了视频
                                // if (this.videoType == "门诊") {
                                //     this.closeTheVideo();
                                // } else {
                                //     this.closePublicVideo();
                                //     this.$emit("reback");
                                // }
                            } else if (messageBody.indexOf("complete") > -1) {
                                //对方挂断了视频
                                // if (this.videoType == "门诊") {
                                //     this.closeTheVideo();
                                // } else {
                                //     this.closePublicVideo();
                                //     this.$emit("reback");
                                // }
                            } else if (messageBody.indexOf("accept") > -1) {
                                console.log(messageBody);
                                // this.$store.commit("socket/IFVIDEOIMG", 1);
                            } else if (messageBody.indexOf("videoing") > -1) {
                                //对方正在通话中
                                // if (this.videoType == "门诊") {
                                //     this.closeTheVideo();
                                // } else {
                                //     this.closePublicVideo();
                                //     this.$emit("reback");
                                // }
                            } else if (
                                messageBody.indexOf("sendroom") > -1 ||
                                messageBody.indexOf("MicroCinicSendRoom") > -1
                            ) {
                            }
                        } else if (oData.info.childMessageType == 4) {
                            childMessageType = "AUDIO";
                            messageBody = "该消息为音频消息,请在手机上查看";
                        } else if (oData.info.childMessageType == 5) {
                            childMessageType = "IMAGE";
                        } else if (oData.info.childMessageType == 7) {
                            childMessageType = "CRVIDEO";
                            if (oData.info.body == "MicroCinic&hangup") {
                                this.closeTheVideo();
                            }
                        } else if (oData.info.childMessageType == 18) {
                            childMessageType = "INTERROGATION";
                        } else if (oData.info.childMessageType == 20) {
                            childMessageType = "FOLLOWUP";
                        }
                        console.log(messageBody);
                        console.log(
                            oUserId,
                            messageBody,
                            oMessageTime,
                            childMessageType,
                            oData.info.fromNickName
                        );
                        this.addMessageK(
                            oUserId,
                            messageBody,
                            oMessageTime,
                            childMessageType,
                            oData.info.fromNickName
                        );
                    }
                }
            }
        }
    },
    props: {
        createVideoRoomData: Object,
        videoType: String,
        oClinicId: String,
        sessionId1: String,
        doctorVis: Number,
        userMessage: Object,
        chatTypeBox: Object
    },
    model: {
        prop: [
            "createVideoRoomData",
            "videoType",
            "oClinicId",
            "sessionId1",
            "doctorVis",
            "userMessage",
            "chatTypeBox"
        ],
        event: "reBack"
    }
};
</script>
<style  scope>
video {
    width: 100%;
    /* padding: 0.2em 0em; */
    /* background-color: #222; */
}

#localVideos div,
#remoteVideos div {
    background-color: #222;
    color: #fefefe;
}

.nav > li {
    position: relative;
    display: block;
    padding: 5px 1px;
}

.btn,
.form-control {
    padding: 2px 2px;
    border-radius: 1px;
}

.over {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: lightgray;
    z-index: 1000;
}

.layout {
    display: block;
    position: absolute;
    top: 40%;
    left: 40%;
    width: 20%;
    height: 20%;
    z-index: 1001;
    opacity: 1;
    text-align: center;
    color: #000;
}

.mani-media-box {
    display: flex;
    display: -webkit-flex;
    height: 100%;
}
.us-media {
    position: relative;
    padding: 0;
    height: 100%;
}
.us-media video {
    height: 100%;
    width: 100%;
    object-fit: fill;
}
.us-media .stream-box {
    width: 100%;
    height: 1000px;
}
.other-media {
    position: relative;
    padding: 0;
    width: 30%;
}
.other-media video {
    height: 100%;
    padding: 0;
}
.us-media {
    width: 70%;
}

#remoteVideos {
    height: 100%;
    padding: 10px;
    background: white;
}
#localVideos > div {
    height: 100%;
}
#localVideos > div > div {
    height: 100%;
}
#localVideos div,
#remoteVideos div {
    background: none;
}
.videoChatBtn {
    position: absolute;
    bottom: 0px;
    text-align: center;
    cursor: pointer;
    width: 100%;
    background: #f4f4f4;
    height: 50px;
    padding-top: 12px;
    font-size: 12px;
}
.patientClass {
    position: fixed;
    right: 16px;
    top: 3%;
    z-index: 9999999999999999999999999999;
    padding-top: 68px;
    width: 304px;
    height: 96% !important;
    background: rgba(0, 0, 0, 0.8);
    color: white;
}
.patientClass0 h3 {
    padding: 20px;
    font-family: .PingFangSC-Regular;
    font-size: 22px;
    color: #ffffff;
    letter-spacing: -0.52px;
    text-align: left;
}
.patientClass0 li {
    display: flex;
    display: -webkit-flex;
    padding: 14px;
    background: white;
    font-family: .PingFangSC-Regular;
    font-size: 22px;
    color: #030303;
    letter-spacing: -0.46px;
    text-align: left;
    cursor: pointer;
}
.patientClass0 li > div:first-child {
    margin-right: 20px;
    width: 62px;
    height: 62px;
}
.patientClass0 li > div:first-child img {
    width: 100%;
    height: 100%;
}
.patientClass0 li > div:last-child {
    line-height: 60px;
}
.patientClass0 > div:nth-child(3) {
    padding: 26px 0;
    text-align: center;
    font-family: .PingFangSC-Regular;
    font-size: 22px;
    color: #ffffff;
    letter-spacing: -0.46px;
}
.videoBtn {
    position: absolute;
    z-index: 9999;
    display: flex;
    display: -webkit-flex;

    bottom: 100px;
}
.videoBtn > div {
    margin: 0 30px;
    text-align: center;
    cursor: pointer;
}
.videoBtn > div > div:first-child {
    margin-bottom: 20px;
    width: 68px;
    height: 68px;
}
.videoBtn > div > div:last-child {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
}
.videoTopBtnBox {
    position: absolute;
    top: 10px;
    z-index: 999;
    padding: 35px 20px 0px 20px;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}
.videoTopBtnBox > div:first-child {
    padding: 6px;
    width: 120px;
    height: 40px;
    background: rgba(40, 16, 18, 0.78);
    border-radius: 4px;
    color: white;
}
.videoTopBtnBox > div:first-child > img {
    margin-right: 16px;
}
.videoTopBtnBox > div:nth-child(2) {
    display: flex;
    display: -webkit-flex;
    margin-top: -13px;
}
.videoTopBtnBox > div:nth-child(2) > div {
    /* position: relative;
    left: 17px;
    float: right; */
    margin: 0 10px;
    background: #7e7377;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 15px;
    color: white;
    cursor: pointer;
}
#participant_stream_ {
}

#remoteVideos > div > div:nth-child(2),
#remoteVideos > div > div:nth-child(3),
#localVideos > div > div:nth-child(2),
#localVideos > div > div:nth-child(3) {
    display: none !important;
}
#localVideos {
    height: 100%;
}
.localVideos1 {
    height: 99.8%;
    position: absolute;
    top: 0;
    width: 100%;
}
.localVideos1 > div > div:nth-child(2),
.localVideos1 > div > div:nth-child(3) {
    display: none !important;
}
.videoChatBox {
    position: absolute;
    bottom: 1px;
    width: 100%;
    z-index: 999999999999;
}
.videoChatBox .chat {
    width: 100%;
}
.closeUserMember {
    position: absolute;
    top: 18px;
    left: 10px;
    cursor: pointer;
}
.screenClass {
    width: 100%;
    height: 600px;
    overflow: auto;
}
.screenClass > img {
    width: 100%;
}
.screenBtn > button {
    height: 28px;
    padding: 0 15px;
    border: 1px solid #dedede;
    border-radius: 2px;
    color: #333;
    background-color: #fff;
}
.videoClassBox .el-dialog__header {
    height: 3%;
    padding: 0;
}
.videoClassBox .el-dialog__body {
    height: 96%;
    padding: 0 !important;
}
.videoClassBox .el-dialog__body > div,
.videoClassBox .el-dialog__body > div > div,
.videoClassBox .el-dialog__body > div > div > div {
    height: 100%;
}
.participant {
    height: 30%;
    margin-bottom: 2%;
}
.stream-box {
    height: 100%;
}
.questToolClass {
    border: none;
    outline: none;
    background: none;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #646464;
    text-align: left;
}
/* 
门诊打开注意 

 <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId">

需要传入三个参数


1.     createVideoRoomData: {
          conferenceId: "",
          conferenceNumber: ""
        }
2.   videoType:"门诊"
第一个第二个参数就传我上面放的，是固定的
3.   oClinicId："当前门诊id"


 <!-- 视频聊天 -->
    <div v-if="centerDialogVisible">
      <el-dialog title="" :visible.sync="centerDialogVisible" center append-to-body fullscreen @close="closeVideo()">
        <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId">
        </ovideo>
      </el-dialog>
    </div>
*/
</style>

