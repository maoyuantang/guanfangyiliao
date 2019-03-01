<template>
    <div>
        <div class="container-fluid bs-docs-container">
            <div class="row">
                <div class="col-xs-12 mani-media-box">
                    <div class="col-xs-12 media-box other-media">
                        <div id="remoteVideos"></div>
                        <div class="videoChatBtn" v-show="questVisable" @click="videoChatBtn()">
                            问诊工具
                        </div>
                    </div>
                    <div class="col-xs-12 media-box us-media">
                        <div id="localVideos">
                            <video class="localVideo1" v-if="localVideoVisable" id="video" width="640" height="480" autoplay></video>
                        </div>
                        <div>
                            <!-- <video-chat></video-chat> -->
                            <div class="videoTopBtnBox">
                                <div>
                                    <img src="./../../static/assets/img/danganVideo.png" /> 查档案
                                </div>
                                <div>
                                    <div>屏幕分享</div>
                                    <div @click="openPatientNum()">列表</div>
                                </div>
                            </div>
                            <div class="videoBtn" v-show="guaVisable">
                                <div @click="closeTheVideo()">
                                    <div><img src="./../../static/assets/img/gua1.png" /></div>
                                    <div>挂断</div>

                                </div>
                                <div @click="closeVideo()">
                                    <div><img src="./../../static/assets/img/videoD1.png" /></div>
                                    <div>关闭视频</div>
                                </div>
                            </div>
                        </div>
                        <div class="videoChatBox" v-show="videoChatVisable">
                            <videoChat :sessionId="sessionId" :doctorVis="doctorVis"></videoChat>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div class="patientClass" v-show="closePatientNumVisable">
            <div @click="closePatientNum()">
                关闭
            </div>
            <div class="patientClass0" v-show="patientVisable">
                <h3>正在排队</h3>
                <ul>
                    <li @click="createChat(thePatientMessage.userId)">
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
                    <li v-for="(text,index) in noLineNum" :key="index" @click="createChat(text.userId)">
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
    </div>
