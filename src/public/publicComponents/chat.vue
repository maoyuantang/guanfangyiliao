<template>
    <div class="chat">
        <div>
            和谭莹聊天
        </div>
        <div class="chatMessage">
            <ul></ul>
            <ul></ul>
        </div>
        <div class="sendIcon">
            <span title="发送图片">
                 <input type="file" name="file" class="layui-upload-file"  id="test" lay-title=" " style='opacity:0;width:25px;'>图片
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
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
            </el-input>
            <button class="sendMessage" @click="sendMessage1()">发送</button>
            <button @click="sendMessage2()">ddd</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import websocket from "../../common/websocket.js";
import filesJs from "../../common/files.js";

let websocket = require("../../common/websocket.js");

export default {
    data() {
        return {
            input: ""
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo
        })
    },
    methods: {
        sendMessage2() {
            websocket = require("../../common/websocket.js");
            var ohtml=websocket.default.getContent()
            console.log(ohtml)
        },
        sendMessage1() {
            let odata = {
                RequestType: 1,
                login: {
                    token: this.userState.token,
                    timestamp: "",
                    systemType: "WEB",
                    deviceType: "WEB"
                }
            };
            console.log(websocket);
            websocket.default.sendMessage(odata);

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
    },
    async created() {}
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
.sendIcon{
    display: flex;
    display: -webkit-flex;
}
.sendIcon>span{
    margin:0 3px;
    display:inline-block;
    width:20px;
    height: 20px;
    background: red;
    color:white;
    text-align: center;
    line-height: 20px;
    font-size:8px;
    cursor: pointer;
}
/* 备注

父组件引入
<search @searchValue="searchChange"></search>
注意：searchChange是点击搜索触发事件
 */
</style>