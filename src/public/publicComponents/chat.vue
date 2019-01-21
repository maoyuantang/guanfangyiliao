<template>
    <div class="chat">
        <div>
            {{chatUser}}
        </div>
        <div class="chatMessage">
            <ul class="chatRecord">
                <li v-for="(text,index) in messageList" :key="index" :class="text.from==userSelfInfo.userId?'recordRg':'recordLf'">
                    <div class="otherImg">
                        <img src="../../assets/img/日照宝宝.jpg" />

                    </div>
                    <div class="otherCon">
                        <h4>
                            <span class="peopleName">{{text.name}}</span>
                            <span class="otime">{{text.serverTime}}</span>
                        </h4>
                        <div>
                            <div class="messageCon">

                                <span class="allReadColor" v-if="text.oRead">已读 </span>
                                <span class="noReadColor" v-else>未读</span>
                                <!-- 显示图片 -->
                                <div v-show="text.childMessageType=='IMAGE'" class="imgUrlBig">
                                    <span>

                                    </span>
                                    <img :src="text.imgUrl" />
                                </div>
                                {{text.content}} </div>

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
                <el-upload class="upload-demo upload-demo-chat" :action="ourl" :on-success="imgUpload"  :limit="1">
                    <el-button size="small" type="primary">点击上传</el-button>

                </el-upload>
                <img src="../../assets/img/sendNew1.png" />
            </span>
            <span @click="setVideo()" title="发送视频">
                <img src="../../assets/img/sendNew2.png" />
            </span>
            <span title="发送文章">
                <img src="../../assets/img/sendNew3.png" />
            </span>
            <span @click="addFollow()" title="发送随访">
                <img src="../../assets/img/sendNew4.png" />
            </span>
            <span title="发送问诊">
                <img src="../../assets/img/sendNew5.png" />
            </span>
            <span @click="addRemarks()" title="添加备注">
                <img src="../../assets/img/sendNew6.png" />
            </span>
            <span title="药品处方">
                <img src="../../assets/img/sendNew8.png" />
            </span>
            <span @click="addPlan()" title="计划">
                <img src="../../assets/img/sendNew9.png" />
            </span>
            <span title="录入档案">
                <img src="../../assets/img/sendNew10.png" />
            </span>
            <span title="健康处方">
                <img src="../../assets/img/sendNew11.png" />
            </span>
            <span title="转诊">
                <img src="../../assets/img/sendNew12.png" />
            </span>
            <span title="聊天记录">

            </span>
        </div>
        <div>
            <el-input class="chatInputK" type="textarea" :rows="2" placeholder="请输入内容" v-model="messageBody">
            </el-input>
            <button class="sendMessage" @click="sendMessageChat()">发送</button>
        </div>
        <!-- 备注 -->
        <el-dialog title="备注" :visible.sync="remarkVisible" center append-to-body>
            <el-form ref="form" :model="remarkData" label-width="80px">
                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="remarkData.remarkCon"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 计划 -->
        <el-dialog title="计划" :visible.sync="planVisible" center append-to-body>
            <el-form ref="form" :model="planData" label-width="80px">
                <el-form-item label="计划时间">
                    <el-date-picker v-model="planData.planTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="计划内容">
                    <el-input type="textarea" v-model="planData.planCon"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 随访 -->
        <el-dialog title="随访" :visible.sync="followVisible" center append-to-body>
            <ul>
                <li class="followBox" v-for="(text,index) in followList" :key="index">
                    <span>{{text.title}}</span>
                    <span @click="followDetail(text.id)"> > </span>
                </li>
            </ul>
        </el-dialog>
        <!-- 随访计划详情 -->
        <el-dialog title="随访" :visible.sync="followListVisible" center append-to-body>
            <ul>
                <li class="followBox" v-for="(text,index) in followList" :key="index">
                    <span>{{text.title}}</span>
                    <span @click="followDetail(text.id)"> > </span>
                </li>
            </ul>
        </el-dialog>
        <!-- 视频聊天 -->
        <el-dialog title="视频" :visible.sync="videoVisible" center append-to-body fullscreen>
            <ovideo></ovideo>
        </el-dialog>
        <!-- 录入档案 -->
        <!-- <el-dialog title="录入新档案" :visible.sync="planVisible"   center append-to-body>
            <el-form ref="form" :model="planData" label-width="80px">
                <el-form-item label="计划时间">
                    <el-date-picker v-model="planData.planTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="计划内容">
                    <el-input type="textarea" v-model="planData.planCon"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog> -->
    </div>
