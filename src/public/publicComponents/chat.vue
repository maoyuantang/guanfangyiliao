<template>
    <div class="chat">
        <div :title="chatUser" class="otherNumClass">
            {{chatUser}}
        </div>
        <div class="chatMessage">
            <ul class="chatRecord">
                <li v-if="loadMoreVisable" class="loadMoreChat" @click="getHisRecord(oMsgId)">加载更多</li>
                <li v-for="(text,index) in messageList" :key="index" :class="text.from==userSelfInfo.userId?'recordRg':'recordLf'">
                    <div class="otherImg">
                        <img class='headImgClass' :src="userSocketInfo.headImg+text.from" :onerror="defaultImg" />
                        <!-- <img src="../../assets/img/publicHeadImg.png" /> -->
                    </div>
                    <div class="otherCon">
                        <h4>
                            <span class="peopleName">{{text.fromNickName}}</span>
                            <span class="otime">{{text.serverTime}}</span>
                        </h4>
                        <div class="messageCon">

                            <div v-if="oDoctorVis" class="noReadro">
                                <div v-if="text.from==userSelfInfo.userId">
                                    <span class="allReadColor" v-if="text.oRead">已读 </span>
                                    <span class="noReadColor" v-else>未读</span>
                                </div>
                            </div>

                            <div>
                                <!-- 显示文本 -->
                                <div v-show="text.childMessageType=='DEFAULT' || text.childMessageType=='CRVIDEO'">
                                    {{text.content}}
                                </div>
                                <!-- 显示图片 -->
                                <div v-show="text.childMessageType=='IMAGE'" class="imgUrlBig">
                                    <span>
                                    </span>
                                    <!-- <img :src="text.content" /> -->

                                    <viewer :images="text.signImages" toolbar="false">
                                        <img :src="text.signImages" width="50">
                                    </viewer>
                                </div>
                                <!-- 显示视频 -->
                                <div v-show="text.childMessageType=='VIDEO'">
                                    {{text.content}}
                                </div>

                                <!-- 显示随访表 -->
                                <!-- 自己发的随访表 -->
                                <div v-if="text.childMessageType=='FOLLOWUP' || text.childMessageType=='INTERROGATION' || text.childMessageType=='ARTICLE'">
                                    <div v-show="text.from==userSelfInfo.userId" class="followOrQuest" @click="followDetailClick(text.content.url,text.childMessageType)">

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
                                    <div v-show="text.from!=userSelfInfo.userId" class="followOrQuest" @click="followDetailClick(text.content.url,text.childMessageType)">
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
                            <div v-show="oDoctorVis" class="noReadro">
                                <div v-if="text.from!=userSelfInfo.userId">
                                    <span class="allReadColor" v-if="text.oRead">已读 </span>
                                    <span class="noReadColor" v-else>未读</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </li>

            </ul>
        </div>
        <div class="sendIcon">
            <span title="发送图片">
                <el-upload class="upload-demo upload-demo-chat" :action="ourl" :on-success="imgUpload" :multiple='oImgVisable'>
                    <el-button size="small" type="primary">点击上传</el-button>

                </el-upload>
                <img src="../../assets/img/sendNew1.png" />
            </span>
            <span title="发送视频" class="sendVideo" @click="showVideoBtn()">
                <img src="../../assets/img/sendNew2.png" />
                <div class="userMember" v-show="showVideoBtnVisable">
                    <h4>视频窗口最多拉取3个人</h4>
                    <el-checkbox-group style='margin-bottom:18px' v-model="checkList">
                        <el-checkbox v-for="(text,index) in userMemberNum" :label="text.userId" :key="index">
                            <span class='videoUserHeadClass'>
                                <img class='headImgClass' :src="userSocketInfo.headImg+text.userId" :onerror="defaultImg" />
                            </span>

                            {{text.userName}}
                        </el-checkbox>
                    </el-checkbox-group>
                    <el-button class="setVideoBtn" @click="setVideo(1)" type="primary">确认</el-button>
                </div>
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
            <span v-show="oDoctorVis" title="录入档案" class="enterFile">
                <img src="../../assets/img/sendNew10.png" />
                <ul>
                    <li @click="openPublicFile()">普通档案</li>
                    <li @click="openManFile()">孕妇答案</li>
                </ul>
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
            <el-input class="chatInputK" type="textarea" :rows="2" placeholder="请输入内容" v-model="messageBody" @keyup.enter.native="sendMessageChat(0,messageBody,'DEFAULT')">
            </el-input>
            <button class="sendMessageChat" @click="sendMessageChat(0,messageBody,'DEFAULT')">发送</button>
        </div>
        <!-- 备注 -->
        <div v-if="remarkVisible">
            <el-dialog class='remarkClass' title="备注" :visible.sync="remarkVisible" center append-to-body>
                <el-form ref="form" :model="remarkData" label-width="80px">
                    <el-form-item label="">
                        <el-input type="textarea" v-model="remarkData.remarkCon"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="sureRemark()">确认</el-button>
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
                <followDetailChat :addFollowData="followDetailData"></followDetailChat>
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
        <!-- 问诊详情 -->
        <div v-if="questPlanVisible">
            <el-dialog title="问诊计划详情" :visible.sync="questPlanVisible" center append-to-body>
                <questPlan :addQuestId="addQuestPlanId"></questPlan>
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
            <el-dialog class='drugsDialogClass' title="药品处方" :visible.sync="drugsVisible" width="100%" center append-to-body>
                <drugs :sendToUserId="sendToUserId" :userMessage="userMessage" @reback='drugsFunc'></drugs>
            </el-dialog>
        </div>
        <!-- 视频聊天 -->
        <div v-if="videoVisible">
            <el-dialog class='videoClassBox' title="" :visible.sync="videoVisible" center append-to-body fullscreen @close="closeVideo('cancle','us')" :showClose="VideoshowClose">
                <ovideo :createVideoRoomData="createVideoRoomData" @reback="videoclick" :sessionId1="sessionId" :doctorVis="doctorVis"></ovideo>
            </el-dialog>
        </div>
        <!-- 孕妇档案 -->
        <WomanDoc :inData="puBlicManData" @reback="addPublicMan"></WomanDoc>
        <!-- 录入档案 -->
        <norDocAlert :inData="puBlicFileData" @reback="addPublicFile"></norDocAlert>
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
import questPlan from "../../components/chat/questPlan.vue";
import followDetailChat from "../../components/chat/followDetailChat.vue";
import articleDetail from "../../components/chat/articleDetail.vue";
import WomanDoc from "./WomanDoc.vue";
import norDocAlert from "./norDocAlert.vue";

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
    storageUsers,
    closeVideoRoom,
    queryListByUserId,
    addWomanMessage,
    addOrdinaryArchives,
    getFollowUpPlan,
    setRemark,
    bindSession
} from "../../api/apiAll.js";
import ovideo from "../../video/oVideo.vue";
import { setTimeout } from "timers";

