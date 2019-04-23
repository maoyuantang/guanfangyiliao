<template>
    <div class="viewClass">
        <ul>
            <li class="ohisList" v-for="(text,index) in messageList" :key="index">
                <h3>{{text.time}}</h3>
                <ul>
                    <li class="ohisListMain" v-for="(text1,index1) in text.otimeList" :key="index1">
                        <div>
                            <img :src="userSocketInfo.headImg+text1.from" :onerror="defaultImg" />
                        </div>
                        <div class="ohisListRg">
                            <div>{{text1.fromNickName}}
                                <span> {{text1.serverTime2}}</span>
                            </div>
                            <div class="imgClass" v-if="text1.childMessageType=='IMAGE'">
                                <img :src="text1.body" />
                            </div>
                            <div v-else>{{text1.body}}</div>
                        </div>
                    </li>
                </ul>
            </li>
            <li v-show="moreLoadVisable" class="moreLoad" @click="moreLoadMessage()">加载更多</li>
        </ul>
        <noData v-show="nodataVisable"></noData>
    </div>
</template>
<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import { fetchHistoryMessage } from "../../api/apiAll.js";
import noData from "../../public/publicComponents/noData.vue";

export default {
    components: {
        noData
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
            messageList: [],
            timeList: [],
            nodataVisable: false,
            storyMessage: [],
            msgId: -1,
            imgUrl:
                "https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/",
            moreLoadVisable: false,
            defaultImg:
                'this.src="' +
                require("../../assets/img/doctorImg.png") +
                '"'
        };
    },

    methods: {
        //获取历史记录
        async getStoryMessage(index) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                userId: this.userSelfInfo.userId,
                sessionId: [this.sessionId],
                msgId: this.msgId,
                pageNums: 15
            };
            const res = await fetchHistoryMessage(query, options);
            if (res.data && res.data.errCode === 0) {
                // _this.storyMessage = [];
                $.each(res.data.body, function(index, text) {
                    _this.storyMessage.push(text);
                });
                // _this.storyMessage = res.data.body;
                let oLength = res.data.body.length;
                if (_this.storyMessage.length < 1) {
                    _this.nodataVisable = true;
                    _this.moreLoadVisable = false;
                } else {
                    _this.nodataVisable = false;
                    _this.moreLoadVisable = true;
                    _this.msgId = res.data.body[oLength - 1].msgId;
                }

                _this.resolveMessage();
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        resolveMessage() {
            let _this = this;
            this.timeList = [];
            this.messageList = [];
            $.each(this.storyMessage, function(index, text) {
                if (text.childMessageType == "INTERROGATION") {
                    //问诊
                    text.body = "问诊表";
                } else if (text.childMessageType == "ARTICLE") {
                    //文章
                    text.body = "文章";
                } else if (text.childMessageType == "CRVIDEO") {
                    //视频
                    text.body = "视频";
                } else if (text.childMessageType == "FOLLOWUP") {
                    //随访
                    text.body = "随访";
                } else if (text.childMessageType == "AUDIO") {
                    //音频
                    text.body = "该消息为音频消息,请在手机上查看";
                } else if (
                    text.childMessageType == "VIDEO" ||
                    text.childMessageType == "CRVIDEO"
                ) {
                    //视频
                    if (text.body.indexOf("refuse") > -1) {
                        text.body = "挂断了视频";
                    } else if (
                        text.body.indexOf("sendroom") > -1 ||
                        text.body.indexOf("MicroCinicSendRoom") > -1
                    ) {
                        text.body = "发起了视频聊天";
                    } else if (text.body.indexOf("complete") > -1) {
                        text.body = "视频通话已结束";
                    } else if (text.body.indexOf("cancle") > -1) {
                        text.body = "取消了视频";
                    } else if (text.body.indexOf("accept") > -1) {
                        text.body = "接受了视频";
                    }
                } else if (text.childMessageType == "IMAGE") {
                    text.body = _this.userSocketInfo.imgUrl + text.body;
                } else {
                    text.body = text.body;
                }

                let timestamp4 = new Date(text.serverTime); //时间搓转换
                let oyear = timestamp4.getFullYear();
                let omouth = timestamp4.getMonth() + 1;
                let oDate = timestamp4.getDate();
                let ohour = timestamp4.getHours();
                let oMinutes = timestamp4.getMinutes();
                let oSeconds = timestamp4.getSeconds();
                text.serverTime1 =
                    oyear +
                    "-" +
                    _this.ogetTime(omouth) +
                    "-" +
                    _this.ogetTime(oDate);
                text.serverTime2 =
                    _this.ogetTime(ohour) +
                    ":" +
                    _this.ogetTime(oMinutes) +
                    ":" +
                    _this.ogetTime(oSeconds);

                let allTime =
                    oyear +
                    "-" +
                    _this.ogetTime(omouth) +
                    "-" +
                    _this.ogetTime(oDate);
                let ohourTime =
                    _this.ogetTime(ohour) +
                    ":" +
                    _this.ogetTime(oMinutes) +
                    ":" +
                    _this.ogetTime(oSeconds);
                if (_this.timeList.indexOf(allTime) > -1) {
                    $.each(_this.messageList, function(index1, text1) {
                        if (text1.time == allTime) {
                            text1.otimeList.push(text);
                        }
                    });
                } else {
                    _this.messageList.push({
                        time: allTime,
                        otimeList: []
                    });
                    _this.timeList.push(allTime);
                }
            });
        },
        ogetTime(s) {
            return s < 10 ? "0" + s : s;
        },
        moreLoadMessage() {
            this.getStoryMessage();
        }
    },
    created() {
        // this.msgId=this.$store.state.socket.messageTicket.oMsgId
        if(this.sessionId){
this.getStoryMessage();
this.nodataVisable=false
        }else{
this.nodataVisable=true
        }
        
    },
    props: {
        sessionId: String
    },
    model: {
        prop: ["sessionId"],
        event: "reBack"
    }
};
</script>
<style>
/* 查看记录 */
.hisMain {
    padding: 10px 28px;
}

.ohisList {
    margin-bottom: 25px;
}

.ohisList > h3 {
    margin-bottom: 15px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #000000;
    letter-spacing: -0.4px;
    font-weight: normal;
}

.ohisListMain {
    display: flex;
    display: -webkit-flex;
    margin-bottom: 15px;
}

.ohisListMain > div:first-child {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 12px;
}

.ohisListMain > div:first-child > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.ohisListRg > div {
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    color: #323c47;
}

.ohisListRg > div:first-child {
    color: #939eab;
    font-size: 0.12rem;
}
.moreLoad {
    text-align: center;
    cursor: pointer;
}
.viewClass {
    overflow: auto;
    /* height: 520px; */
}
.imgClass {
    width: 50px;
    height: 40px;
}
.imgClass > img {
    width: 100%;
    height: 100%;
}
/* 
谭莹
先掉14.4.拉取历史消息记录，获取到的消息放在storyMessage里面传过来
<viewRecord :storyMessage="storyMessage"></viewRecord>
 */
</style>
