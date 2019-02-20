<template>
    <div class="chat">
        <websocket1 ref="mychild" @reloaddata="addMessageK">
        </websocket1>
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
                                <!-- 显示文本 -->
                                <div v-show="text.childMessageType=='DEFAULT'">
                                    {{text.content}}
                                </div>
                                <!-- 显示图片 -->
                                <div v-show="text.childMessageType=='IMAGE'" class="imgUrlBig">
                                    <span>
                                    </span>
                                    <img :src="text.imgUrl" />
                                </div>
                                <!-- 显示视频 -->
                                <div v-show="text.childMessageType=='VIDEO'">
                                    {{text.content}}
                                </div>

                                <!-- 显示随访表 -->
                                <!-- 自己发的随访表 -->
                                <div v-show="text.childMessageType=='FOLLOWUP' || text.childMessageType=='INTERROGATION' || text.childMessageType=='ARTICLE'">
                                    <div v-show="text.from==userSelfInfo.userId" class="followOrQuest" @click="followDetailClick(text.content.id,text.childMessageType)">

                                        <div>
                                            <img src="../../assets/img/followQuest1.png" />
                                        </div>
                                        <div>
                                            <h3>
                                                <span v-show="text.childMessageType=='FOLLOWUP'">随访</span>
                                                <span v-show="text.childMessageType=='INTERROGATION'">问诊</span>
                                                <span v-show="text.childMessageType=='ARTICLE'">文章</span>
                                                / {{text.content.title}}
                                            </h3>
                                            <p>首次治疗时间：{{text.content.firstTreatmentTime}}</p>
                                        </div>

                                    </div>
                                    <!-- 对方发的随访表 -->
                                    <div v-show="text.from!=userSelfInfo.userId" class="followOrQuest" @click="followDetailClick(text.content.id,text.childMessageType)">
                                        <div>
                                            <img src="../../assets/img/followQuest2.png" />
                                        </div>
                                        <div>
                                            <h3>
                                                <span v-show="text.childMessageType=='FOLLOWUP'">随访</span>
                                                <span v-show="text.childMessageType=='INTERROGATION'">问诊</span>
                                                <span v-show="text.childMessageType=='ARTICLE'">文章</span>
                                                /{{text.content.title}}</h3>
                                            <p>首次治疗时间：{{text.content.firstTreatmentTime}}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </li>

            </ul>
        </div>
        <div class="sendIcon">
            <span title="发送图片">
                <el-upload class="upload-demo upload-demo-chat" :action="ourl" :on-success="imgUpload" :limit="1">
                    <el-button size="small" type="primary">点击上传</el-button>

                </el-upload>
                <img src="../../assets/img/sendNew1.png" />
            </span>
            <span title="发送视频" class="sendVideo" @click="showVideoBtn()">
                <img src="../../assets/img/sendNew2.png" />
                <div class="userMember" v-show="showVideoBtnVisable">
                    <h4>视频窗口最多拉取3个人</h4>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="(text,index) in userMemberNum" :label="text.userId" :key="index">
                            {{text.userName}}
                        </el-checkbox>
                    </el-checkbox-group>
                    <el-button class="setVideoBtn" @click="setVideo(1)" type="primary">确认</el-button>
                </div>
            </span>
            <span v-show="oDoctorVis" @click="addArticle()" title="发送文章">
                <img src="../../assets/img/sendNew3.png" />
            </span>
            <span v-show="oDoctorVis" @click="addFollow()" title="发送随访">
                <img src="../../assets/img/sendNew4.png" />
            </span>
            <span v-show="oDoctorVis" @click="addQuest()" title="发送问诊">
                <img src="../../assets/img/sendNew5.png" />
            </span>
            <span v-show="oDoctorVis" @click="addRemarks()" title="添加备注">
                <img src="../../assets/img/sendNew6.png" />
            </span>
            <span v-show="oDoctorVis" title="药品处方" @click="addDrugs()">
                <img src="../../assets/img/sendNew8.png" />
            </span>
            <span v-show="oDoctorVis" @click="addPlan()" title="计划">
                <img src="../../assets/img/sendNew9.png" />
            </span>
            <span v-show="oDoctorVis" title="录入档案">
                <img src="../../assets/img/sendNew10.png" />
            </span>
            <span v-show="oDoctorVis" title="健康处方">
                <img src="../../assets/img/sendNew11.png" />
            </span>
            <span v-show="oDoctorVis" title="转诊">
                <img src="../../assets/img/sendNew12.png" />
            </span>
            <span title="聊天记录">

            </span>
        </div>
        <div>
            <el-input class="chatInputK" type="textarea" :rows="2" placeholder="请输入内容" v-model="messageBody">
            </el-input>
            <button class="sendMessage" @click="sendMessageChat(0,messageBody,'DEFAULT')">发送</button>
        </div>
        <!-- 备注 -->
        <div v-if="remarkVisible">
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
        </div>
        <!-- 计划 -->
        <div v-if="planVisible">
            <el-dialog title="计划" :visible.sync="planVisible" center append-to-body>
                <el-form ref="form" :model="planData" label-width="80px">
                    <el-form-item label="计划时间">
                        <el-date-picker v-model="planData.planTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="计划内容">
                        <el-input type="textarea" v-model="planData.planCon"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="setPlan()">确认</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <!-- 随访 -->
        <div v-if="followVisible">
            <el-dialog title="发送随访" :visible.sync="followVisible" center append-to-body>
                <ul>
                    <li class="followBox" v-for="(text,index) in followList" :key="index">
                        <span>{{text.title}}</span>
                        <span @click="followDetail(text.id)"> > </span>
                    </li>
                </ul>
            </el-dialog>
        </div>
        <!-- 随访计划详情 -->
        <div v-if="followListVisible">
            <el-dialog title="随访" :visible.sync="followListVisible" center append-to-body>
                <follow :addFollowData="followDetailData" @osendmessagechat="getSendMessageChat" :sendToUserId="sendToUserId"></follow>
            </el-dialog>
        </div>
        <!-- 随访消息点击详情 -->
        <div v-if="followDetailVisible">
            <el-dialog title="随访" :visible.sync="followDetailVisible" center append-to-body>
                <followDetail :addFollowData="followDetailData"></followDetail>
            </el-dialog>
        </div>
        <!-- 问诊 -->
        <div v-if="questVisible">
            <el-dialog title="发送问诊" :visible.sync="questVisible" center append-to-body>
                <ul>
                    <li class="followBox" v-for="(text,index) in questList" :key="index">
                        <span>{{text.title}}</span>
                        <span @click="QuestDetail(text.id)"> > </span>
                    </li>
                </ul>
            </el-dialog>
        </div>
        <!-- 问诊详情 -->
        <div v-if="questDetailVisible">
            <el-dialog title="问诊详情" :visible.sync="questDetailVisible" center append-to-body>
                <quest :addQuestId="addQuestId" @osendmessagechat="getSendMessageChat1" :sendToUserId="sendToUserId"></quest>
            </el-dialog>
        </div>
        <!-- 文章 -->
        <div v-if="articleVisible">
            <el-dialog title="发送文章" :visible.sync="articleVisible" center append-to-body>
                <ul>
                    <li class="followBox" v-for="(text,index) in articleList" :key="index">
                        <span>{{text.title}}</span>
                        <span @click="articleDetail(text.id)"> > </span>
                    </li>
                </ul>
                <nohave v-show="articleListLength"></nohave>
            </el-dialog>
        </div>
        <!-- 文章详情 -->
        <div v-if="articleDetailVisible">
            <el-dialog title="文章详情" :visible.sync="articleDetailVisible" center append-to-body>
                <articleDetail :articleClickId="articleClickId"></articleDetail>
            </el-dialog>
        </div>
        <!-- 药品处方 -->
        <div v-if="drugsVisible">
            <el-dialog title="药品处方" :visible.sync="drugsVisible" width="100%" center append-to-body>
                {{sendToUserId}}
                <drugs :sendToUserId="sendToUserId"></drugs>
            </el-dialog>
        </div>
        <!-- 视频聊天 -->
        <div v-if="drugsVisible">
            <el-dialog title="视频" :visible.sync="videoVisible" center append-to-body fullscreen @close="closeVideo()">
                <ovideo :createVideoRoomData="createVideoRoomData"></ovideo>
            </el-dialog>
        </div>
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
import filesJs from "../../common/files.js";
import websocket1 from "../../common/websocket.vue";
import drugs from "../../components/chat/drugs.vue";
import follow from "../../components/chat/follow.vue";
import quest from "../../components/chat/quest.vue";
import followDetail from "../../components/chat/followDetail.vue";
import articleDetail from "../../components/chat/articleDetail.vue";

