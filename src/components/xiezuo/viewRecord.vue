<template>
    <div>
        {{messageList}}

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
                                <span> {{text.serverTime2}}</span>
                            </div>
                            <div>{{text.body}}</div>
                        </div>
                    </li>
                </ul>
            </li>
            <!-- <li class="ohisList">
                <h3>2018年4月4日</h3>
                <ul>
                    <li class="ohisListMain">
                        <div>
                            <img src="../../assets/img/a-6.png" />
                        </div>
                        <div class="ohisListRg">
                            <div>张某人
                                <span> 17:54:34</span>
                            </div>
                            <div>那就等带节后再说吧。</div>
                        </div>
                    </li>
                </ul>
            </li> -->
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            messageList: [
            ]
        };
    },
    methods: {
        resolveMessage() {
            let _this = this;
            let timeList = [];
            this.messageList=[]
            $.each(this.storyMessage, function(index, text) {
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
                _this.messageList.push({
                    time: allTime,
                    otimeList: []
                });
                if (timeList.indexOf(allTime) > -1) {
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
                    timeList.push(allTime);
                }
            });
        },
        ogetTime(s) {
            return s < 10 ? "0" + s : s;
        }
    },
    created() {
        this.resolveMessage();
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
</style>
