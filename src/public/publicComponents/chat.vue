<template>
    <div class="chat">
        <div>
            {{chatUser}}
        </div>
        <div class="chatMessage">
            <ul class="chatRecord">
                <li v-for="(text,index) in messageList" :key="index"  :class="text.from==userSelfInfo.userId?'recordRg':'recordLf'">
                    <div class="otherImg">
                        <img src="../../assets/日照宝宝.jpg" />
                       
                    </div>
                    <div class="otherCon">
                        <h4> 
                            <span class="peopleName">{{text.name}}</span>
                            <span class="otime">{{text.serverTime}}</span>
                        </h4>
                        <div>
                            <div style="float:left">
                                <span class="allReadColor" v-if="text.oRead">已读 </span>
                                <span class="noReadColor" v-else>未读77 </span> {{text.content}} </div>
                        </div>
                    </div>
                </li>
                <!-- <li class="recordRg">
                    <div class="otherImg">
                        <img src="../../assets/日照宝宝.jpg" />
                    </div>
                    <div class="otherCon">
                        <h4>
                            <span class="peopleName">日照宝宝</span>
                            <span class="otime">11:28</span>
                        </h4>
                        <div>
                            <div class=" followCon">
                                <div>

                                </div>
                                <div>
                                    <h3>问诊表/随访表的标题</h3>
                                    <div>2018中医国际标准</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li> -->

            </ul>
        </div>
        <div class="sendIcon">
            <span title="发送图片">
                <!-- <input type="file" name="file" class="layui-upload-file" id="test" lay-title=" " style='opacity:0;width:25px;'> -->
                <img src="../../assets/sendNew1.png" />
            </span>
            <span title="发送视频">
                <img src="../../assets/sendNew2.png" />
            </span>
            <span title="发送文章">
                <img src="../../assets/sendNew3.png" />
            </span>
            <span title="发送随访">
                <img src="../../assets/sendNew4.png" />
            </span>
            <span title="发送问诊">
                <img src="../../assets/sendNew5.png" />
            </span>
            <span title="添加备注">
                <img src="../../assets/sendNew6.png" />
            </span>
            <span title="药品处方">
                <img src="../../assets/sendNew8.png" />
            </span>
            <span title="计划">
                <img src="../../assets/sendNew9.png" />
            </span>
            <span title="录入档案">
                <img src="../../assets/sendNew10.png" />
            </span>
            <span title="健康处方">
                <img src="../../assets/sendNew11.png" />
            </span>
            <span title="转诊">
                <img src="../../assets/sendNew12.png" />
            </span>
            <span title="聊天记录">

            </span>
        </div>
        <div>
            <el-input class="chatInputK" type="textarea" :rows="2" placeholder="请输入内容" v-model="messageBody">
            </el-input>
            <button class="sendMessage" @click="sendMessageChat()">发送</button>
        </div>
    </div>
</template>

<script>
import protobuf from "protobufjs";
import { mapState } from "vuex";
// import websocket from "../../common/websocket.js";
import filesJs from "../../common/files.js";
import {
    fetchHistoryMessage,
    fetchSessionMembers,
    fetchReadMessageId
} from "../../api/apiAll.js";

let websocket = require("../../common/websocket.js");