import nohave from "./noData.vue";
import {
    fetchHistoryMessage,
    fetchSessionMembers,
    fetchReadMessageId,
    webGetTitleList,
    getFollowDetail,
    savePlan,
    getModelTitleList,
    queryInquiryPlan,
    queryInquiry,
    queryArticleList,
    getArticleDetails,
    createVideoRoom,
    storageUsers
} from "../../api/apiAll.js";
import ovideo from "../../video/video.vue";
import { setTimeout } from "timers";

export default {
    components: {
        ovideo,
        websocket1,
        drugs,
        follow,
        followDetail,
        quest,
        articleDetail,
        nohave
    },
    data() {
        return {
            addQuestId: "",
            sendToUserId: "",
            articleClickId: "",
            articleDetailVisible: false,
            articleListLength: false,
            showVideoBtnVisable: false,

            createVideoRoomData: {
                conferenceId: "",
                conferenceNumber: ""
            },
            createVideoVisable: false, //是否已有视频
            userMemberNum: "",
            checkList: [],
            questDetailData: {},
            questDetailVisible: false,
            questVisible: false,
            articleVisible: false,
            articleList: [],
            questList: [],
            followList: [],
            drugsVisible: false,
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
            videoVisible: false, //视频是否显示
            areadyReadNum: "", //已读
            chatUser: "", //参与聊天的成员
            messageList: [],
            input: "",
            childMessageType: "", //发送的消息类型
            messageBody: "", //发送的文字消息内容
            chatType: "", //单聊或群聊
            to: "B43F34E1D4014D4F98ED57BA86B2239F", //接受者Id
            // sessionId: "" //会话Id
            messageTicket: {},
            oDoctorVis: true,
            followDetailData: {},
            otitle: "",
            oFollowId: "",
            followDetailVisible: false
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    created() {
        this.getDoctorVis();
        this.getHisRecord();
        this.getMemberMess();
        this.alreadyRead();

        this.ourl = "/m/v1/api/hdfs/fs/upload?token=" + this.userState.token;
        console.log(this.sessionId);
        this.messageTicket = this.$store.state.socket.messageTicket;
    },
    methods: {
        // 随访
        getSendMessageChat(oMessage) {
            let messageBody = JSON.stringify(oMessage);
            // this.childMessageType = 20;
            this.sendMessageChat(20, messageBody, "FOLLOWUP");
            this.followDetailVisible = false;
            this.followListVisible = fasle;
        },
        // 问诊
        getSendMessageChat1(oMessage) {
            let messageBody = JSON.stringify(oMessage);
            // this.childMessageType = 20;
            this.sendMessageChat(18, messageBody, "INTERROGATION");
            this.questDetailVisible = false;
            this.questVisible = fasle;
        },
        onSubmit() {},
        //图片上传成功
        imgUpload(res) {
            console.log(res);
            if (res.body && res.errCode === 0) {
                this.imgId = res.body;
                // this.messageBody = res.body;
                // this.childMessageType = 5;
                // this.sendMessageChat();
                this.sendMessageChat(5, res.body, "IMAGE");
            } else {
                alert("失败");
            }
        },
        showVideoBtn() {
            if (this.userMemberNum.length > 1) {
                this.showVideoBtnVisable = true;
            } else {
                this.showVideoBtnVisable = false;
                this.setVideo(0); //单聊
            }
        },
        //创建视频
        async setVideo(num) {
            let _this = this;
            if (!this.createVideoVisable) {
                let query = {
                    token: this.userState.token
                };
                let options = {
                    type: "NORMAL",
                    time: ""
                };
                const res = await createVideoRoom(query, options);
                if (res.data && res.data.errCode === 0) {
                    let childMessageType = 6;
                    if (num == 1) {
                        //群聊
                        $.each(this.checkList, function(index, text) {
                            let body =
                                "sendroom&" +
                                res.data.body.conferenceNumber +
                                "&" +
                                res.data.body.conferenceId +
                                "&" +
                                text;
                            _this.sendVideoMessage(
                                childMessageType,
                                body,
                                res.data.body.conferenceNumber,
                                ""
                            );
                        });
                    } else if (num == 0) {
                        //单聊
                        let body =
                            "sendroom&" +
                            res.data.body.conferenceNumber +
                            "&" +
                            res.data.body.conferenceId +
                            "&" +
                            _this.userMemberNum[0].userId;
                        _this.sendVideoMessage(
                            childMessageType,
                            body,
                            res.data.body.conferenceNumber,
                            ""
                        );
                    }

                    this.videoVisible = true;
                    this.createVideoRoomData = {
                        conferenceId: res.data.body.conferenceId,
                        conferenceNumber: res.data.body.conferenceNumber
                    };
                    this.createVideoVisable = true;
                } else {
                    //失败
                    this.$notify.error({
                        title: "警告",
                        message: res.data.errMsg
                    });
                }
            } else {
                alert("已有视频");
            }
        },
        // 发送视频消息
        sendVideoMessage(childMessageType, body, conferenceNumber, toNickName) {
            var Iessage = {
                RequestType: 4,
                ticket: this.messageTicket.ticket,
                info: {
                    messageType: 0, //消息
                    childMessageType: childMessageType, //文本
                    from: this.userSelfInfo.userId, //userid
                    fromNickName: this.userSelfInfo.name, //昵称
                    toNickName: toNickName,
                    to: this.sessionId, //发给谁，接收者的用户ID
                    body: body, //消息内容
                    sequence: this.messageTicket.sequence, //消息发送序号。
                    chatType: 2, //单聊  GROUP 群聊
                    clientTime: "",
                    serverTime: "",
                    conferenceId: conferenceNumber
                }
            };
            console.log(Iessage);
            this.$refs.mychild.sendMessage(Iessage);
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
        followDetail(oid) {
            this.followListVisible = true;
            this.getFollowDetail(oid);
        },
        //随访消息点击详情
        followDetailClick(oid, otype) {
            if (otype == "FOLLOWUP") {
                this.followDetailVisible = true;
                this.getFollowDetail(oid);
            } else if (otype == "INTERROGATION") {
                this.questDetailVisible = true;
            } else if (otype == "ARTICLE") {
                this.articleDetailVisible = true;
                this.articleClickId = oid;
            }
        },
        sendMessage2() {
            let ohtml = this.messageTicket.content;
        },
        //随访详情
        async getFollowDetail(oid) {
            console.log(this.userSelfInfo.userId);
            let query = {
                token: this.userState.token,
                followupId: oid
            };
            const res = await getFollowDetail(query);
            if (res.data && res.data.errCode === 0) {
                this.followDetailData = res.data.body;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
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
                _this.userMemberNum = res.data.body;
                _this.sendToUserId = res.data.body[0].userId;
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
            console.log("历史消息");
            console.log(this.sessionId);
            let query = {
                token: this.userState.token
            };
            const options = {
                userId: this.userSelfInfo.userId,
                sessionId: [this.sessionId],
                msgId: this.messageTicket.msgId,
                pageNums: 157
            };
            console.log(Object.prototype.toString.call([this.sessionId]));
            const res = await fetchHistoryMessage(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                let odata = res.data.body.reverse();
                this.messageList = odata;
                $.each(this.messageList, function(index, text) {
                    let timestamp4 = new Date(text.serverTime);
                    let y = timestamp4.getHours();
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
                    // 不是本人发
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
                                this.messageList[i].content = "挂断了视频";
                            } else if (odata[i].body.indexOf("sendroom") > -1) {
                                this.messageList[i].content = "发起了视频聊天";
                            } else if (odata[i].body.indexOf("complete") > -1) {
                                this.messageList[i].content = "视频通话已结束";
                            } else if (odata[i].body.indexOf("cancle") > -1) {
                                this.messageList[i].content = "取消了视频";
                            }
                        } else if (odata[i].childMessageType == "IMAGE") {
                        } else {
                            this.messageList[i].content = odata[i].body;
                        }
                    } else {
                        // //本人发
                        if (odata[i].childMessageType == "INTERROGATION") {
                            //问诊
                            this.messageList[i].content = JSON.parse(
                                odata[i].body
                            );
                        } else if (odata[i].childMessageType == "ARTICLE") {
                            //文章
                            // this.messageList[i].content = "文章";
                            this.messageList[i].content = JSON.parse(
                                odata[i].body
                            );
                        } else if (odata[i].childMessageType == "CRVIDEO") {
                            //视频
                            this.messageList[i].content = "视频";
                        } else if (odata[i].childMessageType == "FOLLOWUP") {
                            //随访
                            // this.messageList[i].content = "随访";
                            console.log(odata[i].body);
                            this.messageList[i].content = JSON.parse(
                                odata[i].body
                            );
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
                                this.messageList[i].content = "挂断了视频";
                            } else if (odata[i].body.indexOf("sendroom") > -1) {
                                this.messageList[i].content = "发起了视频聊天";
                            } else if (odata[i].body.indexOf("complete") > -1) {
                                this.messageList[i].content = "视频通话已结束";
                            } else if (odata[i].body.indexOf("cancle") > -1) {
                                this.messageList[i].content = "取消了视频";
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
        sendMessageChat(childMessageType, messageBody, childMessageType1) {
            alert(messageBody);
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
                ticket: this.messageTicket.ticket,
                info: {
                    messageType: 0, //消息
                    childMessageType: childMessageType, //文本
                    from: this.userSelfInfo.userId, //userid
                    fromNickName: this.userSelfInfo.name, //昵称
                    toNickName: "",
                    to: this.sessionId, //发给谁，接收者的用户ID
                    body: messageBody, //消息内容
                    sequence: this.messageTicket.sequence, //消息发送序号。
                    chatType: 0, //单聊  GROUP 群聊
                    clientTime: timestamp,
                    serverTime: this.messageTicket.serverTime
                }
            };
            console.log(Iessage);
            // websocket.default.sendMessage(Iessage);
            if (messageBody) {
                this.$refs.mychild.sendMessage(Iessage);
                messageBody = JSON.parse(messageBody);

                this.addMessageK(
                    messageBody,
                    oHour + ":" + oMinite,
                    childMessageType1
                );
                this.messageBody = "";
            } else {
                alert("消息不能为空");
            }

            // let aaa=websocket.dadaTransfer
        },

        // 添加消息到发送框
        addMessageK(oMessage, oMessageTime, childMessageType) {
            this.messageList.push({
                from: this.userSelfInfo.userId,
                content: oMessage,
                serverTime: oMessageTime,
                childMessageType: childMessageType
            });
        },
        searchBtn() {
            this.$emit("searchValue", this.input);
        },
        getDoctorVis() {
            if (this.doctorVis == 0) {
                this.oDoctorVis = false;
            } else if (this.doctorVis == 1) {
                this.oDoctorVis = true;
            }
        },
        //发送问诊
        async addQuest() {
            this.questVisible = true;
            let _this = this;
            let query = {
                token: this.userState.token,
                pageNum: 1,
                pageSize: 100
            };
            const res = await getModelTitleList(query);
            if (res.data && res.data.errCode === 0) {
                _this.questList = res.data.body.list;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        QuestDetail(oid) {
            this.questDetailVisible = true;
            this.addQuestId = oid;
        },
        //发送文章
        async addArticle() {
            this.articleVisible = true;
            let _this = this;
            let query = {
                token: this.userState.token,
                search: "",
                department: "",
                pageNum: 1,
                pageSize: 100
            };
            const res = await queryArticleList(query);
            if (res.data && res.data.errCode === 0) {
                _this.articleList = res.data.body.data2.list;
                if (res.data.body.data2.list.length < 1) {
                    _this.articleListLength = true;
                } else {
                    _this.articleListLength = false;
                }
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        async articleDetail(oid) {
            let _this = this;
            let query = {
                token: this.userState.token,
                articleId: oid
            };
            const res = await getArticleDetails(query);
            if (res.data && res.data.errCode === 0) {
                let oMessage = {
                    id: res.data.body.id,
                    title: res.data.body.title,
                    firstTreatmentTime: res.data.body.createTime
                };
                let messageBody = JSON.stringify(oMessage);
                // this.childMessageType = 19;
                this.sendMessageChat(19, messageBody, "ARTICLE");
                setTimeout(function() {
                    _this.articleVisible = false;
                    _this.messageBody = "";
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        addDrugs() {
            this.drugsVisible = true;
        },
        //创建计划
        async setPlan() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                userId: this.userSelfInfo.userId,
                content: this.planData.planCon,
                executeTime: this.planData.planTime
            };
            const res = await savePlan(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "创建成功！"
                });
                setTimeout(function() {
                    _this.planVisible = false;
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //退出视频
        async closeVideo() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                conferenceId: this.createVideoRoomData.conferenceId,
                state: "OFF"
            };
            const res = await storageUsers(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "退出成功！"
                });
                _this.createVideoVisable = false;
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
        sessionId: String, //会话Id
        doctorVis: Number
    },
    model: {
        prop: ["sessionId", "doctorVis"],
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
    display: flex;
}
.recordLf .messageCon {
    float: left;
    display: flex;
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

.followOrQuest {
    display: flex;
    display: -webkit-flex;
    padding: 6px 12px;
    box-sizing: border-box;
    width: 260px;
    height: 65px;
    border: 1px solid #e5e7e9;
    border-radius: 3px;
}
.followOrQuest > div:last-child h3 {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #323c47;
    letter-spacing: 0;
    line-height: 27px;
}
.followOrQuest > div:first-child {
    margin-right: 10px;
    padding-top: 10px;
}
.followOrQuest > div:last-child > div {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 22px;
}
.sendVideo {
    position: relative;
    display: block;
}
.sendVideo .userMember {
    position: absolute;
    width: 200px;
    height: 200px;
    box-shadow: 4px 4px 4px #cccccc;
    overflow-y: scroll;
}
.sendVideo .userMember .el-checkbox {
    display: block;
    text-align: left;
}
.sendVideo .userMember h4 {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #5c5c5c;
    letter-spacing: 0;
}
.setVideoBtn {
    width: 80px;
    height: 30px;
}
/* 备注

父组件引入
<search @searchValue="searchChange"></search>
注意：searchChange是点击搜索触发事件
 */
</style>