<template>
    <div class="noticeBox">
        <ul>
            <li class="noticeList" v-for="(text,index) in noticeList" :key="index">
                <h4>{{text.noticeTime}}</h4>
                <div>
                    {{text.noticeData.body}}
                </div>
            </li>
        </ul>
        <div class="loadMore" @click="getNoticeList()">
            加载更多
        </div>
        <div v-show="nodataVisable">
            <nodata></nodata>
        </div>

    </div>
</template>
<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import { fetchNoticeInfo } from "../../api/apiAll.js";
import nodata from "../../public/publicComponents/noData.vue";
export default {
    components: {
        nodata
    },
    data() {
        return {
            noticeList: [],
            msgId: 1,
            nodataVisable: false
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
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
.noticeList > h4 {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #002257;
    line-height: 22px;
}
.noticeList > div:nth-child(2) {
    width: 100%;
    height: 67px;
    background: #f3f6fa;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #002257;
    line-height: 22px;
}
.loadMore {
    padding-top: 25px;
    text-align: center;
    cursor: pointer;
}
</style>
