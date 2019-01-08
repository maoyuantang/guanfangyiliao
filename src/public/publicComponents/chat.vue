<template>
    <div class="chat">
        <div>
            和谭莹聊天
        </div>
        <div class="chatMessage">
            <ul>
                <li>
                    dfjdfj
                </li>
                <li>
                    dfjdfj
                </li>
            </ul>
            <ul>
                <li>
                    dfjdfj
                </li>
                <li>
                    dfjdfj
                </li>
            </ul>
        </div>
        <div class="sendIcon">
            <span title="发送图片">
                <input type="file" name="file" class="layui-upload-file" id="test" lay-title=" " style='opacity:0;width:25px;'>图片
            </span>
            <span title="发送视频">
                视频
            </span>
            <span title="发送文章">
                文章
            </span>
            <span title="发送随访">
                随访
            </span>
            <span title="发送问诊">
                问诊
            </span>
            <span title="添加备注">
                备注
            </span>
            <span title="药品处方">
                处方
            </span>
            <span title="计划">
                计划
            </span>
            <span title="录入档案">
                档案
            </span>
            <span title="健康处方">
                健康处
            </span>
            <span title="转诊">
                转诊
            </span>
            <span title="聊天记录">
                聊天
            </span>
        </div>
        <div>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="messageBody">
            </el-input>
            <button class="sendMessage" @click="sendMessageChat()">发送</button>
            <button @click="sendMessage2()">ddd</button>
        </div>
    </div>
</template>

<script>
import protobuf from "protobufjs";
import { mapState } from "vuex";
// import websocket from "../../common/websocket.js";
import filesJs from "../../common/files.js";

let websocket = require("../../common/websocket.js");

export default {
    data() {
        return {
            input: "",
            childMessageType: "", //发送的消息类型
            messageBody: "", //发送的文字消息内容
            chatType: "", //单聊或群聊
            userId: this.userSelfInfo.userId, //发送者ID
            to: "B43F34E1D4014D4F98ED57BA86B2239F", //接受者Id
            sessionId: "" //会话Id
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    created() {
        console.log(this.userSelfInfo);
        this.getHisRecord();
    },
    methods: {
        sendMessage2() {
            websocket = require("../../common/websocket.js");
            var ohtml = websocket.default.getContent();
            console.log(ohtml);
        },
        //获取历史记录
        async getHisRecord() {
            let query = {
                token: this.userState.token
            };
            const options = {
                userId: this.userSelfInfo.userId,
                sessionId: [this.sessionId],
                msgId: 100,
                pageNums: 15
            };
            const res = await login(query, options);
            console.log(res);
            if (res.data && res.data.errCode === 0) {
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
            let tab = "img"; //辨识图片
            if (this.messageBody.indexOf(tag) != -1) {
                this.childMessageType = 5;
            } else {
                childMessageType = 0;
            }
            let Iessage = {
                RequestType: 4,
                ticket: websocket.default.getTicket(),
                info: {
                    messageType: 0, //消息
                    childMessageType: childMessageType, //文本
                    from: userId, //userid
                    fromNickName: usernameP, //昵称
                    toNickName: toNickName,
                    to: to, //发给谁，接收者的用户ID
                    body: this.messageBody, //消息内容
                    groupId: to,
                    sequence: websocket.default.getSequence(), //消息发送序号。
                    chatType: 2, //单聊  GROUP 群聊
                    clientTime: timestamp,
                    serverTime: serverTime
                }
            };
            console.log(websocket);
            websocket.default.sendMessage(Iessage);

            // let aaa=websocket.dadaTransfer
        },
        searchBtn() {
            this.$emit("searchValue", this.input);
        }
    },
    props: {
        tableData: Array, //父组件传来的 列表 数据
        columns: Array, //父组件传来的 列表标题 数据
        tableBtn: Array //父组件传来的 列表按钮 数据
    },
    model: {
        prop: ["tableData", "columns", "tableBtn"],
        event: "reBack"
    }
};
</script>

<style>
.chat {
    width: 400px;
    height: 400px;
    border: 1px solid red;
}
.chatMessage {
    width: 100%;
    height: 280px;
}
.sendIcon {
    display: flex;
    display: -webkit-flex;
}
.sendIcon > span {
    margin: 0 3px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: red;
    color: white;
    text-align: center;
    line-height: 20px;
    font-size: 8px;
    cursor: pointer;
}
/* 备注

父组件引入
<search @searchValue="searchChange"></search>
注意：searchChange是点击搜索触发事件
 */
</style>