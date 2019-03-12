<template>
    <div>
        <ul>
            <li class="ohisList" v-for="(text,index) in messageList" :key="index">
                <h3>{{text.time}}</h3>
                <ul>
                    <li class="ohisListMain" v-for="(text1,index1) in text.otimeList" :key="index1">
                        <div>
                            <img src="../../assets/img/a-6.png" />
                        </div>
                        <div class="ohisListRg">
                            <div>{{text1.fromNickName}}
                                <span> {{text1.serverTime2}}</span>
                            </div>
                            <div>{{text1.body}}</div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
           <noData v-show="nodataVisable"></noData>
    </div>
</template>
<script>
import noData from "../../public/publicComponents/noData.vue";
export default {
    components:{
        noData
    },
    data() {
        return {
            messageList: [],
            timeList: [],
            nodataVisable:false,
        };
    },
    methods: {
        resolveMessage() {
            let _this = this;
            this.timeList = [];
            this.messageList = [];
            $.each(this.storyMessage, function(index, text) {
                if (text.childMessageType == "INTERROGATION") {
                    //问诊
                    text.body =
                        '问诊表';
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
                   text.body =
                        "该消息为音频消息,请在手机上查看";
                } else if (text.childMessageType == "VIDEO") {
                    //视频
                    if (text.indexOf("refuse") > -1) {
                        text.body = "挂断了视频";
                    } else if (
                        text.indexOf("sendroom") > -1 ||
                        text.indexOf("MicroCinicSendRoom") > -1
                    ) {
                       text.body = "发起了视频聊天";
                    } else if (odata[i].body.indexOf("complete") > -1) {
                        text.body= "视频通话已结束";
                    } else if (odata[i].body.indexOf("cancle") > -1) {
                       text.body = "取消了视频";
                    } else if (odata[i].body.indexOf("accept") > -1) {
                       text.body= "接受了视频";
                    }
                } else if (text.childMessageType == "IMAGE") {
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
        }
    },
    created() {
        this.resolveMessage();
        console.log(this.storyMessage)
        // if(this.storyMessage.length>0){
        //     this.nodataVisable=false
        // }else{
        //     this.nodataVisable=true
        // }
    },
    props: {
        storyMessage: Array
    },
    model: {
        prop: ["storyMessage"],
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

/* 
谭莹
先掉14.4.拉取历史消息记录，获取到的消息放在storyMessage里面传过来
<viewRecord :storyMessage="storyMessage"></viewRecord>
 */

</style>