</template>
<script>
import "../../static/assets/css/jquery-impromptu.css";
import videoChat from "../public/publicComponents/videoChat.vue";
import apiBaseURL from "../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {
    doctorInto,
    doctorGetList,
    doctorClickList,
    createVideoRoom,
    fetchChatSession,
    doctorQuit,
    doctorHangupNext,
    storageUsers,
    closeVideoRoom
} from "../api/apiAll.js";
export default {
    name: "video",
    components: {
        videoChat
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
            oSeaver: "meet.xiaoqiangio.com",
            oUser: "gfki",
            oPassWord: "1qaz@WSX",
            patientNum: "", //排队患者
            noLineNum: "", //未完成排队数
            thePatientMessage: {},
            noLineVisable: false,
            patientVisable: false,
            createVideoRoomData1: {},
            localVideoVisable: true,
            sessionId: "",
            oUserId: "", //当前就诊人id
            guaVisable: false,
            questVisable: false,
            closePatientNumVisable: false,
            videoChatVisable: false,
            doctorVis: 1,
            videoIng: 0
        };
    },
    methods: {
        openPatientNum() {
            this.closePatientNumVisable = true;
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
                if ((oMessage = "cancle")) {
                    oMessage = "取消了视频通话";
                } else if ((oMessage = "refuse")) {
                    oMessage = "拒绝了视频通话";
                } else if ((oMessage = "videoing")) {
                    oMessage = "对方正在视频通话中";
                } else if ((oMessage = "complete")) {
                    oMessage = "视频通话已结束";
                } else if ((oMessage = "accept")) {
                    oMessage = "接受了视频聊天";
                } else if ((oMessage = "complete")) {
                    oMessage = "视频通话已结束";
                }
            }
            console.log(childMessageType + oMessage);
            this.messageList.push({
                from: ouserId,
                content: oMessage,
                serverTime: oMessageTime,
                childMessageType: childMessageType
            });
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
                stream.onended = noStream;
                video.onloadedmetadata = function() {
                    // alert("摄像头成功打开！");
                };
            }

            function noStream(err) {
                alert(err);
            }

            // document
            //     .getElementById("snap")
            //     .addEventListener("click", function() {
            //         ctx.drawImage(aVideo, 0, 0, 640, 480); //将获取视频绘制在画布上
            //     });
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
        async createChat(ouserId) {
            this.oUserId = ouserId;
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                to: ouserId
            };
            const res = await fetchChatSession(query, options);
            if (res.data && res.data.errCode === 0) {
                _this.sessionId = res.data.body;
                _this.createVideo(ouserId);
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
                    _this.videoIng = 1;
                    _this.closePatientNumVisable = false;
                    _this.localVideoVisable = false;
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
            if (this.videoChatVisable) {
                this.videoChatVisable = false;
                this.guaVisable = true;
            } else {
                this.videoChatVisable = true;
                this.guaVisable = false;
            }
        },
        //挂断当前视频
        async closeTheVideo() {
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
                _this.localVideoVisable = true;
                _this.videoIng = 0;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //关闭视频
        async closeVideo() {
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
                this.closeVideoRoom(1);
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
                let childMessageType = 7;
                let messageBody = "MicroCinic&" + "hangup";

                _this.sendMessageChat(childMessageType, messageBody);
                _this.deleteVideoRoom();
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
            var server = $("#server").val();
            // var server=this.oSeaver
            var server = "meet.xiaoqiangio.com";
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
            alert(this.createVideoRoomData1.conferenceNumber);
            let _this = this;
            // var conferenceName = $("#anonymousConferenceName").val();
            let conferenceName = this.createVideoRoomData1.conferenceNumber;
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
            Manis.addScreenSourceToConnection(function(result) {
                if (result.code == 200) {
                    console.info(
                        "success add screen source to connection : ",
                        result
                    );
                } else {
                    console.error(result);
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
        this.createVideoRoomData1 = this.createVideoRoomData;
        let _this = this;

        if (this.videoType == "门诊") {
            this.getLocal();
            this.enterRoomBtn();
            this.noLineUpNum();
            this.getThePatient();
        } else {
            alert("1234");
            this.firstSet();
        }

        /**
         * 收到有人进入房间
         */
        Manis.onJoinConference(function(result) {
            $("#remoteVideos").append(_this.generateParticipant(result, false));
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
    beforeCreate() {
        const linkData = document.createElement("link");
        linkData.id = "linkdata";
        linkData.href =
            "../../static/Manis-Meetings-Chrome-Extension_v0.0.9.crx";
        document.body.appendChild(linkData);
    },
    beforeDestroy() {
        document.body.removeChild(document.getElementById(linkdata));
    },
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
        }
    },
    props: {
        createVideoRoomData: Object,
        videoType: String,
        oClinicId: String
    },
    model: {
        prop: ["createVideoRoomData", "videoType", "oClinicId"],
        event: "reBack"
    }
};
</script>
<style  scope>
video {
    width: 100%;
    padding: 0.2em 0em;
    background-color: #222;
}

#localVideos div,
#remoteVideos div {
    background-color: #222;
    color: #fefefe;
    margin-top: 0.2em;
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
}
.us-media {
    position: relative;
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
    width: 30%;
    height: 768px;
}
.us-media {
    width: 70%;
}

#remoteVideos {
    padding: 10px;
    background: white;
    box-shadow: 10px 10px 5px #888888;
}
#localVideos div,
#remoteVideos div {
    background: none;
}
.videoChatBtn {
    position: absolute;
    bottom: 10px;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
}
.patientClass {
    position: fixed;
    right: 0;
    top: 56px;
    padding-top: 68px;
    width: 304px;
    height: 1000px;
    background: rgba(0, 0, 0, 0.3);
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
    height: 768px;
}
.videoChatBox {
    position: absolute;
    bottom: -253px;
}
</style>

