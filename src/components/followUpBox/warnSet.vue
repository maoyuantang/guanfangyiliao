<template>
    <div>
        <ul>
            <li v-for="(text,index) in warnList" :key="index" class="warnLi">
                <div class="warnFenlei">
                    <div>
                        设备类型：{{text.deviceType}}
                    </div>
                    <div>
                        设备型号：{{text.deviceModel}}
                    </div>
                </div>
                <ul>
                    <li v-for="(text1,index1) in text.deviceTestItems" :key="index1" class="warnFenlei">
                        <div>
                            测试项：{{text1.itemName}}
                        </div>
                        <div>
                            <span>全局告警值:</span>

                            <div class="minOrmaxClassBox">
                                <div class="minOrmaxClass">
                                    最小值：
                                    <input v-model="text1.min" type="text" />
                                </div>
                                <div class="minOrmaxClass">
                                    最大值：
                                    <input v-model="text1.max" type="text" />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li></li>
                    <li></li>
                </ul>
            </li>
        </ul>
        <button @click="sureWarn()">确认</button>
    </div>
</template>

<script>
import apiBaseURL from "../../enums/apiBaseURL.js";
import { mapState } from "vuex";
import { alertGet } from "../../api/apiAll.js";
export default {
    components: {},
    data() {
        return {
            warnList: []
        };
    },
    computed: {
        ...mapState({
            userState: state => state.user.userInfo,
            userSelfInfo: state => state.user.userSelfInfo
        })
    },
    methods: {
        sureWarn() {
            let oWarnList = { list: [] };
            $.each(this.warnList, function(index, text) {
                oWarnList.list.push({
                    infoId: text.infoId,
                    deviceTestItems: text.deviceTestItems
                });
            });
            console.log(oWarnList);
            this.$emit("reback", oWarnList);
        }
    },
    props: {
        warnList: String
    },
    model: {
        prop: ["warnList"],
        event: "reBack"
    },
    created() {},
    beforeDestroy() {}
};
</script>

<style>
.minOrmaxClassBox {
    display: flex;
    display: -webkit-flex;
}
.minOrmaxClass {
    margin: 0 5px;
    display: flex;
    display: -webkit-flex;
    width: 86px;
    height: 24px;
    background: #ffffff;
    border: 1px solid #d4dee7;
    font-size: 12px;
    line-height: 24px;
    padding-left: 4px;
}
.minOrmaxClass input {
    width: 30px;
    border: none;
    outline: none;
}
.warnFenlei {
    display: flex;
    display: -webkit-flex;
}
.warnFenlei > div:first-child {
    width: 200px;
}
.warnFenlei > div:last-child {
    display: flex;
    display: -webkit-flex;
}
.warnLi {
    padding: 20px 0;
    border-bottom: 1px solid #dce0e6;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #939eab;
    letter-spacing: 0;
    line-height: 27px;
}
</style>