</template>

<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import protobuf from "protobufjs";
import { mapState } from "vuex";
// import websocket from "../../common/websocket.js";
import filesJs from "../../common/files.js";
import {
    fetchHistoryMessage,
    fetchSessionMembers,
    fetchReadMessageId,
    webGetTitleList
} from "../../api/apiAll.js";
import ovideo from "../../video/video.vue";
let websocket = require("../../common/websocket.js");

export default {
    components: {
        ovideo
    },
    data() {
        return {
            remarkVisible: false, //备注是否显示
            remarkData: {
                remarkCon: ""
            },
            planVisible: false, //计划是否显示
            planData: {
                planTime: "",
                planCon: ""
            },
            followVisible: false, //随访是否显示
            followList: [], //随访标题列表
            followListVisible: false, //随访列表详情是否显示
            ourl: "",
            imgId: "", //上传图片后得到的id
            imgUrl: "/m/v1/api/hdfs/fs/download/",
            // fileList: [
            //     {
            //         name:"ddd",
            //         fileName:'ddd'
            //     }
            // ], //上传图片
            videoVisible: false, //视频是否显示
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
        this.ourl = "/m/v1/api/hdfs/fs/upload?token=" + this.userState.token;
        console.log(this.sessionId);
    },
    methods: {
        onSubmit(){

        },
        //图片上传成功
        imgUpload(res) {
            console.log(res);
            if (res.body && res.errCode === 0) {
                this.imgId = res.body;
                this.messageBody = res.body;
                this.childMessageType = 5;
                this.sendMessageChat();
            } else {
                alert("失败");
            }
        },
        //创建视频
        async setVideo() {
            this.videoVisible = true;
            // let query = {
            //     token: this.userState.token
            // };
            // const res = await createVideoRoom(query);
            // if (res.data && res.data.errCode === 0) {
            //     this.videoVisible = true;
            // } else {
            //     //失败
            //     this.$notify.error({
            //         title: "警告",
            //         message: res.data.errMsg
            //     });
            // }
        },
        //添加备注
        addRemarks() {
            this.remarkVisible = true;
        },
        //添加计划
        addPlan() {
            this.planVisible = true;
        },
        //添加随访
        async addFollow() {
            this.followVisible = true;
            let query = {
                token: this.userState.token,
                pageNum: 1,
                pageSize: 10
            };
            const res = await webGetTitleList(query);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                console.log(res.data);
                this.followList = res.data.body.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },

        //随访详情
        followDetail() {
            this.followListVisible = true;
        },
        sendMessage2() {
            websocket = require("../../common/websocket.js");
            let ohtml = websocket.default.getContent();
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
                        } else if (odata[i].childMessageType == "IMAGE") {
                            //图片
                            this.messageList[i].imgUrl =
                                apiBaseURL.developmentEnvironment +
                                "/m/v1/api/hdfs/fs/download/" +
                                odata[i].body;
                            // this.messageList[i].imgUrl="http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg"
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
                from: this.userSelfInfo.userId,
                content: this.messageBody,
                serverTime: oHour + ":" + oMinite
            });
            let timestamp = Date.parse(new Date());
            // let tag = "img"; //辨识图片
            // if (this.messageBody.indexOf(tag) != -1) {
            //     this.childMessageType = 5;
            // } else {
            //     this.childMessageType = 0;
            // }
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
    position: relative;
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
.recordRg .messageCon {
    float: right;
}
.recordLf .messageCon {
    float: left;
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
.sendImgCss {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
}
.followBox > span:last-child {
    float: right;
    cursor: pointer;
}
.followBox {
    padding: 4px 0;
}
.upload-demo-chat {
    position: absolute;
    width: 44px;
    height: 55px;
}
.upload-demo-chat > div {
    width: 100%;
    height: 100%;
}
.upload-demo-chat > div button {
    visibility: hidden;
    width: 100%;
    height: 100%;
}
.imgUrlBig {
    width: 50px;
    height: 100px;
}
.imgUrlBig > img {
    width: 100%;
    height: 100%;
}
/* 备注

父组件引入
<search @searchValue="searchChange"></search>
注意：searchChange是点击搜索触发事件
 */
</style>