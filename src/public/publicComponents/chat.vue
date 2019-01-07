<template>
    <div class="chat">
        <div class="chatMessage">
            <ul></ul>
            <ul></ul>
        </div>
        <div>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
            </el-input>
            <button class="sendMessage" @click="sendMessage1()">发送</button>
        </div>
    </div>
</template>

<script>
import websocket from "../../common/websocket.js";
import filesJs from "../../common/files.js";
export default {
    data() {
        return {
            input: ""
        };
    },
    methods: {
        sendMessage1() {
            let odata = {
                RequestType: 1,
                login: {
                    token: token,
                    timestamp: "",
                    systemType: "WEB",
                    deviceType: "WEB"
                }
            };
            websocket.sendMessage(odata);
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
    height: 300px;
}
/* 备注

父组件引入
<search @searchValue="searchChange"></search>
注意：searchChange是点击搜索触发事件
 */
</style>