export default {
    data() {
        return {
            areadyReadNum: "", //已读
            chatUser: "", //参与聊天的成员
            messageList: [],
            input: "",
            childMessageType: "", //发送的消息类型
            messageBody: "", //发送的文字消息内容
            chatType: "", //单聊或群聊
            to: "B43F34E1D4014D4F98ED57BA86B2239F" //接受者Id
            // sessionId: "" //会话Id
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    created() {
        this.getHisRecord();
        this.getMemberMess();
        this.alreadyRead();
        console.log(this.sessionId);
    },
    methods: {
        sendMessage2() {
            websocket = require("../../common/websocket.js");
            var ohtml = websocket.default.getContent();
            console.log(ohtml);
        },

        //已读未读
        async alreadyRead() {
            console.log(this.userSelfInfo.userId);
            let query = {
                token: this.userState.token
            };
            const options = {
                sessionId: this.sessionId
            };
            const res = await fetchReadMessageId(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.areadyReadNum = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //拉取会话好友列表
        async getMemberMess() {
            let _this = this;
            console.log(this.sessionId);
            let query = {
                token: this.userState.token
            };
            const options = {
                sessionId: this.sessionId,
                pageIndex: 1,
                pageNums: 50
            };
            const res = await fetchSessionMembers(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data.body);
                $.each(res.data.body, function(index, text) {
                    if (_this.chatUser == "") {
                        _this.chatUser = text.userName;
                    } else {
                        _this.chatUser = _this.chatUser + "," + text.userName;
                    }
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取历史记录
        async getHisRecord() {
            console.log(this.sessionId);
            let query = {
                token: this.userState.token
            };
            const options = {
                userId: this.userSelfInfo.userId,
                sessionId: [this.sessionId],
                msgId: websocket.default.getMsgId(),
                pageNums: 15
            };
            console.log(Object.prototype.toString.call([this.sessionId]));
            const res = await fetchHistoryMessage(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data.body);
                // let odata = [
                //     {
                //         id: "5b8f7eb42bfacc279cea20cc",
                //         sessionId: "#9b7b21c703044d78a83b2f459e746411",
                //         messageType: "SESSION",
                //         childMessageType: "DEFAULT",
                //         from: "b462c046b0bd11e8ba2f000c29bf158c",
                //         fromNickName: "唐宇",
                //         to: "",
                //         toNickName: "",
                //         title: "",
                //         summary: "",
                //         body: "456",
                //         clientTime: 0,
                //         serverTime: 1536130740864,
                //         unReadNum: 0,
                //         sequence: 59,
                //         msgId: 99,
                //         chatType: "DOCTOR",
                //         at: [],
                //         instruct: [],
                //         conferenceId: "",
                //         deleteType: false,
                //         new: false
                //     },
                //     {
                //         id: "5b8f7eb32bfacc279cea20cb",
                //         sessionId: "#9b7b21c703044d78a83b2f459e746411",
                //         messageType: "SESSION",
                //         childMessageType: "DEFAULT",
                //         from: "b462c046b0bd11e8ba2f000c29bf158c",
                //         fromNickName: "唐宇",
                //         to: "",
                //         toNickName: "",
                //         title: "",
                //         summary: "",
                //         body: "123",
                //         clientTime: 0,
                //         serverTime: 1536130739827,
                //         unReadNum: 0,
                //         sequence: 58,
                //         msgId: 98,
                //         chatType: "DOCTOR",
                //         at: [],
                //         instruct: [],
                //         conferenceId: "",
                //         deleteType: false,
                //         new: false
                //     }
                // ];
                let odata = res.data.body.reverse();
                this.messageList = odata;
                $.each(this.messageList, function(index, text) {
                    let timestamp4 = new Date(text.serverTime);
                    let y = timestamp4.getHours();
                    // let m = timestamp4.getMonth() + 1;
                    let d = timestamp4.getMinutes();
                    if (y <= 9) {
                        y = "0" + y;
                    }
                    if (d <= 9) {
                        d = "0" + d;
                    }
                    console.log(y + "-" + d);
                    text.serverTime = y + ":" + d;
                    //  text.serverTime=
                });

                for (let i = 0; i < odata.length; i++) {
                    if (this.areadyReadNum > odata[i].msgId) {
                        this.messageList[i].oRead = true;
                    } else {
                        this.messageList[i].oRead = false;
                    }

                    if (odata[i].from != this.userSelfInfo.userId) {
                        if (odata[i].childMessageType == "INTERROGATION") {
                            //问诊
                            this.messageList[i].content =
                                '<div class=" followCon"> <div> </div> <div> <h3>问诊表/随访表的标题</h3> <div>2018中医国际标准</div>  </div> </div>';
                        } else if (odata[i].childMessageType == "ARTICLE") {
                            //文章
                            this.messageList[i].content = "文章";
                        } else if (odata[i].childMessageType == "CRVIDEO") {
                            //视频
                            this.messageList[i].content = "视频";
                        } else if (odata[i].childMessageType == "FOLLOWUP") {
                            //随访
                            this.messageList[i].content = "随访";
                        } else if (odata[i].childMessageType == "AUDIO") {
                            //音频
                            this.messageList[i].content = "音频";
                        } else if (odata[i].childMessageType == "VIDEO") {
                            //视频
                            if (odata[i].body.indexOf("refuse") > -1) {
                                this.messageList[i].content =
                                    "<span>挂断了视频</span>";
                            } else if (odata[i].body.indexOf("sendroom") > -1) {
                                this.messageList[i].content =
                                    "<span>发起了视频聊天</span>";
                            } else if (odata[i].body.indexOf("complete") > -1) {
                                this.messageList[i].content =
                                    "<span>视频通话已结束</span>";
                            } else if (odata[i].body.indexOf("cancle") > -1) {
                                this.messageList[i].content =
                                    "<span>取消了视频</span>";
                            }
                        } else if (odata[i].childMessageType == "IMAGE") {
                        } else {
                            this.messageList[i].content = odata[i].body;
                        }
                    } else {
                        if (odata[i].childMessageType == "INTERROGATION") {
                            //问诊
                            this.messageList[i].content =
                                '<div class=" followCon"> <div> </div> <div> <h3>问诊表/随访表的标题</h3> <div>2018中医国际标准</div>  </div> </div>';
                        } else if (odata[i].childMessageType == "ARTICLE") {
                            //文章
                            this.messageList[i].content = "文章";
                        } else if (odata[i].childMessageType == "CRVIDEO") {
                            //视频
                            this.messageList[i].content = "视频";
                        } else if (odata[i].childMessageType == "FOLLOWUP") {
                            //随访
                            this.messageList[i].content = "随访";
                        } else if (odata[i].childMessageType == "AUDIO") {
                            //音频
                            this.messageList[i].content = "音频";
                        } else if (odata[i].childMessageType == "VIDEO") {
                            //视频
                            if (odata[i].body.indexOf("refuse") > -1) {
                                this.messageList[i].content =
                                    "<span>挂断了视频</span>";
                            } else if (odata[i].body.indexOf("sendroom") > -1) {
                                this.messageList[i].content =
                                    "<span>发起了视频聊天</span>";
                            } else if (odata[i].body.indexOf("complete") > -1) {
                                this.messageList[i].content =
                                    "<span>视频通话已结束</span>";
                            } else if (odata[i].body.indexOf("cancle") > -1) {
                                this.messageList[i].content =
                                    "<span>取消了视频</span>";
                            }
                        } else if (odata[i].childMessageType == "IMAGE") {
                        } else {
                            this.messageList[i].content = odata[i].body;
                        }
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
        //发送
        sendMessageChat() {
            let odate = new Date();
            let oHour = odate.getHours();
            let oMinite = odate.getMinutes();
            if (oHour <= 9) {
                oHour = "0" + oHour;
            }
            if (oMinite <= 9) {
                oMinite = "0" + oMinite;
            }
            this.messageList.push({
                content: this.messageBody,
                serverTime: oHour + ":" + oMinite
            });
            let timestamp = Date.parse(new Date());
            let tag = "img"; //辨识图片
            if (this.messageBody.indexOf(tag) != -1) {
                this.childMessageType = 5;
            } else {
                this.childMessageType = 0;
            }
            console.log(this.userSelfInfo);
            let Iessage = {
                RequestType: 4,
                ticket: websocket.default.getTicket(),
                info: {
                    messageType: 0, //消息
                    childMessageType: this.childMessageType, //文本
                    from: this.userSelfInfo.userId, //userid
                    fromNickName: this.userSelfInfo.name, //昵称
                    toNickName: "管理员",
                    to: this.sessionId, //发给谁，接收者的用户ID
                    body: this.messageBody, //消息内容
                    // groupId: this.seccionId,
                    // sessionId:this.sessionId,
                    sequence: websocket.default.getSequence(), //消息发送序号。
                    chatType: 0, //单聊  GROUP 群聊
                    clientTime: timestamp,
                    serverTime: websocket.default.getServerTime()
                }
            };
            console.log(Iessage);
            console.log(websocket);
            websocket.default.sendMessage(Iessage);

            // let aaa=websocket.dadaTransfer
        },
        searchBtn() {
            this.$emit("searchValue", this.input);
        }
    },
    props: {
        sessionId: String //会话Id
    },
    model: {
        prop: ["seccionId"],
        event: "reBack"
    }
};
</script>

<style>
.chat {
    width: 636px;
    height: 534px;
}
.chatMessage {
    width: 100%;
    height: 280px;
    margin-bottom: 12px;
    border-bottom: 1px solid #e5edf3;
}
.sendIcon {
    display: flex;
    display: -webkit-flex;
}
.sendIcon > span {
    margin: 0 3px;
    display: inline-block;
    width: 44px;
    height: 55px;
    color: white;
    text-align: center;
    line-height: 20px;
    font-size: 8px;
    cursor: pointer;
}
.chatRecord > li {
    width: 100%;
    margin-bottom: 10px;
}
.recordLf {
    display: flex;
    text-align: left;
}
.recordLf .otherImg {
    margin-right: 15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.recordLf .otherImg > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.recordLf .otherCon h4 {
    font-family: Lato-Bold;
    font-size: 14px;
    color: #323c47;
    letter-spacing: 0;
    line-height: 27px;
}
.recordLf .otherCon h4 span {
    font-family: Lato-Regular;
    font-size: 12px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 22px;
}
.recordLf .otherCon div {
    font-family: Lato-Regular;
    font-size: 14px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 27px;
}
.recordRg {
    text-align: right;
}
.recordRg .otherImg {
    float: right;
    margin-left: 15px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.recordRg .otherImg > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.recordRg .otherCon h4 {
    font-family: Lato-Bold;
    font-size: 14px;
    color: #323c47;
    letter-spacing: 0;
    line-height: 27px;
    overflow: hidden;
}
.recordRg .otherCon h4 span {
}
.recordRg .otherCon > div {
    font-family: Lato-Regular;
    font-size: 14px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 27px;
    text-align: left;
}
.recordRg .peopleName {
    float: right;
}
.recordRg .otime {
    float: right;
    font-family: Lato-Regular;
    font-size: 12px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 22px;
}
.recordRg .otherCon {
    float: right;
}
.otherCon {
    width: 86%;
}
.chatInputK {
    height: 156px;
}
.followCon {
    padding: 8px 20px;
    width: 260px;
    height: 64px;
    border: 1px solid #e5e7e9;
    border-radius: 3px;
}
.followCon h3 {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #323c47;
    letter-spacing: 0;
    line-height: 27px;
}

.followCon > div:last-child > div {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 22px;
}
.recordRg .followCon {
    float: right;
}
.chatMessage > ul {
    overflow-y: scroll;
    height: 300px;
}
.chatRecord > li:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
}
.chatInputK textarea {
    height: 138px;
}
.allReadColor {
    color: #cccccc;
}
.noReadColor {
    color: green;
}
/* 备注

父组件引入
<search @searchValue="searchChange"></search>
注意：searchChange是点击搜索触发事件
 */
</style>