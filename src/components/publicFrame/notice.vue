<template>
    <div class="noticeBox">
        <ul>
            <li class="noticeList" v-for="(text,index) in noticeList" :key="index">
                <h4>{{text.noticeData.title}}
                    <span>{{text.noticeTime}}</span>
                </h4>
                <div>
                    {{text.noticeData.body}}
                    <button v-if="text.noticeData.notice=='COOPERATION_I'" type="button" class="noticeBtnClass" @click="inviteReplyClick()">
                        <span>同意</span>
                    </button>
                    <button v-if="text.noticeData.notice=='COOPERATION'" type="button" @click="toConsultation(text.noticeData)" class="noticeBtnClass">
                        <span>进入协作</span>
                    </button>
                    <button v-if="text.noticeData.notice=='CLINIC'" type="button" class="noticeBtnClass" @click="enterRoomBtn(text.noticeData)">
                        <span>进入诊室</span>
                    </button>
                </div>
            </li>
        </ul>
        <div class="loadMore" @click="getNoticeList()">
            加载更多
        </div>
        <div v-show="nodataVisable">
            <nodata></nodata>
        </div>
        <!-- 聊天 -->
        <div v-if="chatVisible">
            <el-dialog class="chatDialog" title="" :visible.sync="chatVisible" width="680px">
                <chat :sessionId="sessionId" :doctorVis="doctorVis"></chat>
            </el-dialog>
        </div>

        <!-- 视频聊天 -->
        <div v-if="centerDialogVisible">
            <el-dialog class='videoClassBox' title="" :visible.sync="centerDialogVisible" center append-to-body fullscreen @close="closeVideo()" :showClose="VideoshowClose">
                <ovideo :createVideoRoomData="createVideoRoomData" :videoType="videoType" :oClinicId="oClinicId" @reback="videoclick" :doctorVis='doctorVis1' :userMessage="userMessage">
                </ovideo>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import {
    fetchNoticeInfo,
    inviteReply,
    synergyInto,
    doctorInto
} from "../../api/apiAll.js";
import nodata from "../../public/publicComponents/noData.vue";
export default {
    components: {
        nodata
    },
    data() {
        return {
            noticeList: [],
            msgId: 1,
            nodataVisable: false,
            chatVisible: false,
            sessionId: "",
            doctorVis: 0,
            doctorVis1:1,
            userMessage: {},
            centerDialogVisible: false,
            VideoshowClose: false,
            createVideoRoomData: {
                conferenceId: "",
                conferenceNumber: ""
            },
             videoType: "门诊",
             oClinicId:''
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        videoclick(data) {
        this.centerDialogVisible = false;
      },
        async getNoticeList() {
            this.msgId = this.$store.state.socket.messageTicket.oMsgId;
            let _this = this;
            let query = {
                token: this.userState.token,
                msgId: this.msgId,
                pageNums: 10
            };
            const res = await fetchNoticeInfo(query);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body, function(index, text) {
                    _this.noticeList.push(text);
                });
                this.msgId = res.data.body.msgId;
                if (res.data.body.length > 0) {
                    this.nodataVisable = false;
                } else {
                    this.nodataVisable = true;
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
                id: "协作id",
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
        //进入协作
        async toConsultation(row) {
            this.sessionId = row.sessionId;

            let _this = this;
            let query = {
                token: this.userState.token,
                id: "协作idrow.id"
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
        //进入门诊
        async enterRoomBtn(text) {
            this.userMessage = {
                clinicId: text.id,
                departmentId: text.departmentId
            };

            // this.oClinicId = text.id;
            let _this = this;
            let query = {
                token: this.userInfo.token
            };
            const options = {
                clinicId: text.id
            };
            const res = await doctorInto(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                _this.centerDialogVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
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
        this.getNoticeList();
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
