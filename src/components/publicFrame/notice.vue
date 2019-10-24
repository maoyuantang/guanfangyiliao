<template>
    <div class="noticeBox">
        <ul>
            <li class="noticeList" v-for="(text,index) in noticeList" :key="index">
                <h4>{{text.noticeData.title}}
                    <span>{{text.noticeTime}}</span>
                </h4>
                <div>
                    {{text.noticeData.body}}
                    <button v-if="text.noticeData.notice=='COOPERATION'" type="button" class="noticeBtnClass" @click="inviteReplyClick(text.noticeData)">
                        <span>同意</span>
                    </button>
                    <button v-if="text.noticeData.notice=='COOPERATION_I'" type="button" @click="toConsultation(text.noticeData)" class="noticeBtnClass">
                        <span>进入协作</span>
                    </button>
                    <button v-if="text.noticeData.notice=='CLINIC'" type="button" class="noticeBtnClass" @click="enterRoomBtn(text.noticeData)">
                        <span>进入诊室</span>
                    </button>

                    <button v-if="text.noticeData.notice=='CONSULTATION'" type="button" class="noticeBtnClass" @click="enterHuiz(text.noticeData)">
                        <span>进入会诊</span>
                    </button>

                </div>
            </li>
        </ul>
        <div class="loadMore" @click="getNoticeList(0)">
            加载更多
        </div>
        <div v-show="nodataVisable">
            <nodata></nodata>
        </div>
        <!-- 聊天 -->
        <div v-if="chatVisible">
            <el-dialog :close-on-click-modal="false" class="chatDialog" title="" :visible.sync="chatVisible" width="680px" append-to-body>
                <chat :sessionId="sessionId" :doctorVis="doctorVis" :chatTypeBox="chatTypeBox1"></chat>
            </el-dialog>
        </div>

        <!-- 视频聊天 -->
        <div v-if="centerDialogVisible">
            <el-dialog :close-on-click-modal="false" class='videoClassBox' title="" :visible.sync="centerDialogVisible" center append-to-body fullscreen @close="closeVideo()" :showClose="VideoshowClose">
                <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId" @reback="videoclick" :doctorVis='doctorVis1' :userMessage="userMessage" :chatTypeBox="chatTypeBox">
                </ovideo>
            </el-dialog>
        </div>

        <!-- <div v-if="centerDialogVisible">
            <el-dialog :close-on-click-modal="false" class='videoClassBox' title="" :visible.sync="centerDialogVisible" center append-to-body fullscreen @close="closeVideo()" :showClose="VideoshowClose">
                <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId" @reback="videoclick" :doctorVis='doctorVis' :userMessage="userMessage" :chatTypeBox="chatTypeBox">
                </ovideo>
            </el-dialog>
        </div> -->
    </div>
</template>
<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {
    fetchNoticeInfo,
    inviteReply,
    synergyInto,
    doctorInto,
    userInfo,
    updateConsultationStatus
} from "../../api/apiAll.js";
import nodata from "../../public/publicComponents/noData.vue";
import chat from "../../public/publicComponents/chat.vue";