export default {
    components: {
        ovideo,
        websocket1,
        drugs,
        follow,
        followDetailChat,
        quest,
        questPlan,
        articleDetail,
        nohave,
        WomanDoc,
        norDocAlert
    },
    data() {
        return {
            puBlicFileData: {
                //新增 普通档案  弹窗数据
                // id:'1231321',
                show: false, //是否显示
                nameSelectId: "", //选择名字
                nameList: [], //名字列表
                sexList: [
                    //性别
                    { label: "女", value: 0 },
                    { label: "男", value: 1 }
                ],
                sexSelectId: 0,
                age: "", //年龄
                addr: "", //地址
                org: "", //机构
                diagnosis: "", //诊断
                deal: "" //处理意见
            },
            puBlicManData: {
                //新增 孕妇档案  弹窗数据
                show: false,
                nameSelectId: "", //选择名字
                nameList: [], //名字列表
                husband: "", //丈夫
                phone: "", //电话
                addr: "", //地址
                LastMenstrualPeriod: null //末次月经
            },
            enterFileVisible: false,
            VideoshowClose: false,
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
            questPlanVisible: false,
            addQuestPlanId: "",
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
            // imgUrl:
            //     "https://demo.chuntaoyisheng.com:10002/m/v1/api/hdfs/fs/download/",
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
            followDetailVisible: false,
            signImages: [
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg"
            ],
            oMsgId: "",
            ReadMessage: "", //已读未读
            loadMoreVisable: false, //加载更多是否显示
            oImgVisable: false,
            defaultImg:
                'this.src="' +
                require("../../assets/img/publicHeadImg.png") +
                '"',
            ifSendMessageNum: 0
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo,
            userSocketInfo: state => state.socket
        })
    },
    created() {
        this.getDoctorVis();
        this.getHisRecord();
        this.getMemberMess();
        this.alreadyRead();

        this.ourl =
            "/m/v1/api/hdfs/fs/upload?token=" +
            this.userState.token +
            "&ooo=" +
            Math.random(10);
        console.log(this.sessionId);
        this.messageTicket = this.$store.state.socket.messageTicket;
        console.log(this.$store.state.socket.messageTicket);
        this.oMsgId = this.$store.state.socket.messageTicket.oMsgId;
    },
    methods: {
        //发送
        sendMessageChat(childMessageType, messageBody, childMessageType1) {
            if (this.chatType1 == "门诊" && this.ifSendMessageNum == 0) {
                this.bindOrder();
                this.ifSendMessageNum = 1;
            }
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
                    chatType: 2, //医生端标识
                    clientTime: timestamp,
                    serverTime: this.messageTicket.serverTime
                }
            };
            console.log(Iessage);
            // websocket.default.sendMessage(Iessage);
            if (messageBody) {
                // this.$refs.mychild.sendMessage(Iessage);
                // messageBody = JSON.parse(messageBody);
                this.sendMessage(Iessage);
                this.addMessageK(
                    this.userSelfInfo.userId,
                    messageBody,
                    oHour + ":" + oMinite,
                    childMessageType1,
                    this.userSelfInfo.name
                );
                this.messageBody = "";
            } else {
                alert("消息不能为空");
            }
        },
        //绑定订单
        async bindOrder() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                orderId: this.userMessage.clinicOrderId,
                orderNo: ""
            };
            const res = await bindSession(query, options);
            if (res.data && res.data.errCode === 0) {
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 添加消息到发送框
        addMessageK(
            ouserId,
            oMessage,
            oMessageTime,
            childMessageType,
            fromNickName
        ) {
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
                    content: this.userSocketInfo.imgUrl + oMessage,
                    serverTime: oMessageTime,
                    childMessageType: childMessageType,
                    signImages: [this.userSocketInfo.imgUrl + oMessage]
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
        // 随访
        getSendMessageChat(oMessage) {
            console.log("发送的随访" + oMessage);
            let messageBody = JSON.stringify(oMessage);
            this.sendMessageChat(20, messageBody, "FOLLOWUP");

            this.followListVisible = false;
            this.followDetailVisible = false;
        },
        // 问诊
        getSendMessageChat1(oMessage) {
            let messageBody = JSON.stringify(oMessage);
            console.log(messageBody);
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
                this.ourl =
                    "/m/v1/api/hdfs/fs/upload?token=" +
                    this.userState.token +
                    "&ooo=" +
                    Math.random(10);
            } else {
                alert("失败");
            }
        },
        showVideoBtn() {
            if (this.userMemberNum.length > 1) {
                if (this.showVideoBtnVisable) {
                    this.showVideoBtnVisable = false;
                } else {
                    this.showVideoBtnVisable = true;
                }
            } else {
                this.showVideoBtnVisable = false;
                this.setVideo(0); //单聊
            }
        },
        //创建视频
        setVideo(num) {
            if (num == 1) {
                if (this.checkList.length > 3) {
                    this.$notify.error({
                        title: "警告",
                        message: "最多只能邀请3个人"
                    });
                    return;
                } else {
                    this.setVideo2(num);
                }
            } else {
                this.setVideo2(num);
            }
        },
        async setVideo2(num) {
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
                this.createVideoRoomData = {
                    conferenceId: res.data.body.conferenceId,
                    conferenceNumber: res.data.body.conferenceNumber
                };
                let childMessageType = 6;
                if (num == 1) {
                    //群聊
                    let body =
                        "sendroom&" +
                        res.data.body.conferenceNumber +
                        "&" +
                        res.data.body.conferenceId +
                        "$";
                    let oLength = this.checkList.length - 1;
                    $.each(this.checkList, function(index, text) {
                        if (index == oLength) {
                            body += text;
                        } else {
                            body += text + "&";
                        }
                    });
                    _this.sendVideoMessage(
                        childMessageType,
                        body,
                        res.data.body.conferenceNumber,
                        "",
                        "VIDEO"
                    );
                    // $.each(this.checkList, function(index, text) {
                    //     let body =
                    //         "sendroom&" +
                    //         res.data.body.conferenceNumber +
                    //         "&" +
                    //         res.data.body.conferenceId +
                    //         "&" +
                    //         text;
                    //     _this.sendVideoMessage(
                    //         childMessageType,
                    //         body,
                    //         res.data.body.conferenceNumber,
                    //         "",
                    //         "VIDEO"
                    //     );
                    // });
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
                        "",
                        "VIDEO"
                    );
                }
                this.videoVisible = true;
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        // 发送视频消息
        sendVideoMessage(
            childMessageType,
            body,
            conferenceNumber,
            toNickName,
            childMessageType1
        ) {
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
            // this.$refs.mychild.sendMessage(Iessage);
            this.sendMessage(Iessage);

            this.addMessageK(
                this.userSelfInfo.userId,
                body,
                oHour + ":" + oMinite,
                childMessageType1,
                this.userSelfInfo.name
            );
        },
        //添加备注
        addRemarks() {
            this.remarkVisible = true;
        },
        //添加计划
        addPlan() {
            this.planVisible = true;
        },
        //普通档案
        openPublicFile() {
            this.puBlicFileData.show = true;
            console.log(this.puBlicFileData);
            this.getFamily();
        },
        //添加备注
        async sureRemark() {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                content: this.remarkData.remarkCon,
                userId: this.userMessage.userId
            };
            const res = await setRemark(query, options);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "添加备注成功"
                });
                setTimeout(function() {
                    _this.remarkVisible = false;
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //孕妇档案
        openManFile() {
            this.puBlicManData.show = true;
            this.getFamily();
        },
        // 提交审核成功后关闭处方界面
        drugsFunc() {
            this.drugsVisible = false;
        },
        async addPublicFile(data) {
            console.log(data);
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                memberId: data.nameSelectId,
                sex: data.sexSelectId,
                age: data.age,
                address: data.addr,
                diagnosis: data.diagnosis,
                opinion: data.deal
            };
            const res = await addOrdinaryArchives(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "录入成功"
                });
                setTimeout(function() {
                    _this.puBlicFileData.show = false;
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        async addPublicMan(data) {
            let _this = this;
            let query = {
                token: this.userState.token
            };
            let options = {
                memberId: data.nameSelectId,
                memberName: data.nameList.find(value => {
                    return value.id === data.nameSelectId;
                }).name,
                husband: data.husband,
                phone: data.phone,
                home: data.addr,
                ultimate: data.LastMenstrualPeriod
            };
            const res = await addWomanMessage(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                this.$notify.success({
                    title: "成功",
                    message: "录入成功"
                });
                setTimeout(function() {
                    _this.puBlicManData.show = false;
                }, 1000);
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //获取家庭成员
        async getFamily() {
            let _this = this;
            let query = {
                token: this.userState.token,
                userId: this.userSelfInfo.userId
            };
            const res = await queryListByUserId(query);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                $.each(res.data.body, function(index, text) {
                    console.log(_this.puBlicFileData);
                    _this.puBlicFileData.nameList.push({
                        name: text.name,
                        id: text.id
                    });
                    _this.puBlicManData.nameList.push({
                        name: text.name,
                        id: text.id
                    });
                });
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
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
            this.getFollowDetailMoban(oid);
        },
        //随访消息点击详情
        followDetailClick(oid, otype) {
            if (otype == "FOLLOWUP") {
                this.getFollowDetail(oid);
            } else if (otype == "INTERROGATION") {
                this.QuestPlan(oid);
            } else if (otype == "ARTICLE") {
                this.articleDetailVisible = true;
                this.articleClickId = oid;
            }
        },
        sendMessage2() {
            let ohtml = this.messageTicket.content;
        },
        //随访模板详情
        async getFollowDetailMoban(oid) {
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
        //随访计划详情
        async getFollowDetail(oid) {
            console.log(this.userSelfInfo.userId);
            let query = {
                token: this.userState.token,
                planId: oid
            };
            const res = await getFollowUpPlan(query);
            if (res.data && res.data.errCode === 0) {
                this.followDetailData = res.data.body;
                this.followDetailVisible = true;
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
        async getHisRecord(oMsgId) {
            console.log("历史消息");
            console.log(this.sessionId);
            let _this = this;
            let query = {
                token: this.userState.token
            };
            const options = {
                userId: this.userSelfInfo.userId,
                sessionId: [this.sessionId],
                msgId: this.oMsgId,
                pageNums: 15
            };
            console.log(Object.prototype.toString.call([this.sessionId]));
            const res = await fetchHistoryMessage(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                if (res.data.body.length > 0) {
                    let oLengthMsgId = res.data.body.length;
                    this.oMsgId = res.data.body[oLengthMsgId - 1].msgId;

                    this.loadMoreVisable = true;
                } else {
                    this.loadMoreVisable = false;
                }
                let odata = res.data.body.reverse();

                $.each(odata, function(index, text) {
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
                    _this.messageList.push(text);
                });

                for (let i = 0; i < odata.length; i++) {
                    if (this.areadyReadNum < odata[i].msgId) {
                        this.messageList[i].oRead = true;
                    } else {
                        this.messageList[i].oRead = false;
                    }
                    var ImgObj = new Image(); //判断图片是否存在
                    ImgObj.src = this.userSocketInfo.imgUrl + odata[i].from;
                    //没有图片，则返回-1
                    if (
                        ImgObj.fileSize > 0 ||
                        (ImgObj.width > 0 && ImgObj.height > 0)
                    ) {
                        odata[i];
                    } else {
                        odata[i];
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
                            this.messageList[i].content =
                                "该消息为音频消息,请在手机上查看";
                        } else if (
                            odata[i].childMessageType == "VIDEO" ||
                            odata[i].childMessageType == "CRVIDEO"
                        ) {
                            //视频
                            if (odata[i].body.indexOf("refuse") > -1) {
                                this.messageList[i].content = "拒绝了视频";
                            } else if (odata[i].body.indexOf("videoing") > -1) {
                                this.messageList[i].content = "对方正在视频中";
                            } else if (
                                odata[i].body.indexOf("sendroom") > -1 ||
                                odata[i].body.indexOf("MicroCinicSendRoom") > -1
                            ) {
                                this.messageList[i].content = "发起了视频聊天";
                            } else if (odata[i].body.indexOf("complete") > -1) {
                                this.messageList[i].content = "视频通话已结束";
                            } else if (odata[i].body.indexOf("cancle") > -1) {
                                this.messageList[i].content = "取消了视频";
                            } else if (odata[i].body.indexOf("accept") > -1) {
                                this.messageList[i].content = "接受了视频";
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
                        } else if (
                            odata[i].childMessageType == "VIDEO" ||
                            odata[i].childMessageType == "CRVIDEO"
                        ) {
                            //视频
                            if (odata[i].body.indexOf("refuse") > -1) {
                                this.messageList[i].content = "拒绝了视频";
                            } else if (odata[i].body.indexOf("videoing") > -1) {
                                this.messageList[i].content = "对方正在视频中";
                            } else if (
                                odata[i].body.indexOf("sendroom") > -1 ||
                                odata[i].body.indexOf("MicroCinicSendRoom") > -1
                            ) {
                                this.messageList[i].content = "发起了视频聊天";
                            } else if (odata[i].body.indexOf("complete") > -1) {
                                this.messageList[i].content = "视频通话已结束";
                            } else if (odata[i].body.indexOf("cancle") > -1) {
                                this.messageList[i].content = "取消了视频";
                            } else if (odata[i].body.indexOf("accept") > -1) {
                                this.messageList[i].content = "接受了视频";
                            }
                        } else if (odata[i].childMessageType == "FOLLOWUP") {
                            //随访
                            // this.messageList[i].content = "随访";
                            console.log(odata[i].body);
                            this.messageList[i].content = JSON.parse(
                                odata[i].body
                            );
                        } else if (odata[i].childMessageType == "IMAGE") {
                            //图片
                            // this.messageList[i].imgUrl =
                            //     apiBaseURL.developmentEnvironment +
                            //     "/m/v1/api/hdfs/fs/download/" +
                            //     odata[i].body;
                            // this.messageList[i].imgUrl="http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg"
                            this.messageList[i].content =
                                this.userSocketInfo.imgUrl + odata[i].body;
                            this.messageList[i].signImages = [
                                this.userSocketInfo.imgUrl + odata[i].body
                            ];
                        } else if (odata[i].childMessageType == "AUDIO") {
                            //音频
                            this.messageList[i].content = "音频";
                        } else if (odata[i].childMessageType == "VIDEO") {
                            //视频
                            if (odata[i].body.indexOf("refuse") > -1) {
                                this.messageList[i].content = "拒绝了视频";
                            } else if (
                                odata[i].body.indexOf("sendroom") > -1 ||
                                odata[i].body.indexOf("MicroCinicSendRoom") > -1
                            ) {
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
            this.addQuestId = oid;
            this.questDetailVisible = true;
        },
        QuestPlan(oid) {
            this.addQuestPlanId = oid;
            this.questPlanVisible = true;
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
                userId: this.userMessage.userId,
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
        async closeVideo(oMessageType, closeUser) {
            this.videoVisible = false;
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
                // this.$notify.success({
                //     title: "成功",
                //     message: "退出成功！"
                // });
                // _this.createVideoVisable = false;
                // if (this.userSocketInfo.ifVideoImg == 1) {
                //     oMessageType = "complete";
                // } else {
                //     oMessageType = "cancle";
                // }
                // if (closeUser == "us") {
                //     _this.sendMessageChat(6, oMessageType, "VIDEO");
                //     this.$store.commit("socket/IFVIDEOIMG", 0);
                // }
                _this.deleteVideoRoom();
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        },
        //视频组件传过来的事件
        videoclick(data) {
            this.videoVisible = false;
        },
        //删除视频房间
        async deleteVideoRoom() {
            let _this = this;
            let query = {
                token: this.userState.token,
                cID: this.createVideoRoomData.conferenceId
            };
            const res = await closeVideoRoom(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
                alert("删除成功");
            } else {
                //失败
                this.$notify.error({
                    title: "警告",
                    message: res.data.errMsg
                });
            }
        }
    },

    watch: {
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
                            if (messageBody == "refuse") {
                                //对方拒绝了视频
                                // this.closeVideo(messageBody, "other");
                            } else if (messageBody == "complete") {
                                //对方挂断了视频
                                // this.closeVideo(messageBody, "other");
                            } else if (messageBody == "accept") {
                                this.$store.commit("socket/IFVIDEOIMG", 1);
                            } else if (messageBody == "videoing") {
                                this.$store.commit("socket/IFVIDEOIMG", 0);
                                //对方正在视频中
                                this.closeVideo();
                                this.videoVisible = false;
                                this.$notify.error({
                                    title: "警告",
                                    message: "对方正在视频中"
                                });
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
                        } else if (oData.info.childMessageType == 18) {
                            childMessageType = "INTERROGATION";
                        } else if (oData.info.childMessageType == 20) {
                            childMessageType = "FOLLOWUP";
                        }
                        console.log(messageBody);
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
        sessionId: String, //会话Id
        doctorVis: Number,
        userMessage: Object,
        chatType1: String
    },
    model: {
        prop: ["sessionId", "doctorVis", "userMessage", "chatType1"],
        event: "reBack"
    }
};
</script>

<style>
.sendMessageChat {
}
.chat {
    width: 636px;
    height: 568px;
}
.chatMessage {
    width: 100%;
    height: 310px;
    margin-bottom: 12px;
    border-bottom: 1px solid #e5edf3;
    overflow: hidden;
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
.enterFile:hover ul {
    display: block;
}
.enterFile ul {
    display: none;
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
.recordLf .otherCon h4 span,
.recordRg .otherCon h4 span {
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
    padding: 20px 0;
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
.upload-demo-chat .el-upload__input {
    display: none;
}

.upload-demo-chat .el-upload-list {
    display: none;
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
    background: white;
    box-shadow: 4px 4px 4px #cccccc;
    overflow-y: scroll;
    top: -78px;
    left: 36px;
}
.sendVideo .userMember .el-checkbox {
    display: block;
    text-align: left;
    margin-left: 17px;
}
.sendVideo .userMember h4 {
    margin-bottom: 13px;
    padding-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #5c5c5c;
    letter-spacing: 0;
}

.setVideoBtn {
    width: 82%;
    height: 30px;
    line-height: 12px;
}
.otherNumClass {
    width: 100%;
    padding: 0 10px;
    overflow: hidden;
    height: 23px;
}
.noReadro > span {
    display: block;
    width: 30px;
    margin: 0 10px;
}
.loadMoreChat {
    cursor: pointer;
    text-align: center;
}
.enterFile {
    position: relative;
}
.enterFile ul {
    position: absolute;
    color: black;
}
.enterFile ul li {
    text-align: center;
    line-height: 23px;
    font-size: 11px;
}
.remarkClass .el-form-item__content {
    margin-left: 0;
}
.drugsDialogClass {
    height: 100%;
}
.drugsDialogClass > div {
    margin-top: 0 !important;
    height: 100%;
}
.videoUserHeadClass {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.videoUserHeadClass > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>