import ovideo from "../../video/oVideo.vue";
export default {
    components: {
        nodata,
        ovideo,
        chat
    },
    data() {
        return {
            chatTypeBox1: {
                startDoctorName: "",
                startDoctorTYpe: "协作",
                archivesUrl: ""
            },
            chatTypeBox: {
                startDoctorName: "",
                startDoctorTYpe: "门诊"
            },
            noticeList: [],
            msgId: 1,
            nodataVisable: false,
            chatVisible: false,
            sessionId: "",
            doctorVis: 0,
            doctorVis1: 1,
            userMessage: {},
            centerDialogVisible: false,
            VideoshowClose: false,
            createVideoRoomData: {
                conferenceId: "",
                conferenceNumber: ""
            },
            videoType: "门诊",
            oClinicId: "",
            sendUserName: ""
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        })
    },
    watch: {
        "userSocketInfo.synchroMessage": {
            handler(n, o) {
                let _this = this;
                $.each(n.syncData, function(index, text) {
                    if (text.command == "SYNC_SESSION") {
                        _this.msgId =
                            _this.$store.state.socket.messageTicket.oMsgId;
                        _this.getNoticeList();
                    }
                });
            }
        }
    },
    methods: {
        videoclick(data) {
            this.centerDialogVisible = false;
        },
        async getNoticeList(num) {
            let _this = this;
            let query = {
                token: this.userState.token,
                msgId: this.msgId,
                pageNums: 10
            };
            const res = await fetchNoticeInfo(query);
            if (res.data && res.data.errCode === 0) {
                if (res.data.body.length > 0) {
                    if (num == 0) {
                        $.each(res.data.body, function(index, text) {
                            _this.noticeList.push(text);
                        });
                    } else {
                        _this.noticeList = res.data.body;
                    }

                    let oLength = res.data.body.length;
                    _this.msgId = res.data.body[oLength - 1].msgId;
                    if (res.data.body.length > 0) {
                        this.nodataVisable = false;
                    } else {
                        this.nodataVisable = true;
                    }
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //同意协作
        async inviteReplyClick(row) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                id: row.senderUserId,
                accept: true
            };
            const res = await inviteReply(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "同意成功"
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // async getUserMessage(row) {
        //     this.sendUserName=""
        //     let _this = this;
        //     let query = {
        //         token: this.userState.token,
        //         userId: row.senderUserId,
        //         oneself: true
        //     };
        //     const res = await userInfo(query);
        //     if (res.data && res.data.errCode === 0) {
        //         _this.sendUserName=res.data.body.name
        //         _this.chatTypeBox1.startDoctorName=res.data.body.name
        //     } else {
        //         //失败
        //         this.$notify.error({
        //             title: "警告",
        //             message: res.data.errMsg
        //         });
        //     }
        // },
        //进入协作
        async toConsultation(row) {
            // this.getUserMessage(row);
            console.log(row.body.indexOf("邀请您"));
            let oindex = row.body.indexOf("邀请您");
            this.chatTypeBox1.startDoctorName = row.body.substring(0, oindex);
            this.chatTypeBox1.startDoctorTYpe = "协作";
            this.sessionId = row.sessionId;

            let _this = this;
            let query = {
                token: this.userState.token,
                id: row.senderUserId
            };
            const res = await synergyInto(query);
            if (res.data && res.data.errCode === 0) {
                _this.chatVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //进入会诊
        async enterHuiz(row) {
            let oindex = row.body.indexOf("邀请你");
            this.chatTypeBox1.startDoctorName = row.body.substring(0, oindex);
            this.chatTypeBox1.startDoctorTYpe = "会诊";
            this.sessionId = row.sessionId;

            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                consultationId: row.senderUserId,
                status: "UNDERWAY"
            };
            const res = await updateConsultationStatus(query, options);
            if (res.data && res.data.errCode === 0) {
                _this.chatVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //进入门诊
        async enterRoomBtn(text) {
            this.chatTypeBox1.startDoctorTYpe = "会诊";
            console.log(this.$route.path);

            console.log(text);
            this.userMessage = {
                clinicId: text.clinicId,
                departmentId: this.userSelfInfo.depts[0].deptId
            };

            this.oClinicId = text.clinicId;
            this.centerDialogVisible = true;
            // let _this = this;
            // let query = {
            //     token: this.userState.token
            // };
            // const options = {
            //     clinicId: text.clinicId
            // };
            // const res = await doctorInto(query, options);
            // console.log(res);
            // if (res.data && res.data.errCode === 0) {
            //     _this.centerDialogVisible = true;
            // } else {
            //     //失败
            //     this.$notify.error({
            //         title: "警告",
            //         message: res.data.errMsg
            //     });
            // }
        }
    },
    props: {
        addQuestId: String,
        sendToUserId: String
    },
    model: {
        prop: ["addQuestId", "sendToUserId"],
        event: "reBack"
    },
    created() {
        this.msgId = this.$store.state.socket.messageTicket.oMsgId;
        // alert(this.$store.state.socket.messageTicket.oMsgId);
        this.getNoticeList();
        this.chatTypeBox1.archivesUrl = this.$route.path;
    }
};
</script>
<style>
.noticeBox {
    height: 600px;
    overflow: auto;
}
.noticeList > h4 {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #5e6875;
    letter-spacing: 0;
}
.noticeList > h4 > span {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #002257;
    line-height: 22px;
}
.noticeList > div:nth-child(2) {
    position: relative;
    width: 100%;
    height: 67px;
    background: #f3f6fa;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #002257;
    line-height: 22px;
}
.noticeList > div:nth-child(2) button {
    position: absolute;
    right: 10px;
    bottom: 10px;
}
.loadMore {
    padding-top: 25px;
    text-align: center;
    cursor: pointer;
}

.noticeBtnClass {
    width: 57px;
    height: 20px;
    background: rgba(66, 133, 244, 0.1);
    border: 1px solid rgba(66, 133, 244, 0.6);
    border-radius: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #4285f4;
    line-height: 1px;
}
</style>
